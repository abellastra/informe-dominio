import WaIcon from "./WaIcon";
import FAQ from "./FAQ";

const servicios = [
  {
    titulo: "Alta, Baja y Modificaciones",
    descripcion:
      "Realizamos el alta inmediata en el régimen simplificado y gestionamos bajas o cambios de actividad de forma eficiente.",
  },
  {
    titulo: "Recategorización Semestral",
    descripcion:
      "Análisis completo de tus parámetros (ingresos, alquileres, energía) en enero y julio para cumplir con la normativa vigente y evitar exclusiones de oficio.",
  },
  {
    titulo: "Planes de Pago y VEPs",
    descripcion:
      "Si tenés deuda acumulada, gestionamos planes de pago a medida y generamos tus volantes de pago (VEP) para que nunca pierdas el beneficio de estar al día.",
  },
];

const faq = [
  {
    pregunta: "¿Qué pasa si mis gastos con tarjeta superan mi categoría?",
    respuesta: "[ respuesta ]",
  },
  {
    pregunta: "¿Ustedes hacen el trámite de Ingresos Brutos también?",
    respuesta: "[ respuesta ]",
  },
  {
    pregunta: "¿Cómo sé en qué categoría debo estar?",
    respuesta: "[ respuesta ]",
  },
];

const SeccionMonotributo = () => (
  <section id="monotributo" className="max-w-6xl mx-auto px-6 py-20">
    <div className="text-center mb-14">
      <p className="text-[#3B82F6] text-[11px] font-semibold uppercase tracking-[0.12em] mb-2">
        Servicios
      </p>
      <h2 className="text-2xl font-bold text-[#0F172A]">Monotributo</h2>
      <p className="text-[#64748B] text-sm mt-2">
        Gestor de Monotributo en Villa Carlos Paz: Alta, Baja y Recategorización
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div className="bg-[#F1F5F9] rounded-2xl h-72 flex items-center justify-center border border-[#E2E8F0]">
        <p className="text-[#94A3B8] text-sm">[ foto laptop / AFIP ]</p>
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#0F172A] mb-4">
          Gestión Impositiva Profesional para Emprendedores y Comercios
        </h3>
        <p className="text-[#475569] leading-relaxed mb-4">
          Mantener tu situación fiscal al día con ARCA (ex AFIP) es fundamental
          para evitar bloqueos de CUIT y multas costosas. En Cadenas Gestoría te
          asesoramos para que estés en la categoría correcta, optimizando tu
          carga tributaria y asegurando que tu facturación mensual sea coherente
          con tus movimientos bancarios.
        </p>
        <p className="text-[#475569] leading-relaxed mb-8">
          Ubicados en la Galería Belgrano, brindamos soporte personalizado a
          comerciantes y profesionales de Villa Carlos Paz y alrededores.
          Olvidate de los trámites complejos por internet; nosotros nos
          encargamos de toda la burocracia digital de forma remota o presencial.
        </p>
        <a
          href="https://wa.me/5403541589004"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
        >
          <WaIcon />
          Regularizar mi Monotributo
        </a>
      </div>
    </div>

    <h3 className="text-xl font-bold text-[#0F172A] mb-8 text-center">
      Gestoria Integral de Monotributo en Villa Carlos Paz
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

    <FAQ titulo="Dudas frecuentes sobre el Monotributo" items={faq} />
  </section>
);

export default SeccionMonotributo;
