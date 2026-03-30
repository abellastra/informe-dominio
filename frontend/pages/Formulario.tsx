import { useState } from "react";
import axios from "axios";

const inputClass =
  "w-full px-3.5 py-2.5 border-[1.5px] border-slate-200 rounded-md text-sm text-slate-900 bg-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400 appearance-none";

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
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-slate-100 to-green-50">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-lg w-full max-w-[460px] overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-8 py-8 text-center">
          <div className="w-[52px] h-[52px] bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🚗
          </div>
          <h1 className="text-white text-[1.4rem] font-bold">
            Informe de Dominio
          </h1>
          <p className="text-white/75 text-sm mt-1">
            Completá los datos para solicitar tu informe vehicular
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5 mb-5">
              <label
                htmlFor="mailCliente"
                className="text-sm font-medium text-slate-900"
              >
                Correo electrónico
              </label>
              <input
                id="mailCliente"
                type="email"
                name="mailCliente"
                value={datos.mailCliente}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-5">
              <label
                htmlFor="patente"
                className="text-sm font-medium text-slate-900"
              >
                Patente del vehículo
              </label>
              <input
                id="patente"
                type="text"
                name="patente"
                value={datos.patente}
                onChange={handleChange}
                placeholder="Ej: ABC 123"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-7">
              <label
                htmlFor="tipoVehiculo"
                className="text-sm font-medium text-slate-900"
              >
                Tipo de vehículo
              </label>
              <select
                id="tipoVehiculo"
                name="tipoVehiculo"
                value={datos.tipoVehiculo}
                onChange={handleChange}
                required
                className={inputClass + " cursor-pointer"}
              >
                <option value="">Seleccioná uno</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
                <option value="camioneta">Camioneta</option>
                <option value="camion">Camión</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 active:translate-y-px text-white font-semibold rounded-md shadow-md transition-all cursor-pointer border-none text-base"
            >
              Solicitar y pagar →
            </button>
          </form>

          <p className="text-center text-[0.8rem] mt-5 text-slate-400">
            Recibirás el informe por correo electrónico
          </p>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
