import { createComentario, deleteComentario, getComentarioById, getComentariosByIncidencia, updateComentario } from '../models/comentario.model.js'

export const createComentarioController = async (req, res) => {
  try {
    const comentarioId = await createComentario(req.body)
    res.status(201).json({ message: 'Comentario creado', id: comentarioId })
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el comentario', error })
  }
}

export const getComentariosByIncidenciaController = async (req, res) => {
  try {
    const comentarios = await getComentariosByIncidencia(req.params.id)
    res.status(200).json(comentarios)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener comentarios', error })
  }
}

export const getComentarioByIdController = async (req, res) => {
  try {
    const comentario = await getComentarioById(req.params.id)
    if (comentario) {
      res.status(200).json(comentario)
    } else {
      res.status(404).json({ message: 'Comentario no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener comentario', error })
  }
}

export const updateComentarioController = async (req, res) => {
  try {
    await updateComentario(req.params.id, req.body)
    res.status(200).json({ message: 'Comentario actualizado' })
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el comentario', error })
  }
}

export const deleteComentarioController = async (req, res) => {
  try {
    await deleteComentario(req.params.id)
    res.status(200).json({ message: 'Comentario eliminado' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el comentario', error })
  }
}
