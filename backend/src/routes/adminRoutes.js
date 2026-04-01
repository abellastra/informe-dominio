import { Router } from 'express'
import { verificarAdmin } from '../middlewares/authMiddleware.js'
import { login, logout, obtenerFirmaCloudinary } from '../controllers/adminController.js'

const router = Router()

router.post('/login', login)
router.post('/logout', logout)

router.get('/verificar', verificarAdmin, (req, res) => {
  res.json({ ok: true })
})
router.get('/firma-cloudinary', verificarAdmin,obtenerFirmaCloudinary)

export default router