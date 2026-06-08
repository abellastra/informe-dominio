const Hero = () => (
  <section id="inicio" className="bg-[#1E3A5F] relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#3B82F6]/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#60A5FA]/15 blur-3xl" />
    </div>
    <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-[1.15] tracking-tight">
        Gestoría Integral en Villa Carlos Paz
        <br />
        <span className="text-[#93C5FD]">Automotor y Monotributo</span>
      </h1>
      <p className="text-white/65 text-lg mb-10 max-w-md mx-auto leading-relaxed">
        Trámites rápidos, seguros y sin complicaciones
      </p>
      <button className="inline-flex items-center gap-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg">
        Consultar Ahora
      </button>
    </div>
  </section>
);

export default Hero;
