import { useEffect, useState } from "react";
import axios from "axios";
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
    pendiente: "bg-[#F5F0EE] text-[#8A7570] border-[#E0D5D0]",
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
        const response = await axios.get("/api/solicitudes", {
          withCredentials: true,
        });
        setSolicitudes(response.data);
      } catch {
        navigate("/admin");
      }
    };
    fetchSolicitudes();
  }, []);

  const handleLogout = async () => {
    await axios.post("/api/admin/logout", {}, { withCredentials: true });
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F4F2]">
      {/* Topbar */}
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

      {/* Content */}
      <div className="flex-1 p-6 sm:p-8 max-w-[1100px] mx-auto w-full">
        <div className="flex items-center justify-between mb-7 gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#1C1412] tracking-tight">
              Solicitudes
            </h1>
            <p className="text-sm text-[#8A7570] mt-0.5">
              {solicitudes.length} registros encontrados
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#EDE8E4] rounded-2xl shadow-sm overflow-hidden">
          {solicitudes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8A7570] text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#FFE8E4] flex items-center justify-center text-2xl mb-1">
                📋
              </div>
              <p className="font-semibold text-[#1C1412]">Sin solicitudes</p>
              <p className="text-sm">Aún no hay solicitudes registradas.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#EDE8E4] bg-[#FAF8F7]">
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
                        className="text-left px-5 py-3.5 text-[11px] font-semibold text-[#9A7A75] uppercase tracking-wider whitespace-nowrap"
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
                      className="cursor-pointer hover:bg-[#FFF5F3] border-b border-[#F0EBE8] last:border-b-0 transition-colors"
                      onClick={() => navigate(`/admin/solicitudes/${s.id}`)}
                    >
                      <td className="px-5 py-4 text-[#9A7A75] font-medium align-middle">
                        #{s.id}
                      </td>
                      <td className="px-5 py-4 text-[#1C1412] align-middle">
                        {s.mailCliente}
                      </td>
                      <td className="px-5 py-4 align-middle">
                        <span className="font-semibold text-[#1C1412] tracking-wide bg-[#FFE8E4] px-2 py-0.5 rounded-md text-xs">
                          {s.patente}
                        </span>
                      </td>
                      <td className="px-5 py-4 capitalize text-[#1C1412] align-middle">
                        {s.tipoVehiculo}
                      </td>
                      <td className="px-5 py-4 align-middle">
                        {estadoBadge(s.estado)}
                      </td>
                      <td className="px-5 py-4 align-middle">
                        {pagoBadge(s.pagoEstado)}
                      </td>
                      <td className="px-5 py-4 text-[#9A7A75] text-xs align-middle">
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
