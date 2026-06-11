import prisma from "../db.js";
import { z } from "zod";
import { enviarInformeCliente } from "../services/emaillService.js";
import { crearPreferencia } from "../services/mercadopagoService.js";

const solicitudSchema = z.object({
  nombre: z.string().min(2, "Nombre muy corto").max(50),
  apellido: z.string().min(2, "Apellido muy corto").max(50),
  cuil: z
    .string()
    .regex(/^\d{2}-\d{8}-\d{1}$/, "CUIL inválido. Formato: 20-12345678-9"),
  telefono: z.string().regex(/^\+?[\d\s\-]{10,15}$/, "Teléfono inválido"),
  mailCliente: z.string().email("Email inválido"),
  patente: z
    .string()
    .regex(
      /^[A-Z]{2}\d{3}[A-Z]{2}$|^[A-Z]{3}\d{3}$|^[A-Z]\d{3}[A-Z]{3}$|^\d{3}[A-Z]{3}$/,
      "Patente inválida",
    ),
  marcaModelo: z.string().min(2).max(100),
  tipoVehiculo: z.enum(["auto", "moto", "camioneta", "camion"], {
    message: "Tipo de vehículo inválido",
  }),
  tipoInforme: z.string().default(""),
});

export const crearSolicitud = async (req, res) => {
  try {
    const resultado = solicitudSchema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        detalles: resultado.error.flatten((i) => i.message).fieldErrors,
      });
    }

    const {
      nombre,
      apellido,
      cuil,
      telefono,
      mailCliente,
      patente,
      marcaModelo,
      tipoVehiculo,
      tipoInforme,
    } = resultado.data;

    const solicitud = await prisma.solicitud.create({
      data: {
        nombre,
        apellido,
        cuil,
        telefono,
        mailCliente,
        patente,
        marcaModelo,
        tipoVehiculo,
        tipoInforme,
        estado: "pendiente",
        pagoEstado: "pendiente",
      },
    });

    res.status(201).json(solicitud);
  } catch (error) {
    console.log("error completo", error);
    res.status(500).json({ error: "Error al crear la solicitud" });
  }
};
//listar solicitudes
export const listarSolicitudes = async (req, res) => {
  try {
    const solicitudes = await prisma.solicitud.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: "error al listar las solicitudes" });
  }
};

//obtener solicitud

export const obtenerSolicitudes = async (req, res) => {
  try {
    const { id } = req.params;

    const solicitud = await prisma.solicitud.findUnique({
      where: { id: Number(id) },
    });

    if (!solicitud) {
      return res.status(404).json({ error: "solicitud no encontrada" });
    }
    res.json(solicitud);
  } catch (error) {
    res.status(500).json({ error: "error al obtener las solicitudes " });
  }
};

// actualiza

export const actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const estadoValidos = ["pendiente", "en_proceso", "listo"];
    if (!estadoValidos.includes(estado)) {
      return res.status(400).json({ error: "estado no valido" });
    }
    const solicitud = await prisma.solicitud.update({
      where: { id: Number(id) },
      data: { estado },
    });
    res.json(solicitud);
  } catch (error) {
    res.status(500).json({ error: "error al actulizar el estado " });
  }
};

export const iniciarPago = async (req, res) => {
  try {
    const { id } = req.params;

    const solicitud = await prisma.solicitud.findUnique({
      where: { id: Number(id) },
    });

    if (!solicitud) {
      return res.status(404).json({ error: "solicitud no encontrada " });
    }

    const preferencia = await crearPreferencia(solicitud);

    await prisma.solicitud.update({
      where: { id: Number(id) },
      data: { pagoId: preferencia.id },
    });

    const url =
      process.env.NODE_ENV === "production"
        ? preferencia.init_point
        : preferencia.sandbox_init_point;
    res.json({ url });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ error: "ERROR al iniciar pago" });
  }
};

//guardar informe dominio

export const guardarInforme = async (req, res) => {
  try {
    const { id } = req.params;
    const { urlInforme } = req.body;

    if (!urlInforme) {
      return res
        .status(400)
        .json({ error: "No se recibió la URL del informe" });
    }

    const solicitud = await prisma.solicitud.update({
      where: { id: Number(id) },
      data: {
        archivoInforme: urlInforme,
        estado: "listo",
      },
    });

    try {
      await enviarInformeCliente(solicitud, urlInforme);
      res.json({ ...solicitud, mailEnviado: true });
    } catch (err) {
      console.error("Error enviando mail al cliente:", err);
      res.json({
        ...solicitud,
        mailEnviado: false,
        mailError:
          "El informe se guardó pero no se pudo enviar el mail al cliente.",
      });
    }
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ error: "ERROR al guardar el informe " });
  }
};

export const reenviarMail = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await prisma.solicitud.findUnique({
      where: { id: Number(id) },
    });

    if (!solicitud)
      return res.status(404).json({ error: "solicitud no encontrada" });
    if (!solicitud.archivoInforme)
      return res.status(400).json({ error: "No hay informe subido" });

    await enviarInformeCliente(solicitud, solicitud.archivoInforme);
    res.json({ ok: true });
  } catch (error) {
    console.error("Error reenviando mail:", error);
    res.status(500).json({ error: "No se pudo reenviar el mail" });
  }
};
