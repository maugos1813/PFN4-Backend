import { Router } from 'express'
import { createComentarioController, deleteComentarioController, getComentarioByIdController, getComentariosByIncidenciaController, updateComentarioController } from '../controllers/comentario.controller.js'

const router = Router()

router.post('/', createComentarioController)
router.get('/incidencia/:id', getComentariosByIncidenciaController)
router.get('/:id', getComentarioByIdController)
router.patch('/:id', updateComentarioController)
router.delete('/:id', deleteComentarioController)

export default router
