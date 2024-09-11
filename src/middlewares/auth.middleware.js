import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'
import { pool } from '../config/db.js'

export const validateToken = async (req, res, next) => {
  try {
    // Extrae el token del encabezado Authorization
    const token = req.headers.authorization?.split(' ')[1]
    console.log('Token recibido:', token) // Verifica que el token se imprima correctamente en la consola

    if (!token) {
      console.error('Token no proporcionado')
      return res.status(401).json({ message: 'Token no proporcionado' })
    }

    // Verifica y decodifica el token
    const decoded = jwt.verify(token, SECRET_KEY)
    console.log('Decoded JWT:', decoded) // Verifica que el token decodificado se imprima correctamente

    // Consulta a la base de datos
    const [rows] = await pool.query('SELECT * FROM Usuario WHERE id_usuario = ?', [decoded.id_usuario])

    if (rows.length === 0) {
      console.error('Usuario no encontrado para el id:', decoded.id_usuario)
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    req.user = rows[0]
    next()
  } catch (error) {
    console.error('Error en validateToken:', error.message)
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expirado' })
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message })
  }
}
