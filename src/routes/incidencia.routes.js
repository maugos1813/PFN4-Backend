import { Router } from 'express'
import { createIncidenciaController, deleteIncidenciaController, getAllIncidenciasController, getIncidenciaByIdController, updateIncidenciaController } from '../controllers/incidencia.controller.js'

const router = Router()

router.post('/', createIncidenciaController)
router.get('/', getAllIncidenciasController)
router.get('/:id', getIncidenciaByIdController)
router.patch('/:id', updateIncidenciaController)
router.delete('/:id', deleteIncidenciaController)

export default router
