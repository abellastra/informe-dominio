import { Router } from "express";
import {
  actualizarEstado,
  crearSolicitud,
  iniciarPago,
  listarSolicitudes,
  obtenerSolicitudes,
  guardarInforme,
  reenviarMail,
} from "../controllers/solicitudController.js";
import { recibirWebhook } from "../controllers/webhookController.js";
import { verificarAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/solicitudes", crearSolicitud);

router.post("/solicitudes/:id/pagar", iniciarPago);

router.post("/webhook", recibirWebhook);

//verificacion admin
router.get("/solicitudes", verificarAdmin, listarSolicitudes);

router.get("/solicitudes/:id", verificarAdmin, obtenerSolicitudes);

router.patch("/solicitudes/:id", verificarAdmin, actualizarEstado);

router.post("/solicitudes/:id/informe", verificarAdmin, guardarInforme);
router.post("/solicitudes/:id/reenviar-mail", verificarAdmin, reenviarMail);
export default router;
