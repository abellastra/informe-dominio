import { useNavigate } from "react-router-dom";

const informes = [
  {
    titulo: "Informe de dominio",
    descripcion: "Estado actual del vehículo en el DNRPA",
  },
  {
    titulo: "Informe histórico",
    descripcion: "Historial completo de titulares y transferencias",
  },
  {
    titulo: "Informe nominal",
    descripcion: "Vehículos registrados a nombre de una persona",
  },
  {
    titulo: "Anotaciones personales",
    descripcion: "Inhibiciones y embargos de una persona",
  },
];

const pasos = [
  {
    numero: "1",
    titulo: "Completá",
    descripcion: "Ingresá tus datos y la patente del vehículo",
  },
  {
    numero: "2",
    titulo: "Pagá",
    descripcion: "Abonás de forma segura con MercadoPago",
  },
  {
    numero: "3",
    titulo: "Recibís",
    descripcion: "El informe llega a tu email en hasta 48hs",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-[#3D2B2B] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-[#E8A598] text-sm font-medium tracking-widest uppercase mb-3">
            Cadenas Gestoria Integral
          </p>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Pedí tu informe de dominio online
          </h1>
          <p className="text-[#c9a9a4] text-lg mb-8">
            Rápido, seguro y lo recibís en tu email en hasta 48hs
          </p>
          <button
            onClick={() => navigate("/solicitar")}
            className="bg-[#E8A598] text-[#3D2B2B] font-semibold px-8 py-3 rounded-lg hover:bg-[#d4917f] transition-colors"
          >
            Pedir informe ahora →
          </button>
        </div>
      </div>

      {/* Cómo funciona */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
          ¿Cómo funciona?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pasos.map((paso) => (
            <div
              key={paso.numero}
              className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-[#FBEAF0] text-[#993556] font-bold text-lg flex items-center justify-center mx-auto mb-4">
                {paso.numero}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{paso.titulo}</h3>
              <p className="text-gray-500 text-sm">{paso.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Informes */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
            Nuestros informes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {informes.map((informe) => (
              <div
                key={informe.titulo}
                className="border border-gray-200 rounded-xl p-5 hover:border-[#E8A598] hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FBEAF0] flex items-center justify-center mb-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="1" width="12" height="14" rx="1" stroke="#993556" strokeWidth="1.5"/>
                    <line x1="5" y1="5" x2="11" y2="5" stroke="#993556" strokeWidth="1.5"/>
                    <line x1="5" y1="8" x2="11" y2="8" stroke="#993556" strokeWidth="1.5"/>
                    <line x1="5" y1="11" x2="8" y2="11" stroke="#993556" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{informe.titulo}</h3>
                <p className="text-gray-500 text-sm">{informe.descripcion}</p>
                <p className="text-[#E8A598] text-sm font-medium mt-3">Hasta 48hs hábiles</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#3D2B2B] py-16">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            ¿Necesitás tu informe hoy?
          </h2>
          <p className="text-[#c9a9a4] mb-8">
            Lo gestionamos por vos de forma rápida y segura
          </p>
          <button
            onClick={() => navigate("/solicitar")}
            className="bg-[#E8A598] text-[#3D2B2B] font-semibold px-8 py-3 rounded-lg hover:bg-[#d4917f] transition-colors"
          >
            Solicitar ahora
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            Cadenas Gestoria Integral — Servicio privado de gestoría
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Términos y condiciones · Política de privacidad
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Landing;