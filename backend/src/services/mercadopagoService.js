import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export const crearPreferencia = async (solicitud) => {
  const preference = new Preference(client);

  const response = await preference.create({
    body: {
      items: [
        {
          title: `Informe de dominio - ${solicitud.patente}`,
          quantity: 1,
          unit_price: Number(process.env.PRECIO_INFORME) || 5000,
          currency_id: "ARS",
        },
      ],
      payer: {
        email: solicitud.mailCliente,
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/confirmacion?estado=aprobado`,
        failure: `${process.env.FRONTEND_URL}/confirmacion?estado=rechazado`,
        pending: `${process.env.FRONTEND_URL}/confirmacion?estado=pendiente`,
      },
      notification_url: `${process.env.BACKEND_URL}/api/webhook`,
      external_reference: String(solicitud.id),
    },
  });

  return response;
};
