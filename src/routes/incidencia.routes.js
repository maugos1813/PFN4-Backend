import { Router } from 'express'
import { createIncidenciaController, deleteIncidenciaController, getAllIncidenciasController, getIncidenciaByIdController, updateIncidenciaController } from '../controllers/incidencia.controller.js'
import { uploadImage } from '../config/multer.js'

const router = Router()

router.post('/', uploadImage.single('profile'), createIncidenciaController)
router.get('/', getAllIncidenciasController)
router.get('/:id', getIncidenciaByIdController)
router.patch('/:id', updateIncidenciaController)
router.delete('/:id', deleteIncidenciaController)

export default router
