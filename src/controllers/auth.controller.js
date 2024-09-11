import { pool } from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'

export const login = async (req, res) => {
  console.log(req.body)
  try {
    const { email, contraseña } = req.body

    const [rows] = await pool.query('SELECT * FROM Usuario WHERE email = ?', [email])

    if (rows.length === 0) {
      return res.status(404).json({ message: 'El usuario no existe' })
    }

    const usuario = rows[0]

    const esValido = await bcrypt.compare(contraseña, usuario.contraseña)
    if (!esValido) {
      return res.status(400).json({ message: 'Credenciales inválidas' })
    }

    const token = jwt.sign({ id_usuario: usuario.id_usuario }, SECRET_KEY, { expiresIn: '1h' })
    console.log('Token generado:', token)

    const { contraseña: _, ...userWithoutPassword } = usuario

    res.setHeader('Authorization', `Bearer ${token}`)

    res.json({ message: 'Login exitoso', token, user: userWithoutPassword })
  } catch (error) {
    console.error('Error en el login:', error.message)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const me = async (req, res) => {
  try {
    const { contraseña, ...userWithoutPassword } = req.user

    res.json(userWithoutPassword)
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
