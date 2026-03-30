import { useSearchParams } from "react-router-dom";

const Confirmacion = () => {
  const [searchParams] = useSearchParams();
  const estado = searchParams.get("estado");

  const config = {
    aprobado: {
      icon: "✓",
      iconBg: "var(--success)",
      alertClass: "alert-success",
      alertIcon: "✅",
      title: "¡Pago aprobado!",
      message:
        "Recibimos tu solicitud. Te avisamos por mail cuando el informe esté listo.",
    },
    rechazado: {
      icon: "✕",
      iconBg: "var(--danger)",
      alertClass: "alert-danger",
      alertIcon: "❌",
      title: "Pago rechazado",
      message: "Hubo un problema con el pago. Por favor intentá de nuevo.",
    },
    pendiente: {
      icon: "⏳",
      iconBg: "var(--warning)",
      alertClass: "alert-warning",
      alertIcon: "⏳",
      title: "Pago pendiente",
      message:
        "Tu pago está siendo procesado. Te avisamos por mail cuando se confirme.",
    },
  };

  const key =
    estado === "aprobado" || estado === "rechazado" ? estado : "pendiente";
  const { icon, iconBg, alertClass, alertIcon, title, message } = config[key];

  return (
    <div className="page-center">
      <div className="public-card" style={{ maxWidth: 420 }}>
        <div className="public-card-header" style={{ paddingBottom: "2rem" }}>
          <div
            className="public-card-icon"
            style={{
              background: iconBg,
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {icon}
          </div>
          <h1>{title}</h1>
        </div>

        <div className="public-card-body">
          <div className={`alert ${alertClass}`}>
            <span className="alert-icon">{alertIcon}</span>
            <span>{message}</span>
          </div>

          <a
            href="/"
            className="btn btn-ghost btn-full"
            style={{ marginTop: "1.25rem" }}
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
};

export default Confirmacion;
