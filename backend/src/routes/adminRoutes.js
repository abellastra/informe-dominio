import { Router } from 'express'
import { login } from '../controllers/adminController.js'
import { verificarAdmin } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/login', login)
router.get('/verificar', verificarAdmin, (req, res) => {
  res.json({ ok: true })
})

export default router