import prisma from'../db.js'

import { MercadoPagoConfig, Payment } from 'mercadopago'
import { enviarAvisoGestora, enviarConfirmacionCliente } from '../services/emaillService.js'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
})

export  const  recibirWebhook=async (req,res)=>{
    try {
        const { type,data}=req.body
         if (type !== 'payment') {
      return res.sendStatus(200)
    }

    // Buscamos los detalles del pago en MP
    const payment = new Payment(client)
    const pagoInfo = await payment.get({ id: data.id })

    const solicitudId = Number(pagoInfo.external_reference)
    const estado = pagoInfo.status // "approved", "rejected", "pending"

   const solicitud = await prisma.solicitud.update({
        where:{id:solicitudId},
        data:{
         pagoEstado:estado,
         estado:estado==='approved' ? 'en_proceso' : 'pendiente'
        }
    })

    if(estado === "approved"){
        await enviarConfirmacionCliente(solicitud)
        await enviarAvisoGestora(solicitud)
    }

res.sendStatus(200)
    } catch (error) {
    console.log(error)
    res.sendStatus(500)
    }
}