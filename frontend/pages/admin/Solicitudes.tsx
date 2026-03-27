import { useEffect, useState } from "react";

import axios from 'axios'
import { useNavigate } from "react-router-dom";

interface Solicitud {
    id:number,
    mailCliente:string,
    patente:string,
    tipoVehiculo:string
    estado:string,
    pagoEstado:string,
    createdAt:string
}
const Solicitudes=()=>{
    
const[ Solicitudes, setSolicitudes]=useState<Solicitud[]>([])
const navigate= useNavigate()

useEffect(()=>{
    const fetchSolicitudes= async()=>{
 try {
      const response= await axios.get('http://localhost:3000/api/solicitudes',{
        withCredentials:true
      })
      setSolicitudes(response.data)

    } catch (error) {
        navigate('/admin')
    }
    }
   fetchSolicitudes()
},[])

return(
    <div>
           <h1>Solicitudes</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Mail</th>
            <th>Patente</th>
            <th>Vehículo</th>
            <th>Estado</th>
            <th>Pago</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {Solicitudes.map((solicitud) => (
            <tr key={solicitud.id}>
              <td>{solicitud.id}</td>
              <td>{solicitud.mailCliente}</td>
              <td>{solicitud.patente}</td>
              <td>{solicitud.tipoVehiculo}</td>
              <td>{solicitud.estado}</td>
              <td>{solicitud.pagoEstado}</td>
              <td>{new Date(solicitud.createdAt).toLocaleDateString('es-AR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
)
}

export default Solicitudes