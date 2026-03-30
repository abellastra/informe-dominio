import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Solicitud {
  id: number;
  mailClient: string;
  patente: string;
  tipoVehiculo: string;
  estado: string;
  pagoEstado: string;
  archivoInforme: string | null;
  createdAt: string;
}

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
      <div className="admin-layout">
        <nav className="admin-topbar">
          <div className="admin-topbar-brand">
            <span>ID</span>
            Panel de Gestora
          </div>
        </nav>
        <div className="admin-content">
          <div className="loading-state">
            <div className="spinner" />
            Cargando solicitud...
          </div>
        </div>
      </div>
    );
  }

  const pagoBadgeClass: Record<string, string> = {
    aprobado: "badge-success",
    pendiente: "badge-warning",
    rechazado: "badge-danger",
  };
  const pagoLabels: Record<string, string> = {
    aprobado: "Aprobado",
    pendiente: "Pendiente",
    rechazado: "Rechazado",
  };

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
            <h1>Solicitud #{solicitud.id}</h1>
            <p>Detalle y gestión del informe</p>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate("/admin/solicitudes")}
          >
            ← Volver
          </button>
        </div>

        {/* Datos de la solicitud */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <div className="card-header">
            <p className="section-title" style={{ margin: 0 }}>
              Datos del vehículo
            </p>
          </div>
          <div className="card-body">
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Mail</span>
                <span className="detail-value">{solicitud.mailClient}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Patente</span>
                <span
                  className="detail-value"
                  style={{ letterSpacing: "0.05em", fontWeight: 700 }}
                >
                  {solicitud.patente}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tipo de vehículo</span>
                <span
                  className="detail-value"
                  style={{ textTransform: "capitalize" }}
                >
                  {solicitud.tipoVehiculo}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Pago</span>
                <span
                  className={`badge ${pagoBadgeClass[solicitud.pagoEstado] ?? "badge-gray"}`}
                >
                  {pagoLabels[solicitud.pagoEstado] ?? solicitud.pagoEstado}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Fecha</span>
                <span className="detail-value">
                  {new Date(solicitud.createdAt).toLocaleDateString("es-AR")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gestión del estado */}
        <div className="card">
          <div className="card-header">
            <p className="section-title" style={{ margin: 0 }}>
              Gestión del informe
            </p>
          </div>
          <div className="card-body">
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <div
                className="form-group"
                style={{ margin: 0, flex: "1", minWidth: 180 }}
              >
                <label htmlFor="estado">Estado de la solicitud</label>
                <select
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En proceso</option>
                  <option value="listo">Listo</option>
                </select>
              </div>
              <button
                className="btn btn-primary"
                onClick={actualizarEstado}
                style={{ flexShrink: 0 }}
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
