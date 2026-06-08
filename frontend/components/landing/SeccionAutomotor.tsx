import { useNavigate } from "react-router-dom";
import WaIcon from "./WaIcon";
import FAQ from "./FAQ";

const faq = [
  {
    pregunta:
      "¿Puedo transferir un auto si no tengo el 08 firmado por el titular?",
    respuesta: "[ respuesta ]",
  },
  {
    pregunta: "¿Cuánto tiempo demora el trámite de transferencia?",
    respuesta: "[ respuesta ]",
  },
  {
    pregunta: "¿Ustedes sacan los turnos para el registro?",
    respuesta: "[ respuesta ]",
  },
];

const SeccionAutomotor = () => {
  const navigate = useNavigate();

  return (
    <section id="automotor" className="border-y border-[#E2E8F0] bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-[#3B82F6] text-[11px] font-semibold uppercase tracking-[0.12em] mb-2">
            Servicios
          </p>
          <h2 className="text-2xl font-bold text-[#0F172A]">Automotor</h2>
          <p className="text-[#64748B] text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Gestoría Automotor en Villa Carlos Paz: Transferencias y Trámites de
            Motos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-4">
              Seguridad y Rapidez en tu Transferencia Automotor
            </h3>
            <p className="text-[#475569] leading-relaxed mb-4">
              Sabemos que comprar o vender un vehículo es un paso importante. En
              Cadenas Gestoría nos aseguramos de que toda la documentación esté
              en regla ante el DNRPA. Evitá estafas, multas o juicios por falta
              de transferencia. Gestionamos desde Villa Carlos Paz para todo el
              Valle de Punilla.
            </p>
            <p className="text-[#475569] leading-relaxed mb-8">
              Atendemos de forma presencial en nuestra oficina, facilitando el
              turno y la carga de datos online para que no tengas que moverte de
              tu casa. Somos referentes en la zona para trámites de tracto
              abreviado y sucesiones vehiculares.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/5403541589004"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <WaIcon />
                Consultar por WhatsApp
              </a>
              <button
                onClick={() => navigate("/solicitar")}
                className="inline-flex items-center justify-center gap-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect
                    x="2"
                    y="1"
                    width="12"
                    height="14"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="5"
                    y1="5"
                    x2="11"
                    y2="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="5"
                    y1="8"
                    x2="11"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="5"
                    y1="11"
                    x2="8"
                    y2="11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Pedir informe online en 3 simples pasos
              </button>
            </div>
          </div>
          <div className="bg-[#F1F5F9] rounded-2xl h-72 flex items-center justify-center border border-[#E2E8F0]">
            <p className="text-[#94A3B8] text-sm">
              [ foto transferencia automotor ]
            </p>
          </div>
        </div>

        <FAQ
          titulo="Preguntas frecuentes sobre Gestoría Automotor"
          items={faq}
        />
      </div>
    </section>
  );
};

export default SeccionAutomotor;
