import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import solicitudRoutes from "./routes/solicitudRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import {rateLimit} from "express-rate-limit"; 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // ventana  15 minutos
  max: 10, // Limitar a 10 intentos por IP
  message: "Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo más tarde.",
});

const solicitudLimit = rateLimit({
  windowMs: 60 * 60 * 1000,  // ventana de 1 hora
  limit: 10,                  // máximo 10 solicitudes por hora por IP
  message: { error: "Demasiadas solicitudes. Intentá más tarde." },
});

//middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));   // ← límite explícito de tamañoapp.use(cookieParser());

app.use("/api", solicitudLimit, solicitudRoutes);
app.use("/api/admin", adminRoutes);

// ruta d eprueba

// ── Ruta de prueba (sacar en producción) ─────────────────
app.get("/", (req, res) => {
  res.status(404).json({ error: "Not found" });// ← ya no expone que el server existe
});
app.listen(PORT, () => {
  console.log(`SERVIDOR FUNCIONADO EN EL PUERTO ${PORT}`);
});
