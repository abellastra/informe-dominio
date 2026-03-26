import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import solicitudRoutes from "./routes/solicitudRoutes.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.json());

app.use("/api", solicitudRoutes);

// ruta d eprueba

app.get("/", (req, res) => {
  res.json({ mensaje: "servidor funcionando :)" });
});
app.listen(PORT, () => {
  console.log(`SERVIDOR FUNCIONADO EN EL PUERTO ${PORT}`);
});
