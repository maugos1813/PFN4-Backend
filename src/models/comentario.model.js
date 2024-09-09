import { pool } from '../config/db.js'

export const createComentario = async (comentario) => {
  const [result] = await pool.query('INSERT INTO Comentario SET ?', [comentario])
  return result.insertId
}

export const getComentariosByIncidencia = async (idIncidencia) => {
  const [rows] = await pool.query('SELECT * FROM Comentario WHERE idIncidencia = ?', [idIncidencia])
  return rows
}

export const getComentarioById = async (idComentario) => {
  const [rows] = await pool.query('SELECT * FROM Comentario WHERE idComentario = ?', [idComentario])
  return rows[0]
}

export const updateComentario = async (idComentario, updates) => {
  await pool.query('UPDATE Comentario SET ? WHERE idComentario = ?', [updates, idComentario])
}

export const deleteComentario = async (idComentario) => {
  await pool.query('DELETE FROM Comentario WHERE idComentario = ?', [idComentario])
}
