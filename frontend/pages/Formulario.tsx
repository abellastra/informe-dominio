import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const inputClass =
  "w-full px-3.5 py-2.5 border-[1.5px] border-slate-200 rounded-md text-sm text-slate-900 bg-white outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 placeholder:text-slate-400 appearance-none";

interface Datos {
  nombre: string;
  apellido: string;
  cuil: string;
  telefono: string;
  mailCliente: string;
  patente: string;
  marcaModelo: string;
  tipoVehiculo: string;
  tipoInforme: string;
}

const Formulario = () => {

const [searchParams] = useSearchParams();
const tipoInicial = searchParams.get("tipo") || "";
  const [paso, setPaso] = useState(1);
const [datos, setDatos] = useState<Datos>({
  nombre: "",
  apellido: "",
  cuil: "",
  telefono: "",
  mailCliente: "",
  patente: "",
  marcaModelo: "",
  tipoVehiculo: "",
  tipoInforme: tipoInicial,  
});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/solicitudes", datos);
      const solicitudId = response.data.id;
      const pago = await axios.post(`/api/solicitudes/${solicitudId}/pagar`);
      window.open(pago.data.url, "_blank");
    } catch (error) {
      console.log(error);
      alert("Hubo un error, intenta de nuevo");
    } finally {
      setLoading(false);
    }
  };

  const pasos = ["Tus datos", "El vehículo", "Confirmación"];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg w-full max-w-[500px] overflow-hidden">

        {/* Header */}
        <div className="bg-[#3D2B2B] px-8 py-6 text-center">
          <p className="text-[#E8A598] text-xs font-medium tracking-widest uppercase mb-1">
            Cadenas Gestoria Integral
          </p>
          <h1 className="text-white text-xl font-bold">
            Solicitar informe
          </h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center px-8 py-4 border-b border-gray-100">
          {pasos.map((nombre, index) => {
            const numero = index + 1;
            const activo = paso === numero;
            const completo = paso > numero;
            return (
              <div key={nombre} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                      ${completo ? "bg-green-500 text-white" :
                        activo ? "bg-[#3D2B2B] text-white" :
                        "bg-gray-100 text-gray-400"}`}
                  >
                    {completo ? "✓" : numero}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block
                    ${activo ? "text-gray-800" : "text-gray-400"}`}>
                    {nombre}
                  </span>
                </div>
                {index < pasos.length - 1 && (
                  <div className={`flex-1 h-px mx-3 ${completo ? "bg-green-400" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Contenido */}
        <div className="p-8">

          {/* Paso 1 — Datos personales */}
          {paso === 1 && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-800">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={datos.nombre}
                    onChange={handleChange}
                    placeholder="Juan"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-800">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    value={datos.apellido}
                    onChange={handleChange}
                    placeholder="García"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-800">CUIL/CUIT</label>
                <input
                  type="text"
                  name="cuil"
                  value={datos.cuil}
                  onChange={handleChange}
                  placeholder="20-12345678-9"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-800">Teléfono celular</label>
                <input
                  type="text"
                  name="telefono"
                  value={datos.telefono}
                  onChange={handleChange}
                  placeholder="351 123 4567"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-800">Correo electrónico</label>
                <input
                  type="email"
                  name="mailCliente"
                  value={datos.mailCliente}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className={inputClass}
                />
              </div>

              <button
                onClick={() => setPaso(2)}
                disabled={!datos.nombre || !datos.apellido || !datos.cuil || !datos.telefono || !datos.mailCliente}
                className="w-full py-3 bg-[#3D2B2B] hover:bg-[#4e3535] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold rounded-md transition-all mt-2"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* Paso 2 — Datos del vehículo */}
          {paso === 2 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-800">Patente</label>
                <input
                  type="text"
                  name="patente"
                  value={datos.patente}
                  onChange={handleChange}
                  placeholder="Ej: ABC 123 o AB 123 CD"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-800">Marca y modelo</label>
                <input
                  type="text"
                  name="marcaModelo"
                  value={datos.marcaModelo}
                  onChange={handleChange}
                  placeholder="Ej: Toyota Corolla"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-800">Tipo de vehículo</label>
                <select
                  name="tipoVehiculo"
                  value={datos.tipoVehiculo}
                  onChange={handleChange}
                  className={inputClass + " cursor-pointer"}
                >
                  <option value="">Seleccioná uno</option>
                  <option value="auto">Auto</option>
                  <option value="moto">Moto</option>
                  <option value="camioneta">Camioneta</option>
                  <option value="camion">Camión</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-800">Tipo de informe</label>
                <select
                  name="tipoInforme"
                  value={datos.tipoInforme}
                  onChange={handleChange}
                  className={inputClass + " cursor-pointer"}
                >
                  <option value="">Seleccioná uno</option>
                  <option value="dominio">Informe de dominio</option>
                  <option value="historico">Informe histórico</option>
                  <option value="nominal">Informe nominal</option>
                  <option value="anotaciones">Anotaciones personales</option>
                </select>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setPaso(1)}
                  className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-md hover:bg-gray-50 transition-all"
                >
                  ← Volver
                </button>
                <button
                  onClick={() => setPaso(3)}
                  disabled={!datos.patente || !datos.marcaModelo || !datos.tipoVehiculo || !datos.tipoInforme}
                  className="flex-1 py-3 bg-[#3D2B2B] hover:bg-[#4e3535] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold rounded-md transition-all"
                >
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* Paso 3 — Confirmación */}
          {paso === 3 && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-500 mb-2">Revisá tus datos antes de pagar</p>

              <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Nombre</span>
                  <span className="font-medium text-gray-800">{datos.nombre} {datos.apellido}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">CUIL</span>
                  <span className="font-medium text-gray-800">{datos.cuil}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Teléfono</span>
                  <span className="font-medium text-gray-800">{datos.telefono}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mail</span>
                  <span className="font-medium text-gray-800">{datos.mailCliente}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between">
                  <span className="text-gray-500">Patente</span>
                  <span className="font-bold text-gray-800 tracking-wider">{datos.patente}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Vehículo</span>
                  <span className="font-medium text-gray-800">{datos.marcaModelo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tipo de informe</span>
                  <span className="font-medium text-gray-800">{datos.tipoInforme}</span>
                </div>
              </div>

              {/* Términos */}
              <p className="text-xs text-gray-400 text-center">
                Al continuar aceptás los{" "}
                <a href="/terminos" className="text-[#993556] underline">términos y condiciones</a>
                {" "}del servicio
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setPaso(2)}
                  className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-md hover:bg-gray-50 transition-all"
                >
                  ← Volver
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-3 bg-[#E8A598] hover:bg-[#d4917f] disabled:bg-gray-200 text-[#3D2B2B] font-semibold rounded-md transition-all"
                >
                  {loading ? "Procesando..." : "Ir a pagar →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Formulario;