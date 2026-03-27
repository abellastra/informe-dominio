import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { actualizarEstado } from "../../../backend/src/controllers/solicitudController";

interface Solicitud{
    id:number,
    mailClient:string,
    patente:string,
    tipoVehiculo:string,
    estado:string,
    pagoEstado:string,
    archivoInforme:string| null,
    createdAt:string

}

const DetalleSolicitud=()=>{
const {id}= useParams()
const navigate = useNavigate()
const [solicitud, setSolicitud]= useState<Solicitud|null>(null)
const [estado,setEstado]= useState('')
useEffect(()=>{
const fetchSolicitud= async()=>{
          try {
        const response = await axios.get(`http://localhost:3000/api/solicitudes/${id}`, {
          withCredentials: true
        })
        setSolicitud(response.data)
        setEstado(response.data.estado)
      } catch (error) {
        navigate('/admin')
      }
}
fetchSolicitud()
},[id])

const actualizarEstado= async ()=>{
    try {
           try {
      await axios.patch(
        `http://localhost:3000/api/solicitudes/${id}`,
        { estado },
        { withCredentials: true }
      )
      alert('Estado actualizado!')
    } catch (error) {
      alert('Error al actualizar')
    }} catch (error) {
        alert('error al actualizar ')
    }
}
if(!solicitud) return <p>cargando....</p>

return(
    <div>
             <button onClick={() => navigate('/admin/solicitudes')}>← Volver</button>
      <h1>Solicitud #{solicitud.id}</h1>
      <p><strong>Mail:</strong> {solicitud.mailClient}</p>
      <p><strong>Patente:</strong> {solicitud.patente}</p>
      <p><strong>Vehículo:</strong> {solicitud.tipoVehiculo}</p>
      <p><strong>Pago:</strong> {solicitud.pagoEstado}</p>
      <p><strong>Fecha:</strong> {new Date(solicitud.createdAt).toLocaleDateString('es-AR')}</p>

      <div>
        <label>Estado</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En proceso</option>
          <option value="listo">Listo</option>
        </select>
        <button onClick={actualizarEstado}>Guardar estado</button>
      </div>
    </div>
)
}

export default DetalleSolicitud