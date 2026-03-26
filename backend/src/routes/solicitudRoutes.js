import { Router } from "express";
import {
  crearSolicitud,
  listarSolicitudes,
} from "../controllers/solicitudController.js";

const router = Router();

router.post("/solicitudes", crearSolicitud);

router.get("/solicitudes", listarSolicitudes);

export default router;
