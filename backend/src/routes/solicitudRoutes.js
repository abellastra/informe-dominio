import { Router } from "express";
import {
    actualizarEstado,
  crearSolicitud,
  listarSolicitudes,
  obtenerSolicitudes,
} from "../controllers/solicitudController.js";

const router = Router();

router.post("/solicitudes", crearSolicitud);

router.get("/solicitudes", listarSolicitudes);

router.get('/solicitudes/:id',obtenerSolicitudes)

router.patch('/solicitudes/:id', actualizarEstado)

export default router;
