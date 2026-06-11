import prisma from "../db.js";
import crypto from "crypto";

import { MercadoPagoConfig, Payment } from "mercadopago";
import {
  enviarAvisoGestora,
  enviarConfirmacionCliente,
} from "../services/emaillService.js";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const verificarFirmaMP = (req) => {
  const signatureHeader = req.headers["x-signature"];
  const requestId = req.headers["x-request-id"];

  if (!signatureHeader || !requestId) return false;

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((p) => p.split("="))
  );
  const ts = parts["ts"];
  const v1 = parts["v1"];

  if (!ts || !v1) return false;

  const dataId = req.body?.data?.id;
  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;

  const firma = crypto
    .createHmac("sha256", process.env.MP_WEBHOOK_SECRET)
    .update(manifest)
    .digest("hex");

  return firma === v1;
};


export const recibirWebhook = async (req, res) => {
  try {
    if (!verificarFirmaMP(req)) {
  return res.sendStatus(401);
}
    const { type, data } = req.body;
    if (type !== "payment") {
      return res.sendStatus(200);
    }

    // Buscamos los detalles del pago en MP
    const payment = new Payment(client);
    const pagoInfo = await payment.get({ id: data.id });

    const solicitudId = Number(pagoInfo.external_reference);
    const estado = pagoInfo.status; // "approved", "rejected", "pending"

    const solicitudActual = await prisma.solicitud.findUnique({
      where: { id: solicitudId },
    });

    const solicitud = await prisma.solicitud.update({
      where: { id: solicitudId },
      data: {
        pagoEstado: estado,
        estado: estado === "approved" ? "en_proceso" : "pendiente",
      },
    });

    // Solo enviar mails la primera vez que se aprueba (evita duplicados por reintentos de MP)
    if (estado === "approved" && solicitudActual?.pagoEstado !== "approved") {
      await enviarConfirmacionCliente(solicitud);
      await enviarAvisoGestora(solicitud);
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
