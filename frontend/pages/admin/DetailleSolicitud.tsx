import axios from "axios";
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
  "w-full px-3.5 py-2.5 border border-[#EDE8E4] rounded-xl text-sm text-[#1C1412] bg-white outline-none transition focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/10 cursor-pointer appearance-none";

const Topbar = ({ onBack }: { onBack?: () => void }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.post("/api/admin/logout", {}, { withCredentials: true });
    navigate("/admin");
  };

  return (
    <nav className="bg-[#1E0C0C] border-b border-[#3A2020] h-[60px] px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#FF6B4A]/15 border border-[#FF6B4A]/25 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect
              x="2"
              y="1"
              width="12"
              height="14"
              rx="1.5"
              stroke="#FF6B4A"
              strokeWidth="1.5"
            />
            <line
              x1="5"
              y1="5"
              x2="11"
              y2="5"
              stroke="#FF6B4A"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <line
              x1="5"
              y1="8"
              x2="11"
              y2="8"
              stroke="#FF6B4A"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <line
              x1="5"
              y1="11"
              x2="8"
              y2="11"
              stroke="#FF6B4A"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-none">
            Cadenas Gestoria
          </p>
          <p className="text-[#C07060] text-[11px] leading-none mt-0.5">
            Panel de gestión
          </p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="text-[#C07060] hover:text-[#FF9F87] text-sm transition-colors cursor-pointer"
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
  <div className="bg-white border border-[#EDE8E4] rounded-2xl shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-[#EDE8E4] bg-[#FAF8F7]">
      <p className="text-[11px] font-semibold text-[#9A7A75] uppercase tracking-wider">
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
        const response = await axios.get(`/api/solicitudes/${id}`, {
          withCredentials: true,
        });
        setSolicitud(response.data);
        setEstado(response.data.estado);
      } catch {
        navigate("/admin");
      }
    };
    fetchSolicitud();
  }, [id]);

  const actualizarEstado = async () => {
    try {
      await axios.patch(
        `/api/solicitudes/${id}`,
        { estado },
        { withCredentials: true },
      );
      alert("Estado actualizado!");
    } catch {
      alert("Error al actualizar");
    }
  };

  const subirInforme = async () => {
    if (!archivoSeleccionado) return;
    setSubiendo(true);
    try {
      const { data: firmaData } = await axios.get(
        "/api/admin/firma-cloudinary",
        { withCredentials: true },
      );
      const formData = new FormData();
      formData.append("file", archivoSeleccionado);
      formData.append("api_key", firmaData.apiKey);
      formData.append("timestamp", firmaData.timestamp);
      formData.append("signature", firmaData.firma);
      formData.append("folder", firmaData.folder);
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${firmaData.cloudName}/image/upload`,
        formData,
      );
      const urlInforme = cloudinaryRes.data.secure_url;
      const { data } = await axios.post(
        `/api/solicitudes/${id}/informe`,
        { urlInforme },
        { withCredentials: true },
      );
      setSolicitud(data);
      setEstado(data.estado);
      alert("Informe subido y mail enviado al cliente!");
    } catch (error) {
      console.log(error);
      alert("Error al subir el informe");
    } finally {
      setSubiendo(false);
    }
  };

  if (!solicitud) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F4F2]">
        <Topbar />
        <div className="flex-1 flex items-center justify-center gap-3 text-[#8A7570] text-sm">
          <div className="w-5 h-5 border-2 border-[#EDE8E4] border-t-[#FF6B4A] rounded-full animate-spin" />
          Cargando solicitud...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F4F2]">
      <Topbar />

      <div className="flex-1 p-6 sm:p-8 max-w-[900px] mx-auto w-full">
        {/* Page header */}
        <div className="flex items-center justify-between mb-7 gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#1C1412] tracking-tight">
              Solicitud #{solicitud.id}
            </h1>
            <p className="text-sm text-[#8A7570] mt-0.5">
              Detalle y gestión del informe
            </p>
          </div>
          <button
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#EDE8E4] text-[#D64040] hover:bg-[#FFF5F3] hover:border-[#FF8066] rounded-xl transition-all text-sm font-medium cursor-pointer"
            onClick={() => navigate("/admin/solicitudes")}
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
                  <span className="text-[11px] font-semibold text-[#9A7A75] uppercase tracking-wider">
                    {label}
                  </span>
                  <span
                    className={`text-sm font-medium text-[#1C1412] ${mono ? "font-bold tracking-widest" : ""} ${capitalize ? "capitalize" : ""}`}
                  >
                    {value}
                  </span>
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-[#9A7A75] uppercase tracking-wider">
                  Pago
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border w-fit ${pagoBadgeClass[solicitud.pagoEstado] ?? "bg-[#F5F0EE] text-[#8A7570] border-[#E0D5D0]"}`}
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
                  className="text-sm font-medium text-[#2D1414]"
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
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[#2D1414] hover:bg-[#3D1E1E] active:scale-[0.98] text-white font-medium rounded-xl transition-all cursor-pointer border-none text-sm shrink-0"
                onClick={actualizarEstado}
              >
                Guardar estado
              </button>
            </div>
          </SectionCard>

          {/* Subir informe */}
          <SectionCard title="Subir informe PDF">
            {solicitud.archivoInforme ? (
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
                  className="text-sm text-[#D64040] underline font-medium hover:text-[#FF6B4A]"
                >
                  Ver informe →
                </a>
              </div>
            ) : (
              <div className="flex gap-3 items-end flex-wrap">
                <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                  <label className="text-sm font-medium text-[#2D1414]">
                    Seleccioná el PDF
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      setArchivoSeleccionado(e.target.files?.[0] || null)
                    }
                    className="w-full px-3.5 py-2.5 border border-[#EDE8E4] rounded-xl text-sm text-[#1C1412] bg-white outline-none cursor-pointer file:mr-3 file:px-3 file:py-1 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-[#FFE8E4] file:text-[#D64040]"
                  />
                </div>
                <button
                  onClick={subirInforme}
                  disabled={!archivoSeleccionado || subiendo}
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-[#FF6B4A] hover:bg-[#E85535] disabled:bg-[#EDE8E4] disabled:text-[#B8A8A4] active:scale-[0.98] text-white font-medium rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed border-none text-sm shrink-0"
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
