import WaIcon from "./WaIcon";
import FAQ from "./FAQ";

const servicios = [
  {
    titulo: "Desafectación de Bases de Datos",
    descripcion:
      'Gestionamos la baja o actualización de tus datos en Veraz y Nosis. Si ya cancelaste tus deudas pero seguís apareciendo como "deudor", realizamos el trámite para limpiar tu nombre.',
  },
  {
    titulo: "Informes Crediticios Completos",
    descripcion:
      "Obtené un reporte detallado de tu situación actual. Analizamos tu scoring y te explicamos paso a paso por qué estás bloqueado financieramente.",
  },
  {
    titulo: "Gestión ante el BCRA",
    descripcion:
      "Realizamos el seguimiento de tu estado en la Central de Deudores del Banco Central de la República Argentina para asegurar que tu baja sea efectiva en todo el sistema bancario.",
  },
];

const faq = [
  {
    pregunta: "¿Cuánto tiempo tardo en salir del Veraz si ya pagué?",
    respuesta:
      'Por ley, la actualización puede tardar, pero con nuestra gestión aceleramos la notificación para que el sistema refleje tu "pago" o "baja" en el menor tiempo posible.',
  },
  {
    pregunta: "¿Se puede borrar una deuda que nunca pagué?",
    respuesta:
      "La Ley de Protección de Datos Personales establece plazos de prescripción (5 años). Si tu deuda es más antigua, podemos gestionar la eliminación por tiempo transcurrido (Derecho al Olvido).",
  },
  {
    pregunta: "¿Es legal el trámite de limpieza de firma?",
    respuesta:
      "Totalmente. Nos amparamos en la Ley 25.326 para exigir que la información que muestran las bases de datos sea veraz, exacta y actualizada.",
  },
];

const SeccionVeraz = () => (
  <section id="veraz" className="border-y border-[#E2E8F0] bg-white">
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <p className="text-[#3B82F6] text-[11px] font-semibold uppercase tracking-[0.12em] mb-2">
          Servicios
        </p>
        <h2 className="text-2xl font-bold text-[#0F172A]">Veraz e Informes</h2>
        <p className="text-[#64748B] text-sm mt-2">
          Asesoría para salir del Veraz en Villa Carlos Paz
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-4">
            Recuperá tu Libertad Financiera y Volvé a ser Sujeto de Crédito
          </h3>
          <p className="text-[#475569] leading-relaxed mb-4">
            Estar "manchado" en las bases de datos crediticias te impide sacar
            un préstamo, comprar con tarjeta o incluso alquilar. En Cadenas
            Gestoría te ayudamos a rectificar tu situación en Veraz, Nosis y el
            Banco Central (BCRA).
          </p>
          <p className="text-[#475569] leading-relaxed mb-8">
            Si tu deuda ya fue pagada o pasaron los años legales de
            prescripción, gestionamos la actualización de tu historial para que
            tu firma vuelva a ser confiable. Muchos vecinos de Villa Carlos Paz
            cargan con deudas antiguas que ya deberían estar borradas —
            analizamos tu caso con total discreción y profesionalismo.
          </p>
          <a
            href="https://wa.me/5403541589004"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            <WaIcon />
            Limpiar mi Historial
          </a>
        </div>
        <div className="bg-[#F1F5F9] rounded-2xl h-72 flex items-center justify-center border border-[#E2E8F0]">
          <p className="text-[#94A3B8] text-sm">
            [ foto historial crediticio ]
          </p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-[#0F172A] mb-8 text-center">
        Gestoria para Salir del Veraz en Villa Carlos Paz
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

      <FAQ titulo="Dudas frecuentes sobre el Veraz" items={faq} />
    </div>
  </section>
);

export default SeccionVeraz;
