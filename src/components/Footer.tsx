import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const footerLinks = {
  unternehmen: [
    { label: "Über uns", to: "/ueber-uns" },
    { label: "Kontakt", to: "/kontakt" },
  ],
  produkte: [
    { label: "Alle Produkte", to: "/produkte" },
  ],
  branchen: [
    { label: "Hotellerie", to: "/branchenloesungen/hotellerie" },
    { label: "Gastronomie", to: "/branchenloesungen/gastronomie" },
    { label: "Gesundheitswesen", to: "/branchenloesungen/gesundheitswesen" },
    { label: "Büro & Verwaltung", to: "/branchenloesungen/buero-verwaltung" },
    { label: "Industrie & Produktion", to: "/branchenloesungen/industrie-produktion" },
    { label: "Bildung & Kinderbetreuung", to: "/branchenloesungen/bildung-kinderbetreuung" },
  ],
  service: [
    { label: "Ratgeber", to: "/ratgeber" },
    { label: "Branchenlösungen", to: "/branchenloesungen" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container-hygiswiss section-padding">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img src={logo} alt="HygiSwiss AG" className="h-16 w-auto" />
            <p className="mt-4 text-body-sm text-background/60">
              Ihr Betriebssystem für professionelle Hygiene
            </p>
          </div>

          <div>
            <h4 className="text-body-md font-medium text-background mb-4">
              Unternehmen
            </h4>
            <ul className="space-y-3">
              {footerLinks.unternehmen.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-body-sm text-background/60 hover:text-background transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
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
                  <Link
                    to={link.to}
                    className="text-body-sm text-background/60 hover:text-background transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
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
                  <Link
                    to={link.to}
                    className="text-body-sm text-background/60 hover:text-background transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
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
                  <Link
                    to={link.to}
                    className="text-body-sm text-background/60 hover:text-background transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-background/10 flex justify-center items-center">
          <p className="text-body-sm text-background/40">
            © 2024 HygiSwiss AG. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
