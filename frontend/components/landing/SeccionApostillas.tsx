import WaIcon from "./WaIcon";
import FAQ from "./FAQ";

const servicios = [
  {
    titulo: "Apostilla de la Haya y Legalizaciones",
    descripcion:
      "Tramitamos la apostilla para partidas de nacimiento, matrimonio, defunción, certificados de antecedentes penales y títulos académicos (secundarios y universitarios).",
  },
  {
    titulo: "Ciudadanía y Radicación Mercosur",
    descripcion:
      "Asesoramiento especializado para trámites de residencia y ciudadanía bajo las nuevas normativas. Gestión online de expedientes y acompañamiento en la carga de datos.",
  },
  {
    titulo: "Gestión de Antecedentes Penales",
    descripcion:
      "Obtención rápida del certificado de antecedentes penales para trámites laborales, de ciudadanía o viajes internacionales.",
  },
];

const faq = [
  {
    pregunta: "¿Qué documentos se pueden apostillar?",
    respuesta: "[ respuesta ]",
  },
  {
    pregunta: "¿Cuánto demora el trámite de la Apostilla?",
    respuesta: "[ respuesta ]",
  },
  {
    pregunta: "¿Qué es el Decreto 24/2025 de Ciudadanía?",
    respuesta: "[ respuesta ]",
  },
];

const SeccionApostillas = () => (
  <section id="apostillas" className="max-w-6xl mx-auto px-6 py-20">
    <div className="text-center mb-14">
      <p className="text-[#3B82F6] text-[11px] font-semibold uppercase tracking-[0.12em] mb-2">
        Servicios
      </p>
      <h2 className="text-2xl font-bold text-[#0F172A]">
        Apostillas y Ciudadanía
      </h2>
      <p className="text-[#64748B] text-sm mt-2">
        Validez Internacional para tus Documentos Oficiales
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div className="bg-[#F1F5F9] rounded-2xl h-72 flex items-center justify-center border border-[#E2E8F0]">
        <p className="text-[#94A3B8] text-sm">
          [ foto pasaportes / documentos ]
        </p>
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#0F172A] mb-4">
          Trámites Internacionales en el Valle de Punilla
        </h3>
        <p className="text-[#475569] leading-relaxed mb-4">
          Si tenés que presentar documentación en el exterior, necesitás la
          Apostilla de la Haya. En Cadenas Gestoría gestionamos la legalización
          de tus partidas, títulos y certificados para que tengan validez legal
          fuera de Argentina.
        </p>
        <p className="text-[#475569] leading-relaxed mb-8">
          Además, brindamos asesoría completa en Ciudadanía Argentina y Mercosur
          (Decreto 24/2025), facilitando la radicación de ciudadanos extranjeros
          en el país. Evitá viajar a Córdoba Capital o Buenos Aires — realizamos
          gestiones ante Cancillería de forma 100% digital y segura.
        </p>
        <a
          href="https://wa.me/5403541589004"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
        >
          <WaIcon />
          Consultar por WhatsApp
        </a>
      </div>
    </div>

    <h3 className="text-xl font-bold text-[#0F172A] mb-8 text-center">
      Gestoria para Apostillado de Documentos en Villa Carlos Paz
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
      {servicios.map((s) => (
        <div
          key={s.titulo}
          className="border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#3B82F6] hover:shadow-md transition-all"
        >
          <h4 className="font-semibold text-[#0F172A] mb-2">{s.titulo}</h4>
          <p className="text-[#64748B] text-sm leading-relaxed">
            {s.descripcion}
          </p>
        </div>
      ))}
    </div>

    <FAQ titulo="Dudas sobre Apostillas y Ciudadanía" items={faq} />
  </section>
);

export default SeccionApostillas;
