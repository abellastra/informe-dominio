import { useState } from "react";
import axios from "axios";

const Formulario = () => {
  const [datos, setDatos] = useState({
    mailCliente: "",
    patente: "",
    tipoVehiculo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/solicitudes", datos);
      const solicitudId = response.data.id;

      const pago = await axios.post(`/api/solicitudes/${solicitudId}/pagar`);
      window.location.href = pago.data.url;
    } catch (error) {
      console.log(error);
      alert("Hubo un error, intenta de nuevo");
    }
  };

  return (
    <div className="page-center">
      <div className="public-card">
        <div className="public-card-header">
          <div className="public-card-icon">🚗</div>
          <h1>Informe de Dominio</h1>
          <p>Completá los datos para solicitar tu informe vehicular</p>
        </div>

        <div className="public-card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="mailCliente">Correo electrónico</label>
              <input
                id="mailCliente"
                type="email"
                name="mailCliente"
                value={datos.mailCliente}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="patente">Patente del vehículo</label>
              <input
                id="patente"
                type="text"
                name="patente"
                value={datos.patente}
                onChange={handleChange}
                placeholder="Ej: ABC 123"
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: "1.75rem" }}>
              <label htmlFor="tipoVehiculo">Tipo de vehículo</label>
              <select
                id="tipoVehiculo"
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

            <button type="submit" className="btn btn-primary btn-full btn-lg">
              Solicitar y pagar →
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              fontSize: "0.8rem",
              marginTop: "1.25rem",
              color: "var(--text-light)",
            }}
          >
            Recibirás el informe por correo electrónico
          </p>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
