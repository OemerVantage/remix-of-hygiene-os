import logo from "@/assets/logo.png";

const footerLinks = {
  unternehmen: [
    { label: "Über uns", href: "#about" },
    { label: "Karriere", href: "#careers" },
    { label: "Kontakt", href: "#contact" },
  ],
  produkte: [
    { label: "Spender", href: "#" },
    { label: "Verbrauchsmaterial", href: "#" },
    { label: "Desinfektion", href: "#" },
    { label: "Reinigung", href: "#" },
  ],
  branchen: [
    { label: "Gastronomie", href: "#" },
    { label: "Gesundheitswesen", href: "#" },
    { label: "Büro", href: "#" },
    { label: "Industrie", href: "#" },
  ],
  service: [
    { label: "Ratgeber", href: "#guides" },
    { label: "FAQ", href: "#faq" },
    { label: "Lieferung", href: "#shipping" },
    { label: "B2B-Konditionen", href: "#b2b" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container-hygiswiss section-padding">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img src={logo} alt="HygiSwiss AG" className="h-14 w-auto" />
            <p className="mt-4 text-body-sm text-background/60">
              Ihr Betriebssystem für professionelle Hygiene
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-body-md font-medium text-background mb-4">
              Unternehmen
            </h4>
            <ul className="space-y-3">
              {footerLinks.unternehmen.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body-sm text-background/60 hover:text-background transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-body-md font-medium text-background mb-4">
              Produkte
            </h4>
            <ul className="space-y-3">
              {footerLinks.produkte.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body-sm text-background/60 hover:text-background transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-body-md font-medium text-background mb-4">
              Branchen
            </h4>
            <ul className="space-y-3">
              {footerLinks.branchen.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body-sm text-background/60 hover:text-background transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-body-md font-medium text-background mb-4">
              Service
            </h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body-sm text-background/60 hover:text-background transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-body-sm text-background/40">
            © 2024 HygiSwiss AG. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-body-sm text-background/40 hover:text-background transition-colors duration-200"
            >
              Impressum
            </a>
            <a
              href="#"
              className="text-body-sm text-background/40 hover:text-background transition-colors duration-200"
            >
              Datenschutz
            </a>
            <a
              href="#"
              className="text-body-sm text-background/40 hover:text-background transition-colors duration-200"
            >
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
