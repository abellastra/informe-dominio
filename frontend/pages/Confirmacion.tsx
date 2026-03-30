import { useSearchParams } from "react-router-dom";

const Confirmacion = () => {
  const [searchParams] = useSearchParams();
  const estado = searchParams.get("estado");

  const config = {
    aprobado: {
      icon: "✓",
      iconBg: "bg-emerald-600",
      alertClass: "bg-emerald-50 border-emerald-200 text-emerald-800",
      alertIcon: "✅",
      title: "¡Pago aprobado!",
      message:
        "Recibimos tu solicitud. Te avisamos por mail cuando el informe esté listo.",
    },
    rechazado: {
      icon: "✕",
      iconBg: "bg-red-600",
      alertClass: "bg-red-50 border-red-200 text-red-800",
      alertIcon: "❌",
      title: "Pago rechazado",
      message: "Hubo un problema con el pago. Por favor intentá de nuevo.",
    },
    pendiente: {
      icon: "⏳",
      iconBg: "bg-amber-500",
      alertClass: "bg-amber-50 border-amber-200 text-amber-800",
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
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-slate-100 to-green-50">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-lg w-full max-w-[420px] overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-8 py-8 text-center">
          <div
            className={`w-[52px] h-[52px] ${iconBg} rounded-full flex items-center justify-center mx-auto mb-4 text-[1.3rem] font-bold text-white`}
          >
            {icon}
          </div>
          <h1 className="text-white text-[1.4rem] font-bold">{title}</h1>
        </div>

        <div className="p-8">
          <div
            className={`flex items-start gap-3 px-5 py-4 rounded-xl border text-sm ${alertClass}`}
          >
            <span className="text-[1.1rem] shrink-0 mt-0.5">{alertIcon}</span>
            <span>{message}</span>
          </div>

          <a
            href="/"
            className="mt-5 w-full flex items-center justify-center px-5 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 rounded-md transition-all text-[0.9375rem] font-medium"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
};

export default Confirmacion;
