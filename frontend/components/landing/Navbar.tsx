const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Automotor", href: "#automotor" },
  { label: "Monotributo", href: "#monotributo" },
  { label: "Veraz e Informes", href: "#veraz" },
  { label: "Apostillas y Ciudadanía", href: "#apostillas" },
  { label: "Servicios Locales", href: "#servicios-locales" },
  { label: "Nosotros", href: "#nosotros" },
];

const Navbar = () => (
  <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <span className="text-[#1E3A5F] font-bold text-lg tracking-tight shrink-0">
        Cadenas Gestoria
      </span>
      <nav className="hidden lg:flex items-center gap-6 text-sm text-[#475569]">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:text-[#1E3A5F] transition-colors whitespace-nowrap"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <button className="hidden lg:block bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors shrink-0">
        Consultar Ahora
      </button>
      <button className="lg:hidden text-[#475569]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 6h18M3 12h18M3 18h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  </header>
);

export default Navbar;
