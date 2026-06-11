import { useState } from "react";
import axiosInstance from "../src/axiosInstance";
import { useSearchParams } from "react-router-dom";

const inputClass =
  "w-full px-3.5 py-2.5 border-[1.5px] border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] bg-white outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 placeholder:text-[#94A3B8] appearance-none";

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

const erroresIniciales = {
  nombre: "",
  apellido: "",
  cuil: "",
  telefono: "",
  mailCliente: "",
  patente: "",
  marcaModelo: "",
};

const formatCuil = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 10) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 10)}-${digits.slice(10)}`;
};

const formatPatente = (value: string): string =>
  value.replace(/\s/g, "").toUpperCase().slice(0, 7);

const validar = (campo: string, valor: string) => {
  switch (campo) {
    case "mailCliente":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor) ? "" : "Email inválido";
    case "cuil":
      if (valor.length < 13) return "";
      return /^\d{2}-\d{8}-\d$/.test(valor)
        ? ""
        : "CUIL inválido (ej: 20-12345678-9)";
    case "telefono":
      return /^\d{10,15}$/.test(valor.replace(/\s/g, ""))
        ? ""
        : "Teléfono inválido (10 dígitos)";
    case "patente":
      if (valor.length < 6) return "";
      return /^[A-Z]{2}\d{3}[A-Z]{2}$|^[A-Z]{3}\d{3}$|^[A-Z]\d{3}[A-Z]{3}$|^\d{3}[A-Z]{3}$/.test(
        valor,
      )
        ? ""
        : "Patente inválida (ej: ABC123, AB123CD o A123BCD)";
    case "nombre":
    case "apellido":
    case "marcaModelo":
      return valor.trim().length >= 2 ? "" : "Mínimo 2 caracteres";
    default:
      return "";
  }
};

const Formulario = () => {
  const [searchParams] = useSearchParams();
  const tipoInicial = searchParams.get("tipo") || "";
  const [paso, setPaso] = useState(1);
  const [errores, setErrores] = useState(erroresIniciales);
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
    const { name } = e.target;
    let value = e.target.value;
    if (name === "cuil") value = formatCuil(value);
    if (name === "patente") value = formatPatente(value);
    setDatos({ ...datos, [name]: value });
    if (name in errores) {
      setErrores({ ...errores, [name]: validar(name, value) });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/solicitudes", datos);
      const solicitudId = response.data.id;
      const pago = await axiosInstance.post(
        `/api/solicitudes/${solicitudId}/pagar`,
      );
      window.location.href = pago.data.url;
    } catch (error) {
      console.log(error);
      alert("Hubo un error, intenta de nuevo");
    } finally {
      setLoading(false);
    }
  };

  const pasos = ["Tus datos", "El vehículo", "Confirmación"];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F8FAFC]">
      <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-lg w-full max-w-[500px] overflow-hidden">
        {/* Header */}
        <div className="bg-[#1E3A5F] px-8 py-7 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#3B82F6]/20 blur-2xl pointer-events-none" />
          <p className="text-[#93C5FD] text-[11px] font-semibold tracking-[0.12em] uppercase mb-1.5">
            Cadenas Gestoria Integral
          </p>
          <h1 className="text-white text-xl font-bold">Solicitar informe</h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center px-8 py-4 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          {pasos.map((nombre, index) => {
            const numero = index + 1;
            const activo = paso === numero;
            const completo = paso > numero;
            return (
              <div key={nombre} className="flex items-center flex-1">
                <div className="flex items-center gap-2 shrink-0">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                      ${completo ? "bg-emerald-500 text-white" : activo ? "bg-[#3B82F6] text-white" : "bg-[#E2E8F0] text-[#64748B]"}`}
                  >
                    {completo ? "✓" : numero}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block transition-colors ${activo ? "text-[#0F172A]" : "text-[#64748B]"}`}
                  >
                    {nombre}
                  </span>
                </div>
                {index < pasos.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-3 transition-colors ${completo ? "bg-emerald-300" : "bg-[#E2E8F0]"}`}
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
                  <label className="text-sm font-medium text-[#0F172A]">
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
                  {errores.nombre && (
                    <p className="text-xs text-red-500">{errores.nombre}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#0F172A]">
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
                  {errores.apellido && (
                    <p className="text-xs text-red-500">{errores.apellido}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0F172A]">
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
                {errores.cuil && (
                  <p className="text-xs text-red-500">{errores.cuil}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0F172A]">
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
                {errores.telefono && (
                  <p className="text-xs text-red-500">{errores.telefono}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0F172A]">
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
                {errores.mailCliente && (
                  <p className="text-xs text-red-500">{errores.mailCliente}</p>
                )}
              </div>

              <button
                onClick={() => setPaso(2)}
                disabled={
                  !datos.nombre ||
                  !!errores.nombre ||
                  !datos.apellido ||
                  !!errores.apellido ||
                  !datos.cuil ||
                  !!errores.cuil ||
                  !datos.telefono ||
                  !!errores.telefono ||
                  !datos.mailCliente ||
                  !!errores.mailCliente
                }
                className="w-full py-3 bg-[#1E3A5F] hover:bg-[#15294A] disabled:bg-[#E2E8F0] disabled:text-[#94A3B8] text-white font-semibold rounded-xl transition-all mt-2 cursor-pointer disabled:cursor-not-allowed"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* Paso 2 */}
          {paso === 2 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0F172A]">
                  Patente
                </label>
                <input
                  type="text"
                  name="patente"
                  value={datos.patente}
                  onChange={handleChange}
                  placeholder="Ej: ABC123 o AB123CD"
                  className={inputClass}
                />
                {errores.patente && (
                  <p className="text-xs text-red-500">{errores.patente}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0F172A]">
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
                {errores.marcaModelo && (
                  <p className="text-xs text-red-500">{errores.marcaModelo}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0F172A]">
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

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setPaso(1)}
                  className="flex-1 py-3 border border-[#E2E8F0] text-[#3B82F6] font-medium rounded-xl hover:bg-[#EFF6FF] hover:border-[#BFDBFE] transition-all cursor-pointer"
                >
                  ← Volver
                </button>
                <button
                  onClick={() => setPaso(3)}
                  disabled={
                    !datos.patente ||
                    !!errores.patente ||
                    !datos.marcaModelo ||
                    !!errores.marcaModelo ||
                    !datos.tipoVehiculo
                  }
                  className="flex-1 py-3 bg-[#1E3A5F] hover:bg-[#15294A] disabled:bg-[#E2E8F0] disabled:text-[#94A3B8] text-white font-semibold rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* Paso 3 */}
          {paso === 3 && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-[#64748B]">
                Revisá tus datos antes de pagar
              </p>

              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex flex-col gap-3 text-sm">
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
                    <span className="text-[#64748B]">{label}</span>
                    <span className="font-medium text-[#0F172A]">{value}</span>
                  </div>
                ))}
                <hr className="border-[#E2E8F0]" />
                {[
                  { label: "Patente", value: datos.patente, bold: true },
                  { label: "Vehículo", value: datos.marcaModelo },
                ].map(({ label, value, bold }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-[#64748B]">{label}</span>
                    <span
                      className={`text-[#0F172A] ${bold ? "font-bold tracking-wider" : "font-medium"}`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#94A3B8] text-center">
                Al continuar aceptás los{" "}
                <a href="/terminos" className="text-[#3B82F6] underline">
                  términos y condiciones
                </a>{" "}
                del servicio
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setPaso(2)}
                  className="flex-1 py-3 border border-[#E2E8F0] text-[#3B82F6] font-medium rounded-xl hover:bg-[#EFF6FF] hover:border-[#BFDBFE] transition-all cursor-pointer"
                >
                  ← Volver
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-3 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#E2E8F0] disabled:text-[#94A3B8] text-white font-semibold rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
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
