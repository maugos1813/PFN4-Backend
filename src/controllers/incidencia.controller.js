import { createIncidencia, deleteIncidencia, getAllIncidencias, getIncidenciaById, updateIncidencia } from '../models/incidencia.model.js'

export const createIncidenciaController = async (req, res) => {
  try {
    const incidenciaId = await createIncidencia(req.body)
    res.status(201).json({ message: 'Incidencia creada', id: incidenciaId })
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la incidencia', error })
  }
}

export const getAllIncidenciasController = async (req, res) => {
  try {
    const incidencias = await getAllIncidencias()
    res.json(incidencias)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las incidencias', error })
  }
}

export const getIncidenciaByIdController = async (req, res) => {
  try {
    const incidencia = await getIncidenciaById(req.params.id)
    if (!incidencia) {
      return res.status(404).json({ message: 'Incidencia no encontrada' })
    }
    res.json(incidencia)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la incidencia', error })
  }
}

export const updateIncidenciaController = async (req, res) => {
  try {
    const updatedRows = await updateIncidencia(req.params.id, req.body)
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Incidencia no encontrada' })
    }
    res.json({ message: 'Incidencia actualizada parcialmente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la incidencia', error })
  }
}

export const deleteIncidenciaController = async (req, res) => {
  try {
    const deletedRows = await deleteIncidencia(req.params.id)
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Incidencia no encontrada' })
    }
    res.json({ message: 'Incidencia eliminada' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la incidencia', error })
  }
}
