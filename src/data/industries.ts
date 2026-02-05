import { Hotel, UtensilsCrossed, Building2, Factory, Hospital, GraduationCap, LucideIcon } from "lucide-react";
import hotelBg from "@/assets/industries/hotel-bg.png";
import gastronomyBg from "@/assets/industries/gastronomy-bg.png";
import healthcareBg from "@/assets/industries/healthcare-bg.png";
import officeBg from "@/assets/industries/office-bg.png";
import industryBg from "@/assets/industries/industry-bg.png";
import educationBg from "@/assets/industries/education-bg.png";

export interface Industry {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  image: string;
  color: string;
}

export const industries: Industry[] = [
  {
    slug: "hotellerie",
    icon: Hotel,
    title: "Hotellerie",
    description: "Professionelle Hygienelösungen für Hotels und Unterkünfte aller Grössen.",
    longDescription: `In der Hotellerie ist Sauberkeit nicht nur eine Notwendigkeit, sondern ein entscheidender Wettbewerbsfaktor. Gäste erwarten makellose Zimmer, frische Wäsche und gepflegte Wellnessbereiche.

Unsere Lösungen helfen Ihnen dabei, diese hohen Standards effizient und kostengünstig zu erfüllen. Vom Housekeeping bis zur Küchenhygiene bieten wir Ihnen ein umfassendes Konzept, das auf die Bedürfnisse Ihrer Gäste und Mitarbeiter zugeschnitten ist.`,
    features: ["Zimmerreinigung", "Wäschehygiene", "Gästebereich", "Wellness & Spa"],
    image: hotelBg,
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    slug: "gastronomie",
    icon: UtensilsCrossed,
    title: "Gastronomie",
    description: "HACCP-konforme Produkte für Restaurants, Cafés und Catering.",
    longDescription: `In der Gastronomie ist Hygiene das A und O. Die Einhaltung strenger HACCP-Richtlinien schützt nicht nur Ihre Gäste, sondern auch Ihren guten Ruf.

Wir unterstützen Sie mit hochwirksamen Reinigungs- und Desinfektionsmitteln, die speziell für den Einsatz in Küchen und lebensmittelverarbeitenden Bereichen entwickelt wurden.`,
    features: ["Küchenhygiene", "Geschirrspülung", "Oberflächenreinigung", "Händedesinfektion"],
    image: gastronomyBg,
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    slug: "gesundheitswesen",
    icon: Hospital,
    title: "Gesundheitswesen",
    description: "Medizinische Hygienestandards für Kliniken und Praxen.",
    longDescription: `Im Gesundheitswesen rettet Hygiene Leben. Wir bieten Ihnen zertifizierte Produkte für die Desinfektion und Reinigung in sensiblen Bereichen.

Unsere Lösungen erfüllen die höchsten medizinischen Standards und unterstützen Sie bei der Prävention von Infektionen in Kliniken, Pflegeheimen und Arztpraxen.`,
    features: ["Desinfektion", "Sterilisation", "Schutzausrüstung", "Abfallentsorgung"],
    image: healthcareBg,
    color: "from-green-500/20 to-green-600/10",
  },
  {
    slug: "buero-verwaltung",
    icon: Building2,
    title: "Büro & Verwaltung",
    description: "Saubere Arbeitsumgebungen für produktive Mitarbeiter.",
    longDescription: `Ein sauberer Arbeitsplatz fördert nicht nur das Wohlbefinden, sondern auch die Produktivität Ihrer Mitarbeiter. Wir sorgen für glänzende Böden und hygienische Sanitärräume.

Unsere Systeme für die Büroreinigung sind effizient und einfach in der Anwendung, damit sich Ihr Team auf das Wesentliche konzentrieren kann.`,
    features: ["Sanitärbereiche", "Gemeinschaftsräume", "Lufthygiene", "Bodenpflege"],
    image: officeBg,
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    slug: "industrie-produktion",
    icon: Factory,
    title: "Industrie & Produktion",
    description: "Robuste Lösungen für Produktionsstätten und Lagerhallen.",
    longDescription: `Wo gehobelt wird, fallen Späne – und Schmutz. Unsere Industriereiniger entfernen selbst hartnäckigste Verschmutzungen wie Öle, Fette und Russ.

Wir bieten robuste Lösungen für Werkstätten, Produktionshallen und Lagerbereiche, die den harten Anforderungen im Industriealltag gewachsen sind.`,
    features: ["Industriereiniger", "Entfetter", "Bodenbeschichtung", "Spezialreinigung"],
    image: industryBg,
    color: "from-gray-500/20 to-gray-600/10",
  },
  {
    slug: "bildung-kinderbetreuung",
    icon: GraduationCap,
    title: "Bildung & Kinderbetreuung",
    description: "Sichere und kindgerechte Hygieneprodukte für Schulen und Kitas.",
    longDescription: `In Schulen und Kitas steht der Schutz der Kleinsten im Vordergrund. Unsere Produkte sind sicher in der Anwendung und oft speziell für empfindliche Haut geeignet.

Wir unterstützen Bildungseinrichtungen dabei, ein gesundes Lernumfeld zu schaffen und Hygiene spielerisch zu vermitteln.`,
    features: ["Hautschonung", "Allergenfrei", "Spielzeugpflege", "Sanitärhygiene"],
    image: educationBg,
    color: "from-pink-500/20 to-pink-600/10",
  },
];
