import { useEffect, useState } from "react";
import axiosInstance from "../../src/axiosInstance";
import { useNavigate } from "react-router-dom";

interface Solicitud {
  id: number;
  mailCliente: string;
  patente: string;
  tipoVehiculo: string;
  estado: string;
  pagoEstado: string;
  createdAt: string;
}

const estadoBadge = (estado: string) => {
  const styles: Record<string, string> = {
    pendiente: "bg-amber-50 text-amber-700 border-amber-200",
    en_proceso: "bg-sky-50 text-sky-700 border-sky-200",
    listo: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  const labels: Record<string, string> = {
    pendiente: "Pendiente",
    en_proceso: "En proceso",
    listo: "Listo",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[estado] ?? styles.pendiente}`}
    >
      {labels[estado] ?? estado}
    </span>
  );
};

const pagoBadge = (pago: string) => {
  const styles: Record<string, string> = {
    aprobado: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pendiente: "bg-amber-50 text-amber-700 border-amber-200",
    rechazado: "bg-red-50 text-red-700 border-red-200",
  };
  const labels: Record<string, string> = {
    aprobado: "Aprobado",
    pendiente: "Pendiente",
    rechazado: "Rechazado",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[pago] ?? styles.pendiente}`}
    >
      {labels[pago] ?? pago}
    </span>
  );
};

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axiosInstance.get("/api/solicitudes");
        setSolicitudes(response.data);
      } catch {
        navigate("/admin");
      }
    };
    fetchSolicitudes();
  }, []);

  const handleLogout = async () => {
    await axiosInstance.post("/api/admin/logout");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Topbar */}
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

      {/* Content */}
      <div className="flex-1 p-6 sm:p-8 max-w-[1100px] mx-auto w-full">
        <div className="flex items-center justify-between mb-7 gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Solicitudes
            </h1>
            <p className="text-sm text-[#64748B] mt-0.5">
              {solicitudes.length} registros encontrados
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
          {solicitudes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#64748B] text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#DBEAFE] flex items-center justify-center text-2xl mb-1">
                📋
              </div>
              <p className="font-semibold text-[#0F172A]">Sin solicitudes</p>
              <p className="text-sm">Aún no hay solicitudes registradas.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                    {[
                      "#",
                      "Mail",
                      "Patente",
                      "Vehículo",
                      "Estado",
                      "Pago",
                      "Fecha",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3.5 text-[11px] font-semibold text-[#64748B] uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map((s) => (
                    <tr
                      key={s.id}
                      className="cursor-pointer hover:bg-[#EFF6FF] border-b border-[#F1F5F9] last:border-b-0 transition-colors"
                      onClick={() => navigate(`/admin/solicitudes/${s.id}`)}
                    >
                      <td className="px-5 py-4 text-[#64748B] font-medium align-middle">
                        #{s.id}
                      </td>
                      <td className="px-5 py-4 text-[#0F172A] align-middle">
                        {s.mailCliente}
                      </td>
                      <td className="px-5 py-4 align-middle">
                        <span className="font-semibold text-[#1E3A5F] tracking-wide bg-[#DBEAFE] px-2 py-0.5 rounded-md text-xs">
                          {s.patente}
                        </span>
                      </td>
                      <td className="px-5 py-4 capitalize text-[#0F172A] align-middle">
                        {s.tipoVehiculo}
                      </td>
                      <td className="px-5 py-4 align-middle">
                        {estadoBadge(s.estado)}
                      </td>
                      <td className="px-5 py-4 align-middle">
                        {pagoBadge(s.pagoEstado)}
                      </td>
                      <td className="px-5 py-4 text-[#64748B] text-xs align-middle">
                        {new Date(s.createdAt).toLocaleDateString("es-AR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Solicitudes;
