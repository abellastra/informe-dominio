import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const inputClass =
  "w-full px-3.5 py-2.5 border-[1.5px] border-[#E8E0DC] rounded-xl text-sm text-[#1C1412] bg-white outline-none transition focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/10 placeholder:text-[#B8A8A4] appearance-none";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F7F5F3]">
      <div className="bg-white border border-[#EDE8E4] rounded-2xl shadow-lg w-full max-w-[500px] overflow-hidden">
        {/* Header */}
        <div className="bg-[#2D1414] px-8 py-7 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#FF6B4A]/10 blur-2xl pointer-events-none" />
          <p className="text-[#FF6B4A] text-[11px] font-semibold tracking-[0.12em] uppercase mb-1.5">
            Cadenas Gestoria Integral
          </p>
          <h1 className="text-white text-xl font-bold">Solicitar informe</h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center px-8 py-4 bg-[#FAF8F7] border-b border-[#EDE8E4]">
          {pasos.map((nombre, index) => {
            const numero = index + 1;
            const activo = paso === numero;
            const completo = paso > numero;
            return (
              <div key={nombre} className="flex items-center flex-1">
                <div className="flex items-center gap-2 shrink-0">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                      ${completo ? "bg-emerald-500 text-white" : activo ? "bg-[#FF6B4A] text-white" : "bg-[#EDE8E4] text-[#9A7A75]"}`}
                  >
                    {completo ? "✓" : numero}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block transition-colors ${activo ? "text-[#1C1412]" : "text-[#9A7A75]"}`}
                  >
                    {nombre}
                  </span>
                </div>
                {index < pasos.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-3 transition-colors ${completo ? "bg-emerald-300" : "bg-[#EDE8E4]"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Contenido */}
        <div className="p-8">
          {/* Paso 1 */}
          {paso === 1 && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#2D1414]">
                    Nombre
                  </label>
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
                  <label className="text-sm font-medium text-[#2D1414]">
                    Apellido
                  </label>
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
                <label className="text-sm font-medium text-[#2D1414]">
                  CUIL/CUIT
                </label>
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
                <label className="text-sm font-medium text-[#2D1414]">
                  Teléfono celular
                </label>
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
                <label className="text-sm font-medium text-[#2D1414]">
                  Correo electrónico
                </label>
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
                disabled={
                  !datos.nombre ||
                  !datos.apellido ||
                  !datos.cuil ||
                  !datos.telefono ||
                  !datos.mailCliente
                }
                className="w-full py-3 bg-[#2D1414] hover:bg-[#3D1E1E] disabled:bg-[#EDE8E4] disabled:text-[#B8A8A4] text-white font-semibold rounded-xl transition-all mt-2 cursor-pointer disabled:cursor-not-allowed"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* Paso 2 */}
          {paso === 2 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#2D1414]">
                  Patente
                </label>
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
                <label className="text-sm font-medium text-[#2D1414]">
                  Marca y modelo
                </label>
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
                <label className="text-sm font-medium text-[#2D1414]">
                  Tipo de vehículo
                </label>
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
                <label className="text-sm font-medium text-[#2D1414]">
                  Tipo de informe
                </label>
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
                  className="flex-1 py-3 border border-[#EDE8E4] text-[#D64040] font-medium rounded-xl hover:bg-[#FFF5F3] hover:border-[#FF8066] transition-all cursor-pointer"
                >
                  ← Volver
                </button>
                <button
                  onClick={() => setPaso(3)}
                  disabled={
                    !datos.patente ||
                    !datos.marcaModelo ||
                    !datos.tipoVehiculo ||
                    !datos.tipoInforme
                  }
                  className="flex-1 py-3 bg-[#2D1414] hover:bg-[#3D1E1E] disabled:bg-[#EDE8E4] disabled:text-[#B8A8A4] text-white font-semibold rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* Paso 3 */}
          {paso === 3 && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-[#9A7A75]">
                Revisá tus datos antes de pagar
              </p>

              <div className="bg-[#FAF8F7] border border-[#EDE8E4] rounded-xl p-4 flex flex-col gap-3 text-sm">
                {[
                  {
                    label: "Nombre",
                    value: `${datos.nombre} ${datos.apellido}`,
                  },
                  { label: "CUIL", value: datos.cuil },
                  { label: "Teléfono", value: datos.telefono },
                  { label: "Mail", value: datos.mailCliente },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-[#9A7A75]">{label}</span>
                    <span className="font-medium text-[#1C1412]">{value}</span>
                  </div>
                ))}
                <hr className="border-[#EDE8E4]" />
                {[
                  { label: "Patente", value: datos.patente, bold: true },
                  { label: "Vehículo", value: datos.marcaModelo },
                  { label: "Tipo de informe", value: datos.tipoInforme },
                ].map(({ label, value, bold }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-[#9A7A75]">{label}</span>
                    <span
                      className={`text-[#1C1412] ${bold ? "font-bold tracking-wider" : "font-medium"}`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#B8A8A4] text-center">
                Al continuar aceptás los{" "}
                <a href="/terminos" className="text-[#FF6B4A] underline">
                  términos y condiciones
                </a>{" "}
                del servicio
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setPaso(2)}
                  className="flex-1 py-3 border border-[#EDE8E4] text-[#D64040] font-medium rounded-xl hover:bg-[#FFF5F3] hover:border-[#FF8066] transition-all cursor-pointer"
                >
                  ← Volver
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-3 bg-[#FF6B4A] hover:bg-[#E85535] disabled:bg-[#EDE8E4] disabled:text-[#B8A8A4] text-white font-semibold rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
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
