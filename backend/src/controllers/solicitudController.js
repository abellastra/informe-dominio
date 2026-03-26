import prisma from "../db.js";

export const crearSolicitud = async (req, res) => {
  try{
  const { mailCliente, patente, tipoVehiculo } = req.body;
  if (!mailCliente || !patente || !tipoVehiculo) {
    return res
      .status(400)
      .json({ error: "todos los camopos son obligatorios " });
  }

  const solicitud = await prisma.solicitud.create({
    data: {
      mailCliente,
      patente,
      tipoVehiculo,
    },
  });
  res.status(201).json(solicitud);
}catch(error){
  res.status(500).json({error:"ERROR al crear solicitud"})
};
 }
//listar solicitudes 
 export const listarSolicitudes  = async (req, res)=>{
  try{
    const solicitudes= await prisma.solicitud.findMany({
      orderBy:{createdAt:'desc'}
    })
    res.json(solicitudes)
  }catch(error){
    res.status(500).json({error:"error al listar las solicitudes"})
  }
 }
