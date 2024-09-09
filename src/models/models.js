import { pool } from '../config/db.js'

export const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM Usuario')
  return rows
}

export const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Usuario WHERE id_usuario = ?', [id])
  return rows[0]
}

export const createUser = async (user) => {
  const { nombre, apellido, email, contraseña, tipoUsuario } = user
  const [result] = await pool.query(
    'INSERT INTO Usuario (nombre, apellido, email, contraseña, tipoUsuario) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, email, contraseña, tipoUsuario]
  )
  return { id: result.insertId, ...user }
}

export const updateUser = async (id, user) => {
  const { nombre, apellido, email, contraseña, tipoUsuario } = user
  await pool.query(
    'UPDATE Usuario SET nombre = ?, apellido = ?, email = ?, contraseña = ?, tipoUsuario = ? WHERE id_usuario = ?',
    [nombre, apellido, email, contraseña, tipoUsuario, id]
  )
  return { id, ...user }
}

export const partialUpdateUser = async (id, updates) => {
  const [result] = await pool.query('UPDATE Usuario SET ? WHERE id_usuario = ?', [updates, id])
  return result
}

export const deleteUser = async (id) => {
  await pool.query('DELETE FROM Usuario WHERE id_usuario = ?', [id])
}
