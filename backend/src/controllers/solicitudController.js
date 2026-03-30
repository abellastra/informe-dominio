import prisma from "../db.js";
import { crearPreferencia } from "../services/mercadopagoService.js";

export const crearSolicitud = async (req, res) => {
  try {
    const { nombre, apellido, cuil, telefono, mailCliente, patente, marcaModelo, tipoVehiculo, tipoInforme } = req.body

    if (!nombre || !apellido || !cuil || !telefono || !mailCliente || !patente || !marcaModelo || !tipoVehiculo || !tipoInforme) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }

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
        tipoInforme
      }
    })

    res.status(201).json(solicitud)
  } catch (error) {
    console.log("error completo", error)
    res.status(500).json({ error: 'Error al crear la solicitud' })
  }
}
//listar solicitudes 
export const listarSolicitudes = async (req, res) => {
  try {
    const solicitudes = await prisma.solicitud.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(solicitudes)
  } catch (error) {
    res.status(500).json({ error: "error al listar las solicitudes" })
  }
}

//obtener solicitud

export const obtenerSolicitudes = async (req,res) => {
  try {
    const { id } = req.params

    const solicitud = await prisma.solicitud.findUnique({
      where: { id: Number(id) }
    })

    if (!solicitud) {
      return res.status(404).json({error: 'solicitud no encontrada'})
    }
    res.json(solicitud)
  } catch (error) {
    res.status(500).json({ error: 'error al obtener las solicitudes ' })
  }
}

// actualiza

export const actualizarEstado= async(req,res)=>{
  try {
    const{id}=req.params
    const{estado}=req.body

    const estadoValidos =['pendiente', 'en_proceso','listo']
    if(!estadoValidos.includes(estado)){
     return res.status(400).json({error:'estado no valido'})
    }
    const solicitud = await prisma.solicitud.update({
      where:{id:Number(id)},
      data:{estado}
    })
   res.json(solicitud)
  } catch (error) {
    res.status(500).json({error:"error al actulizar el estado "})
  }
}

export const iniciarPago = async(req,res)=>{
  try {
    const {id}= req.params

    const solicitud = await prisma.solicitud.findUnique({
      where:{id:Number(id)}
    })

    if(!solicitud){
      return res.status(404).json({error:'solicitud no encontrada '})
    }
     
      const preferencia = await crearPreferencia(solicitud)

    await prisma.solicitud.update({
      where: { id: Number(id) },
      data: { pagoId: preferencia.id }
    })

    res.json({ url: preferencia.sandbox_init_point })
    
  } catch (error) {
    console.error('error:',error)
    res.status(500).json({error:'ERROR al iniciar pago'})
  }
}


