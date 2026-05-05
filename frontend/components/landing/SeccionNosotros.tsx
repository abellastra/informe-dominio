import WaIcon from "./WaIcon";
import FAQ from "./FAQ";

const valores = [
  {
    titulo: "Transparencia Total",
    descripcion:
      "Creemos en la honestidad desde el primer contacto. Te asesoramos sobre la viabilidad real de tu trámite, sin promesas vacías y con costos claros.",
  },
  {
    titulo: "Actualización Permanente",
    descripcion:
      "El sistema impositivo y registral argentino cambia constantemente. Nuestro equipo se capacita día a día en las normativas de ARCA/AFIP, DNRPA y Cancillería para ofrecerte siempre la vía más rápida y legal.",
  },
  {
    titulo: "Compromiso Local",
    descripcion:
      "No somos una plataforma fría de internet. Somos vecinos de Carlos Paz, estamos en la Galería Belgrano y conocemos a fondo el funcionamiento de los registros y oficinas públicas de todo el Valle de Punilla.",
  },
];

const faq = [
  {
    pregunta: "¿Atienden trámites de personas de otras ciudades?",
    respuesta:
      "Sí, aunque estamos en Carlos Paz, realizamos gestiones online para clientes de toda la provincia de Córdoba y el país, especialmente en trámites de Apostillas y Monotributo.",
  },
  {
    pregunta: "¿Cómo garantizan la seguridad de mi documentación?",
    respuesta:
      "Tratamos cada legajo con absoluta confidencialidad y rigor profesional. Tu documentación original está protegida bajo estrictas normas de archivo y seguridad en nuestra oficina.",
  },
  {
    pregunta: "¿Tengo que ir sí o sí al local para iniciar un trámite?",
    respuesta:
      "No es necesario. Hemos digitalizado gran parte de nuestros procesos para que puedas enviarnos la documentación por WhatsApp o correo electrónico y seguir el estado de tu trámite de forma remota.",
  },
];

const SeccionNosotros = () => (
  <section id="nosotros" className="max-w-6xl mx-auto px-6 py-20">
    <div className="text-center mb-14">
      <p className="text-[#3B82F6] text-[11px] font-semibold uppercase tracking-[0.12em] mb-2">
        Quiénes somos
      </p>
      <h2 className="text-2xl font-bold text-[#0F172A]">Cadenas Gestoría</h2>
      <p className="text-[#64748B] text-sm mt-2">
        Trayectoria y Confianza en Trámites en Villa Carlos Paz
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div className="bg-[#F1F5F9] rounded-2xl h-80 flex items-center justify-center border border-[#E2E8F0]">
        <p className="text-[#94A3B8] text-sm">
          [ foto equipo Cadenas Gestoría ]
        </p>
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#0F172A] mb-4">
          Más de 10 años simplificando tus gestiones impositivas y registrales
        </h3>
        <p className="text-[#475569] leading-relaxed mb-4">
          En Cadenas Gestoría, nacimos con una misión clara: transformar la
          burocracia en soluciones. Entendemos que detrás de cada transferencia
          de auto, de cada alta de monotributo o de un trámite de ciudadanía,
          hay un proyecto, una familia o un sueño.
        </p>
        <p className="text-[#475569] leading-relaxed mb-8">
          Desde nuestra sede en el Local 36 de la Galería Belgrano, hemos
          ayudado a cientos de comerciantes, transportistas y familias de Villa
          Carlos Paz, San Antonio de Arredondo, Estancia Vieja y Tanti.
        </p>
        <a
          href="https://wa.me/5403541589004"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
        >
          <WaIcon />
          Hablar con un Gestor
        </a>
      </div>
    </div>

    <h3 className="text-xl font-bold text-[#0F172A] mb-8 text-center">
      Gestoria Integral en Villa Carlos Paz
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
      {valores.map((s) => (
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

    <FAQ titulo="¿Por qué elegir a Cadenas Gestoría?" items={faq} />
  </section>
);

export default SeccionNosotros;
