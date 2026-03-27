import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import solicitudRoutes from "./routes/solicitudRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api", solicitudRoutes);
app.use("/api/admin", adminRoutes);

// ruta d eprueba

app.get("/", (req, res) => {
  res.json({ mensaje: "servidor funcionando :)" });
});
app.listen(PORT, () => {
  console.log(`SERVIDOR FUNCIONADO EN EL PUERTO ${PORT}`);
});
