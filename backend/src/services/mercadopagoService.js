import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
})

export const crearPreferencia = async (solicitud) => {
  const preference = new Preference(client)

  const response = await preference.create({
    body: {
      items: [
        {
          title: `Informe de dominio - ${solicitud.patente}`,
          quantity: 1,
          unit_price: 5000,
          currency_id: 'ARS'
        }
      ],
      payer: {
        email: solicitud.mailCliente
      },
      back_urls: {
        success: 'http://localhost:5173/confirmacion?estado=aprobado',
        failure: 'http://localhost:5173/confirmacion?estado=rechazado',
        pending: 'http://localhost:5173/confirmacion?estado=pendiente'
      },
      external_reference: String(solicitud.id)
    }
  })

  return response
}

