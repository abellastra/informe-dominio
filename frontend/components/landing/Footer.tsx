import WaIcon from "./WaIcon";

const NAV_LINKS = [
  { label: "Automotor", href: "#automotor" },
  { label: "Monotributo", href: "#monotributo" },
  { label: "Veraz e Informes", href: "#veraz" },
  { label: "Apostillas y Ciudadanía", href: "#apostillas" },
  { label: "Servicios Locales", href: "#servicios-locales" },
  { label: "Nosotros", href: "#nosotros" },
];

const Footer = () => (
  <footer className="bg-[#152D4A] border-t border-[#1E3A5F]">
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <p className="text-white font-bold text-base mb-2">
            Cadenas Gestoria Integral
          </p>
          <p className="text-white/45 text-sm leading-relaxed mb-4">
            Más de 10 años simplificando tus gestiones impositivas y registrales
            en Villa Carlos Paz.
          </p>
          <a
            href="https://wa.me/5403541589004"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#25D366] text-sm font-semibold hover:text-[#1ebe5d] transition-colors"
          >
            <WaIcon size={15} />
            03541589004
          </a>
        </div>
        <div>
          <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4">
            Servicios
          </p>
          <ul className="space-y-2 text-sm text-white/45">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-white/70 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4">
            Dónde estamos
          </p>
          <ul className="space-y-2 text-sm text-white/45">
            <li>Gral. Paz 101, Local 36</li>
            <li>Galería Belgrano</li>
            <li>Villa Carlos Paz, Córdoba</li>
            <li className="pt-1">Lun–Vie: 9:00 a 17:00</li>
            <li>Sáb: 9:00 a 13:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} Cadenas Gestoria Integral. Todos los
          derechos reservados.
        </p>
        <p className="text-white/20 text-xs">
          Términos y condiciones · Política de privacidad
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
