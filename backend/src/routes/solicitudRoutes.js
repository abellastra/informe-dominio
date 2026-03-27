import { Router } from "express";
import {
    actualizarEstado,
  crearSolicitud,
  iniciarPago,
  listarSolicitudes,
  obtenerSolicitudes,
} from "../controllers/solicitudController.js";
import { recibirWebhook } from "../controllers/webhookController.js";

const router = Router();

router.post("/solicitudes", crearSolicitud);

router.get("/solicitudes", listarSolicitudes);

router.get('/solicitudes/:id',obtenerSolicitudes)

router.patch('/solicitudes/:id', actualizarEstado)

router.post('/solicitudes/:id/pagar', iniciarPago)

router.post('/webhook', recibirWebhook)

export default router;
