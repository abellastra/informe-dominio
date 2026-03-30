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
    pendiente: "bg-slate-100 text-slate-500 border-slate-200",
    en_proceso: "bg-sky-50 text-sky-700 border-sky-200",
    listo: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };
  const labels: Record<string, string> = {
    pendiente: "Pendiente",
    en_proceso: "En proceso",
    listo: "Listo",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[estado] ?? "bg-slate-100 text-slate-500 border-slate-200"}`}
    >
      {labels[estado] ?? estado}
    </span>
  );
};

const pagoBadge = (pago: string) => {
  const styles: Record<string, string> = {
    aprobado: "bg-emerald-50 text-emerald-800 border-emerald-200",
    pendiente: "bg-amber-50 text-amber-800 border-amber-200",
    rechazado: "bg-red-50 text-red-800 border-red-200",
  };
  const labels: Record<string, string> = {
    aprobado: "Aprobado",
    pendiente: "Pendiente",
    rechazado: "Rechazado",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[pago] ?? "bg-slate-100 text-slate-500 border-slate-200"}`}
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <nav className="bg-white border-b border-slate-200 px-8 h-[60px] flex items-center shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2.5 font-bold text-slate-900">
          <span className="bg-blue-600 text-white w-[30px] h-[30px] rounded-md flex items-center justify-center text-[0.85rem] font-bold">
            ID
          </span>
          Panel de Gestora
        </div>
      </nav>

      <div className="flex-1 p-8 max-w-[1100px] mx-auto w-full">
        <div className="flex items-center justify-between mb-7 gap-4 flex-wrap">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Solicitudes
            </h1>
            <p className="text-sm text-slate-500">
              {solicitudes.length} registros encontrados
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow overflow-hidden">
          {solicitudes.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 text-slate-500 text-center gap-2">
              <div className="text-4xl mb-2 opacity-50">📋</div>
              <h3 className="text-lg font-semibold text-slate-900">
                Sin solicitudes
              </h3>
              <p className="text-sm">Aún no hay solicitudes registradas.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[0.9rem]">
                <thead>
                  <tr className="bg-slate-50 border-b-2 border-slate-200">
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
                        className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap"
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
                      className="cursor-pointer transition-colors hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
                      onClick={() => navigate(`/admin/solicitudes/${s.id}`)}
                    >
                      <td className="px-4 py-3.5 text-slate-500 font-medium align-middle">
                        #{s.id}
                      </td>
                      <td className="px-4 py-3.5 text-slate-900 align-middle">
                        {s.mailCliente}
                      </td>
                      <td className="px-4 py-3.5 align-middle">
                        <span className="font-semibold tracking-wide">
                          {s.patente}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 capitalize text-slate-900 align-middle">
                        {s.tipoVehiculo}
                      </td>
                      <td className="px-4 py-3.5 align-middle">
                        {estadoBadge(s.estado)}
                      </td>
                      <td className="px-4 py-3.5 align-middle">
                        {pagoBadge(s.pagoEstado)}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 text-sm align-middle">
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
