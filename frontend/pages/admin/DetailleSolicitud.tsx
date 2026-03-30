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
  aprobado: "bg-emerald-50 text-emerald-800 border-emerald-200",
  pendiente: "bg-amber-50 text-amber-800 border-amber-200",
  rechazado: "bg-red-50 text-red-800 border-red-200",
};
const pagoLabels: Record<string, string> = {
  aprobado: "Aprobado",
  pendiente: "Pendiente",
  rechazado: "Rechazado",
};

const Topbar = () => (
  <nav className="bg-white border-b border-slate-200 px-8 h-[60px] flex items-center shadow-sm sticky top-0 z-10">
    <div className="flex items-center gap-2.5 font-bold text-slate-900">
      <span className="bg-blue-600 text-white w-[30px] h-[30px] rounded-md flex items-center justify-center text-[0.85rem] font-bold">
        ID
      </span>
      Panel de Gestora
    </div>
  </nav>
);

const DetalleSolicitud = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [solicitud, setSolicitud] = useState<Solicitud | null>(null);
  const [estado, setEstado] = useState("");

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

  if (!solicitud) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-100">
        <Topbar />
        <div className="flex-1 flex items-center justify-center gap-3 text-slate-500 text-sm">
          <div className="w-5 h-5 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
          Cargando solicitud...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Topbar />

      <div className="flex-1 p-8 max-w-[1100px] mx-auto w-full">
        <div className="flex items-center justify-between mb-7 gap-4 flex-wrap">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Solicitud #{solicitud.id}
            </h1>
            <p className="text-sm text-slate-500">
              Detalle y gestión del informe
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center px-3.5 py-1.5 bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 rounded-md transition-all text-[0.8125rem] font-medium cursor-pointer"
            onClick={() => navigate("/admin/solicitudes")}
          >
            ← Volver
          </button>
        </div>

        {/* Datos del vehículo */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow overflow-hidden mb-6">
          <div className="px-8 py-5 border-b border-slate-200 bg-slate-50">
            <p className="text-[0.8125rem] font-semibold text-slate-500 uppercase tracking-wide">
              Datos del vehículo
            </p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Mail
                </span>
                <span className="text-[15px] font-medium text-slate-900">
                  {solicitud.mailCliente}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Patente
                </span>
                <span className="text-[15px] font-bold text-slate-900 tracking-wide">
                  {solicitud.patente}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Tipo de vehículo
                </span>
                <span className="text-[15px] font-medium text-slate-900 capitalize">
                  {solicitud.tipoVehiculo}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Pago
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border w-fit ${pagoBadgeClass[solicitud.pagoEstado] ?? "bg-slate-100 text-slate-500 border-slate-200"}`}
                >
                  {pagoLabels[solicitud.pagoEstado] ?? solicitud.pagoEstado}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Fecha
                </span>
                <span className="text-[15px] font-medium text-slate-900">
                  {new Date(solicitud.createdAt).toLocaleDateString("es-AR")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gestión del estado */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-200 bg-slate-50">
            <p className="text-[0.8125rem] font-semibold text-slate-500 uppercase tracking-wide">
              Gestión del informe
            </p>
          </div>
          <div className="p-8">
            <div className="flex gap-3 items-end flex-wrap">
              <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                <label
                  htmlFor="estado"
                  className="text-sm font-medium text-slate-900"
                >
                  Estado de la solicitud
                </label>
                <select
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="w-full px-3.5 py-2.5 border-[1.5px] border-slate-200 rounded-md text-sm text-slate-900 bg-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer appearance-none"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En proceso</option>
                  <option value="listo">Listo</option>
                </select>
              </div>
              <button
                className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:translate-y-px text-white font-medium rounded-md shadow-sm transition-all cursor-pointer border-none text-[0.9375rem] shrink-0"
                onClick={actualizarEstado}
              >
                Guardar estado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleSolicitud;
