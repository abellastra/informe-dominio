import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { verificarAdmin } from "../middlewares/authMiddleware.js";
import {
  login,
  logout,
  obtenerFirmaCloudinary,
} from "../controllers/adminController.js";

const router = Router();

// ── Rate limit solo para el login
const loginLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  message: { error: "Demasiados intentos. Esperá 1 minuto." },
});

router.post("/login", loginLimit, login);
router.post("/logout", logout);

router.get("/verificar", verificarAdmin, (req, res) => {
  res.json({ ok: true });
});
router.get("/firma-cloudinary", verificarAdmin, obtenerFirmaCloudinary);

export default router;
