import { useNavigate } from "react-router-dom";

const informes = [
  {
    titulo: "Informe de dominio",
    descripcion: "Estado actual del vehículo en el DNRPA",
    valor: "dominio",
  },
  {
    titulo: "Informe histórico",
    descripcion: "Historial completo de titulares y transferencias",
    valor: "historico",
  },
  {
    titulo: "Informe nominal",
    descripcion: "Vehículos registrados a nombre de una persona",
    valor: "nominal",
  },
  {
    titulo: "Anotaciones personales",
    descripcion: "Inhibiciones y embargos de una persona",
    valor: "anotaciones",
  },
];

const pasos = [
  {
    numero: "01",
    titulo: "Completá",
    descripcion: "Ingresá tus datos y la patente del vehículo",
  },
  {
    numero: "02",
    titulo: "Pagá",
    descripcion: "Abonás de forma segura con MercadoPago",
  },
  {
    numero: "03",
    titulo: "Recibís",
    descripcion: "El informe llega a tu email en hasta 48hs",
  },
];

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DocIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
    <rect
      x="2"
      y="1"
      width="12"
      height="14"
      rx="1.5"
      stroke="#3B82F6"
      strokeWidth="1.5"
    />
    <line
      x1="5"
      y1="5"
      x2="11"
      y2="5"
      stroke="#3B82F6"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="5"
      y1="8"
      x2="11"
      y2="8"
      stroke="#3B82F6"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="5"
      y1="11"
      x2="8"
      y2="11"
      stroke="#3B82F6"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <div className="relative bg-[#1E3A5F] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#3B82F6]/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#60A5FA]/15 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#93C5FD] inline-block" />
            <span className="text-[#93C5FD] text-[11px] font-semibold tracking-[0.12em] uppercase">
              Cadenas Gestoria Integral
            </span>
          </div>

          <h1 className="text-[2.75rem] sm:text-5xl font-bold text-white mb-5 leading-[1.15] tracking-tight">
            Pedí tu informe de
            <br />
            <span className="text-[#93C5FD]">dominio online</span>
          </h1>

          <p className="text-white/65 text-lg mb-10 max-w-sm mx-auto leading-relaxed">
            Rápido, seguro y lo recibís en tu email en hasta 48hs hábiles
          </p>

          <button
            onClick={() => navigate("/solicitar")}
            className="inline-flex items-center gap-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            Pedir informe ahora
            <ArrowIcon />
          </button>

          <div className="flex items-center justify-center gap-5 mt-12 flex-wrap">
            {[
              "Gestoria oficial",
              "Pago seguro con MercadoPago",
              "48hs hábiles",
            ].map((item, i) => (
              <div key={item} className="flex items-center gap-4">
                {i > 0 && <span className="w-px h-3.5 bg-white/20" />}
                <span className="text-white/45 text-xs">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cómo funciona */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-[#3B82F6] text-[11px] font-semibold uppercase tracking-[0.12em] mb-2">
            Proceso simple
          </p>
          <h2 className="text-2xl font-bold text-[#0F172A]">¿Cómo funciona?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {pasos.map((paso, i) => (
            <div
              key={paso.numero}
              className="flex md:flex-col items-start md:items-center gap-5 md:gap-0 md:text-center p-6 rounded-2xl hover:bg-white hover:shadow-sm transition-all"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-[#1E3A5F] text-white font-bold text-lg flex items-center justify-center shadow-md shrink-0">
                  {paso.numero}
                </div>
                {i < pasos.length - 1 && (
                  <div
                    className="hidden md:block absolute top-7 left-full border-t-2 border-dashed border-[#BFDBFE] -z-10"
                    style={{ width: "calc(100% + 3rem)", left: "100%" }}
                  />
                )}
              </div>
              <div className="md:mt-5">
                <h3 className="font-semibold text-[#0F172A] mb-1.5">
                  {paso.titulo}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  {paso.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nuestros informes */}
      <div className="border-y border-[#E2E8F0] bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <p className="text-[#3B82F6] text-[11px] font-semibold uppercase tracking-[0.12em] mb-2">
              Servicios
            </p>
            <h2 className="text-2xl font-bold text-[#0F172A]">
              Nuestros informes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {informes.map((informe) => (
              <div
                key={informe.titulo}
                onClick={() => navigate(`/solicitar?tipo=${informe.valor}`)}
                className="group flex items-start gap-4 border border-[#E2E8F0] rounded-2xl p-5 hover:border-[#3B82F6] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0 group-hover:bg-[#DBEAFE] transition-colors mt-0.5">
                  <DocIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-[#0F172A]">
                      {informe.titulo}
                    </h3>
                    <span className="text-[#93C5FD] group-hover:text-[#3B82F6] group-hover:translate-x-0.5 transition-all shrink-0">
                      <ArrowIcon />
                    </span>
                  </div>
                  <p className="text-[#64748B] text-sm mt-1 leading-relaxed">
                    {informe.descripcion}
                  </p>
                  <p className="text-[#3B82F6] text-xs font-medium mt-2.5">
                    Hasta 48hs hábiles
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1E3A5F] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#3B82F6]/20 blur-3xl" />
        </div>
        <div className="relative max-w-lg mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            ¿Necesitás tu informe hoy?
          </h2>
          <p className="text-white/60 mb-9 leading-relaxed">
            Lo gestionamos por vos de forma rápida y segura
          </p>
          <button
            onClick={() => navigate("/solicitar")}
            className="inline-flex items-center gap-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            Solicitar ahora
            <ArrowIcon />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#152D4A] border-t border-[#1E3A5F] py-7">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/55 text-sm font-medium">
            Cadenas Gestoria Integral
          </p>
          <p className="text-white/25 text-sm">
            Términos y condiciones · Política de privacidad
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
