import { useSearchParams } from "react-router-dom";

const Confirmacion = () => {
  const [searchParams] = useSearchParams();
  const estado = searchParams.get("estado");

  const config = {
    aprobado: {
      icon: "✓",
      iconBg: "bg-emerald-500",
      alertClass: "bg-emerald-50 border-emerald-200 text-emerald-800",
      alertIcon: "✅",
      title: "¡Pago aprobado!",
      message:
        "Recibimos tu solicitud. Te avisamos por mail cuando el informe esté listo.",
    },
    rechazado: {
      icon: "✕",
      iconBg: "bg-red-500",
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
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-[#F8FAFC]">
      <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-lg w-full max-w-[420px] overflow-hidden">
        <div className="bg-[#1E3A5F] px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#3B82F6]/20 blur-2xl pointer-events-none" />
          <div
            className={`relative w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center mx-auto mb-5 text-xl font-bold text-white shadow-md`}
          >
            {icon}
          </div>
          <h1 className="text-white text-[1.4rem] font-bold">{title}</h1>
          <p className="text-[#93C5FD] text-[11px] font-semibold tracking-[0.12em] uppercase mt-2">
            Cadenas Gestoria Integral
          </p>
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
            className="mt-4 w-full flex items-center justify-center px-5 py-2.5 border border-[#E2E8F0] text-[#3B82F6] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] rounded-xl transition-all text-sm font-medium"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
};

export default Confirmacion;
