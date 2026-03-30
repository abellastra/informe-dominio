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
  const map: Record<string, string> = {
    pendiente: "badge-gray",
    en_proceso: "badge-pending",
    listo: "badge-success",
  };
  const labels: Record<string, string> = {
    pendiente: "Pendiente",
    en_proceso: "En proceso",
    listo: "Listo",
  };
  return (
    <span className={`badge ${map[estado] ?? "badge-gray"}`}>
      {labels[estado] ?? estado}
    </span>
  );
};

const pagoBadge = (pago: string) => {
  const map: Record<string, string> = {
    aprobado: "badge-success",
    pendiente: "badge-warning",
    rechazado: "badge-danger",
  };
  const labels: Record<string, string> = {
    aprobado: "Aprobado",
    pendiente: "Pendiente",
    rechazado: "Rechazado",
  };
  return (
    <span className={`badge ${map[pago] ?? "badge-gray"}`}>
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
    <div className="admin-layout">
      <nav className="admin-topbar">
        <div className="admin-topbar-brand">
          <span>ID</span>
          Panel de Gestora
        </div>
      </nav>

      <div className="admin-content">
        <div className="page-header">
          <div className="page-header-left">
            <h1>Solicitudes</h1>
            <p>{solicitudes.length} registros encontrados</p>
          </div>
        </div>

        <div className="card">
          {solicitudes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <h3>Sin solicitudes</h3>
              <p>Aún no hay solicitudes registradas.</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Mail</th>
                    <th>Patente</th>
                    <th>Vehículo</th>
                    <th>Estado</th>
                    <th>Pago</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map((s) => (
                    <tr
                      key={s.id}
                      className="clickable"
                      onClick={() => navigate(`/admin/solicitudes/${s.id}`)}
                    >
                      <td
                        style={{ color: "var(--text-muted)", fontWeight: 500 }}
                      >
                        #{s.id}
                      </td>
                      <td>{s.mailCliente}</td>
                      <td>
                        <span
                          style={{ fontWeight: 600, letterSpacing: "0.04em" }}
                        >
                          {s.patente}
                        </span>
                      </td>
                      <td style={{ textTransform: "capitalize" }}>
                        {s.tipoVehiculo}
                      </td>
                      <td>{estadoBadge(s.estado)}</td>
                      <td>{pagoBadge(s.pagoEstado)}</td>
                      <td
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "0.875rem",
                        }}
                      >
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
