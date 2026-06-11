import axios from "axios";
import axiosInstance from "../axiosInstance";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Solicitud {
  id: number;
  mailCliente: string;
  patente: string;
  tipoVehiculo: string;
  estado: string;
  pagoEstado: string;
  archivoInforme: string | null;
  createdAt: string;
}

const pagoBadgeClass: Record<string, string> = {
  aprobado: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pendiente: "bg-amber-50 text-amber-700 border-amber-200",
  rechazado: "bg-red-50 text-red-700 border-red-200",
};
const pagoLabels: Record<string, string> = {
  aprobado: "Aprobado",
  pendiente: "Pendiente",
  rechazado: "Rechazado",
};

const selectClass =
  "w-full px-3.5 py-2.5 border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] bg-white outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 cursor-pointer appearance-none";

const Topbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axiosInstance.post("/api/admin/logout");
    navigate("/");
  };

  return (
    <nav className="bg-[#1E3A5F] border-b border-[#2A4A7F] h-[60px] px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/25 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect
              x="2"
              y="1"
              width="12"
              height="14"
              rx="1.5"
              stroke="#93C5FD"
              strokeWidth="1.5"
            />
            <line
              x1="5"
              y1="5"
              x2="11"
              y2="5"
              stroke="#93C5FD"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <line
              x1="5"
              y1="8"
              x2="11"
              y2="8"
              stroke="#93C5FD"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <line
              x1="5"
              y1="11"
              x2="8"
              y2="11"
              stroke="#93C5FD"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-none">
            Cadenas Gestoria
          </p>
          <p className="text-[#93C5FD] text-[11px] leading-none mt-0.5">
            Panel de gestión
          </p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="text-[#93C5FD] hover:text-white text-sm transition-colors cursor-pointer"
      >
        Cerrar sesión
      </button>
    </nav>
  );
};

const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
      <p className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
        {title}
      </p>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const DetalleSolicitud = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [solicitud, setSolicitud] = useState<Solicitud | null>(null);
  const [estado, setEstado] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(
    null,
  );

  useEffect(() => {
    const fetchSolicitud = async () => {
      try {
        const response = await axiosInstance.get(`/api/solicitudes/${id}`);
        setSolicitud(response.data);
        setEstado(response.data.estado);
      } catch {
        navigate("/");
      }
    };
    fetchSolicitud();
  }, [id]);

  const actualizarEstado = async () => {
    try {
      await axiosInstance.patch(`/api/solicitudes/${id}`, { estado });
      alert("Estado actualizado!");
    } catch {
      alert("Error al actualizar");
    }
  };

  const subirInforme = async () => {
    if (!archivoSeleccionado) return;
    setSubiendo(true);
    try {
      const { data: firmaData } = await axiosInstance.get(
        "/api/admin/firma-cloudinary",
      );
      const formData = new FormData();
      formData.append("file", archivoSeleccionado);
      formData.append("api_key", firmaData.apiKey);
      formData.append("timestamp", firmaData.timestamp);
      formData.append("signature", firmaData.firma);
      formData.append("folder", firmaData.folder);
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${firmaData.cloudName}/raw/upload`,
        formData,
      );
      const urlInforme = cloudinaryRes.data.secure_url;
      const { data } = await axiosInstance.post(
        `/api/solicitudes/${id}/informe`,
        { urlInforme },
      );
      setSolicitud(data);
      setEstado(data.estado);
      if (data.mailEnviado === false) {
        alert(
          `Informe subido pero no se pudo enviar el mail: ${data.mailError}`,
        );
      } else {
        alert("Informe subido y mail enviado al cliente!");
      }
    } catch (error) {
      console.log(error);
      alert("Error al subir el informe");
    } finally {
      setSubiendo(false);
    }
  };

  if (!solicitud) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Topbar />
        <div className="flex-1 flex items-center justify-center gap-3 text-[#64748B] text-sm">
          <div className="w-5 h-5 border-2 border-[#E2E8F0] border-t-[#3B82F6] rounded-full animate-spin" />
          Cargando solicitud...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Topbar />

      <div className="flex-1 p-6 sm:p-8 max-w-[900px] mx-auto w-full">
        {/* Page header */}
        <div className="flex items-center justify-between mb-7 gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Solicitud #{solicitud.id}
            </h1>
            <p className="text-sm text-[#64748B] mt-0.5">
              Detalle y gestión del informe
            </p>
          </div>
          <button
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#E2E8F0] text-[#3B82F6] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] rounded-xl transition-all text-sm font-medium cursor-pointer"
            onClick={() => navigate("/solicitudes")}
          >
            ← Volver
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Datos del vehículo */}
          <SectionCard title="Datos del vehículo">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5">
              {[
                { label: "Mail", value: solicitud.mailCliente },
                { label: "Patente", value: solicitud.patente, mono: true },
                {
                  label: "Tipo de vehículo",
                  value: solicitud.tipoVehiculo,
                  capitalize: true,
                },
                {
                  label: "Fecha",
                  value: new Date(solicitud.createdAt).toLocaleDateString(
                    "es-AR",
                  ),
                },
              ].map(({ label, value, mono, capitalize }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                    {label}
                  </span>
                  <span
                    className={`text-sm font-medium text-[#0F172A] ${mono ? "font-bold tracking-widest" : ""} ${capitalize ? "capitalize" : ""}`}
                  >
                    {value}
                  </span>
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                  Pago
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border w-fit ${pagoBadgeClass[solicitud.pagoEstado] ?? "bg-amber-50 text-amber-700 border-amber-200"}`}
                >
                  {pagoLabels[solicitud.pagoEstado] ?? solicitud.pagoEstado}
                </span>
              </div>
            </div>
          </SectionCard>

          {/* Gestión del estado */}
          <SectionCard title="Gestión del informe">
            <div className="flex gap-3 items-end flex-wrap">
              <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                <label
                  htmlFor="estado"
                  className="text-sm font-medium text-[#0F172A]"
                >
                  Estado de la solicitud
                </label>
                <select
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className={selectClass}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En proceso</option>
                  <option value="listo">Listo</option>
                </select>
              </div>
              <button
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[#1E3A5F] hover:bg-[#15294A] active:scale-[0.98] text-white font-medium rounded-xl transition-all cursor-pointer border-none text-sm shrink-0"
                onClick={actualizarEstado}
              >
                Guardar estado
              </button>
            </div>
          </SectionCard>

          {/* Subir informe */}
          <SectionCard title="Subir informe PDF">
            {solicitud.archivoInforme ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-emerald-600 text-lg">✓</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-emerald-800">
                      Informe ya subido
                    </p>
                  </div>
                  <a
                    href={solicitud.archivoInforme}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[#3B82F6] underline font-medium hover:text-[#2563EB]"
                  >
                    Ver informe →
                  </a>
                </div>
                <button
                  onClick={async () => {
                    try {
                      await axiosInstance.post(
                        `/api/solicitudes/${id}/reenviar-mail`,
                      );
                      alert("Mail reenviado al cliente!");
                    } catch {
                      alert("Error al reenviar el mail");
                    }
                  }}
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-[#1E3A5F] hover:bg-[#15294A] text-white font-medium rounded-xl transition-all text-sm border-none cursor-pointer"
                >
                  Reenviar mail al cliente
                </button>
              </div>
            ) : (
              <div className="flex gap-3 items-end flex-wrap">
                <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                  <label className="text-sm font-medium text-[#0F172A]">
                    Seleccioná el PDF
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      setArchivoSeleccionado(e.target.files?.[0] || null)
                    }
                    className="w-full px-3.5 py-2.5 border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] bg-white outline-none cursor-pointer file:mr-3 file:px-3 file:py-1 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-[#DBEAFE] file:text-[#1E3A5F]"
                  />
                </div>
                <button
                  onClick={subirInforme}
                  disabled={!archivoSeleccionado || subiendo}
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#E2E8F0] disabled:text-[#94A3B8] active:scale-[0.98] text-white font-medium rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed border-none text-sm shrink-0"
                >
                  {subiendo ? "Subiendo..." : "Subir informe →"}
                </button>
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default DetalleSolicitud;
