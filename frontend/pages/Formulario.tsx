import { useState } from 'react'
import axios from 'axios'

const Formulario = () => {
  const [datos, setDatos] = useState({
    mailCliente: '',
    patente: '',
    tipoVehiculo: ''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/api/solicitudes', datos)
      const solicitudId = response.data.id

      const pago = await axios.post(`http://localhost:3000/api/solicitudes/${solicitudId}/pagar`)
      window.location.href = pago.data.url

    } catch (error) {
      console.log(error)
      alert('Hubo un error, intenta de nuevo')
    }
  }

  return (
    <div>
      <h1>Solicitar informe de dominio</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="mailCliente"
            value={datos.mailCliente}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Patente</label>
          <input
            type="text"
            name="patente"
            value={datos.patente}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tipo de vehículo</label>
          <select
            name="tipoVehiculo"
            value={datos.tipoVehiculo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccioná uno</option>
            <option value="auto">Auto</option>
            <option value="moto">Moto</option>
            <option value="camioneta">Camioneta</option>
            <option value="camion">Camión</option>
          </select>
        </div>
        <button type="submit">Solicitar y pagar</button>
      </form>
    </div>
  )
}

export default Formulario