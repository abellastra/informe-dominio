import WaIcon from "./WaIcon";
import FAQ from "./FAQ";

const servicios = [
  {
    titulo: "Venta de Formularios Oficiales",
    descripcion:
      "Contamos con stock de formularios para trámites automotores (08, 12, 04, 02, 03) y carpetas de presentación para organismos públicos.",
  },
  {
    titulo: "Liquidación de Impuesto de Sellos",
    descripcion:
      "Realizamos el cálculo y la liquidación del Impuesto de Sellos para contratos de alquiler, transferencias y otros actos jurídicos de forma instantánea.",
  },
  {
    titulo: "Descargas Web e Impresiones",
    descripcion:
      "Bajamos tus boletas de Rentas, VEPs de AFIP/ARCA, turnos para el registro y cualquier documentación digital que necesites imprimir o fotocopiar.",
  },
];

const faq = [
  {
    pregunta: "¿Tienen formularios 08 para la venta?",
    respuesta: "[ respuesta ]",
  },
  {
    pregunta: "¿Puedo ir directamente a imprimir una boleta de Rentas?",
    respuesta: "[ respuesta ]",
  },
  {
    pregunta: "¿Realizan el pago del Impuesto de Sellos allí?",
    respuesta: "[ respuesta ]",
  },
];

const SeccionServiciosLocales = () => (
  <section
    id="servicios-locales"
    className="border-y border-[#E2E8F0] bg-white"
  >
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <p className="text-[#3B82F6] text-[11px] font-semibold uppercase tracking-[0.12em] mb-2">
          Servicios
        </p>
        <h2 className="text-2xl font-bold text-[#0F172A]">Servicios Locales</h2>
        <p className="text-[#64748B] text-sm mt-2">
          Centro de Trámites en Villa Carlos Paz: Formularios, Sellos e
          Impresiones
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-4">
            Tu Oficina de Gestión y Descargas en el Centro
          </h3>
          <p className="text-[#475569] leading-relaxed mb-4">
            En Cadenas Gestoría entendemos que a veces necesitás una solución
            inmediata. No solo gestionamos trámites complejos, sino que también
            somos tu punto de apoyo para la obtención de formularios oficiales,
            copias y liquidaciones de impuestos.
          </p>
          <p className="text-[#475569] leading-relaxed mb-8">
            Ubicados en Gral. Paz 101, Local 36, estamos en el punto neurálgico
            de Villa Carlos Paz. Si estás realizando un trámite en la zona y te
            falta un papel, pasá por nuestro local en la Galería Belgrano.
          </p>
          <a
            href="https://wa.me/5403541589004"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            <WaIcon />
            Consultar Disponibilidad
          </a>
        </div>
        <div className="bg-[#F1F5F9] rounded-2xl h-72 flex items-center justify-center border border-[#E2E8F0]">
          <p className="text-[#94A3B8] text-sm">[ foto formularios / local ]</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-[#0F172A] mb-8 text-center">
        Formularios, Fotocopias e Impresiones en Villa Carlos Paz
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

      <FAQ titulo="Preguntas sobre servicios en el local" items={faq} />
    </div>
  </section>
);

export default SeccionServiciosLocales;
