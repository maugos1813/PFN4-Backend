import { pool } from '../config/db.js'

export const createIncidencia = async (incidencia) => {
  const [result] = await pool.query('INSERT INTO Incidencia SET ?', [incidencia])
  return result.insertId
}

export const getAllIncidencias = async () => {
  const [rows] = await pool.query('SELECT * FROM Incidencia')
  return rows
}

export const getIncidenciaById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Incidencia WHERE idIncidencia = ?', [id])
  return rows[0]
}

export const updateIncidencia = async (id, updates) => {
  const [result] = await pool.query('UPDATE Incidencia SET ? WHERE idIncidencia = ?', [updates, id])
  return result.affectedRows
}

export const deleteIncidencia = async (id) => {
  const [result] = await pool.query('DELETE FROM Incidencia WHERE idIncidencia = ?', [id])
  return result.affectedRows
}
