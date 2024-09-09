import { pool } from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'

export const login = async (req, res) => {
  console.log(req.body)
  try {
    const { email, contraseña } = req.body

    // Consulta al usuario por el email
    const [rows] = await pool.query('SELECT * FROM Usuario WHERE email = ?', [email])

    if (rows.length === 0) {
      return res.status(404).json({ message: 'El usuario no existe' })
    }

    const usuario = rows[0]

    // Verifica si la contraseña es correcta
    const esValido = await bcrypt.compare(contraseña, usuario.contraseña)
    if (!esValido) {
      return res.status(400).json({ message: 'Credenciales inválidas' })
    }

    // Genera un token JWT
    const token = jwt.sign({ id_usuario: usuario.id_usuario }, SECRET_KEY, { expiresIn: '1h' })

    // Excluye la contraseña de la respuesta
    const { contraseña: _, ...userWithoutPassword } = usuario

    // Envía la respuesta con el token y los datos del usuario
    res.json({ message: 'Login exitoso', token, user: userWithoutPassword })
  } catch (error) {
    console.error('Error en el login:', error.message) // Añadido para más detalles en el error
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const me = async (req, res) => {
  try {
    // El usuario ya está adjunto a req.user por validateToken
    const { contraseña, ...userWithoutPassword } = req.user

    // Envía la información del usuario sin la contraseña
    res.json(userWithoutPassword)
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
