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
  features: { title: string; description: string }[];
  image: string;
  color: string;
}

export const industries: Industry[] = [
  {
    slug: "hotellerie",
    icon: Hotel,
    title: "Hotellerie",
    description: "Professionelle Hygienelösungen für Hotels und Unterkünfte aller Grössen.",
    longDescription: `In der Hotellerie entscheidet der erste Eindruck. Gepflegte Sanitärbereiche, gut befüllte Spender und frische Handtücher vermitteln Ihren Gästen Qualität und Wertschätzung — vom Zimmer bis zur Lobby.

Mit unseren Spendersystemen und Verbrauchsmaterialien stellen Sie sicher, dass Ihre Gäste jederzeit bestens versorgt sind. Zuverlässig, hygienisch und wirtschaftlich — für einen reibungslosen Hotelbetrieb.`,
    features: [
      { title: "Handtuchspender", description: "Elegante Spender für Zimmer, Lobby und Spa." },
      { title: "Seifenspender", description: "Hochwertige Seifenlösungen für jeden Gästebereich." },
      { title: "Toilettenhygiene", description: "Zuverlässige Versorgung für alle Sanitäranlagen." },
      { title: "Gästebereiche", description: "Komplettausstattung für Wellness und öffentliche Räume." },
    ],
    image: hotelBg,
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    slug: "gastronomie",
    icon: UtensilsCrossed,
    title: "Gastronomie",
    description: "Hygienische Lösungen für Restaurants, Cafés und Catering.",
    longDescription: `In der Gastronomie ist Hygiene nicht verhandelbar. Ob Gäste-WC, Küche oder Personalbereich — saubere Hände und gepflegte Sanitäranlagen sind das Fundament für das Vertrauen Ihrer Gäste.

Unsere Spendersysteme sorgen dafür, dass Seife, Handtücher und Toilettenpapier immer verfügbar sind. Einfach zu befüllen, hygienisch im Betrieb und wirtschaftlich in der Nutzung.`,
    features: [
      { title: "Seifenspender", description: "Hygienische Handpflege für Küche und Gäste-WC." },
      { title: "Handtuchrollenspender", description: "Schnelles Trocknen bei hohem Durchlauf." },
      { title: "Toilettenpapier", description: "Wirtschaftliche Lösungen für stark frequentierte WCs." },
      { title: "Personalbereich", description: "Saubere Umkleiden und Sozialräume für Ihr Team." },
    ],
    image: gastronomyBg,
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    slug: "gesundheitswesen",
    icon: Hospital,
    title: "Gesundheitswesen",
    description: "Zuverlässige Hygieneprodukte für Praxen, Kliniken und Pflegeeinrichtungen.",
    longDescription: `Im Gesundheitswesen gelten höchste Anforderungen an Sauberkeit und Infektionsprävention. Zuverlässige Spendersysteme und hochwertige Verbrauchsmaterialien sind dabei unverzichtbar.

Unsere Produkte sind auf den Einsatz in sensiblen Umgebungen ausgelegt — von der Arztpraxis bis zum Pflegeheim. Einfache Handhabung und konstante Verfügbarkeit unterstützen Ihr Team im Alltag.`,
    features: [
      { title: "Seifenspender", description: "Schonende Reinigung für häufiges Händewaschen." },
      { title: "Handtuchspender", description: "Berührungslose Trocknung für maximale Hygiene." },
      { title: "Toilettenhygiene", description: "Zuverlässige Ausstattung für Patienten und Personal." },
      { title: "Verbrauchsmaterial", description: "Nachfüllungen und Zubehör für den täglichen Bedarf." },
    ],
    image: healthcareBg,
    color: "from-green-500/20 to-green-600/10",
  },
  {
    slug: "buero-verwaltung",
    icon: Building2,
    title: "Büro & Verwaltung",
    description: "Saubere Arbeitsumgebungen für produktive Mitarbeiter.",
    longDescription: `Gepflegte Sanitärbereiche sind kein Luxus, sondern Ausdruck von Wertschätzung gegenüber Ihren Mitarbeitenden. Gut ausgestattete WCs und Waschräume tragen direkt zum Wohlbefinden und zur Produktivität bei.

Mit unseren Spendersystemen bleiben Ihre Sanitärbereiche jederzeit sauber und gut bestückt — ohne grossen Wartungsaufwand für Ihr Facility-Team.`,
    features: [
      { title: "Seifenspender", description: "Gepflegte Waschräume für zufriedene Mitarbeitende." },
      { title: "Handtuchspender", description: "Praktische Lösungen für jeden Sanitärbereich." },
      { title: "Toilettenpapier", description: "Zuverlässige Versorgung ohne Wartungsaufwand." },
      { title: "Sanitärbereiche", description: "Komplettlösungen für moderne Bürowelten." },
    ],
    image: officeBg,
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    slug: "industrie-produktion",
    icon: Factory,
    title: "Industrie & Produktion",
    description: "Robuste Hygienelösungen für Produktionsstätten und Werkstätten.",
    longDescription: `In Produktion und Werkstatt braucht es robuste Lösungen. Mitarbeitende, die mit Öl, Staub oder Schmutz arbeiten, benötigen zuverlässige Handreinigungs- und Trocknungsmöglichkeiten direkt am Arbeitsplatz.

Unsere Spendersysteme sind auf den industriellen Einsatz ausgelegt — langlebig, einfach zu warten und mit hohem Fassungsvermögen für Bereiche mit starker Nutzung.`,
    features: [
      { title: "Handtuchrollenspender", description: "Robuste Spender für stark beanspruchte Bereiche." },
      { title: "Handseife", description: "Effektive Reinigung bei Öl, Staub und Schmutz." },
      { title: "Toilettenpapier", description: "Grosspackungen für Bereiche mit hohem Verbrauch." },
      { title: "Grossverbraucher-Lösungen", description: "Wirtschaftliche Systeme für den Dauerbetrieb." },
    ],
    image: industryBg,
    color: "from-gray-500/20 to-gray-600/10",
  },
  {
    slug: "bildung-kinderbetreuung",
    icon: GraduationCap,
    title: "Bildung & Kinderbetreuung",
    description: "Kindgerechte Hygieneprodukte für Schulen und Kitas.",
    longDescription: `In Schulen und Kitas ist regelmässiges Händewaschen der beste Schutz vor Krankheiten. Kindgerechte Spendersysteme motivieren die Kleinsten zur Handhygiene und machen sie zur Selbstverständlichkeit.

Unsere Produkte sind einfach zu bedienen, hygienisch und wirtschaftlich — ideal für Einrichtungen mit vielen kleinen Händen und hohem Verbrauch.`,
    features: [
      { title: "Seifenspender", description: "Kinderfreundliche Spender, die zum Händewaschen motivieren." },
      { title: "Handtuchspender", description: "Einfache Bedienung auch für kleine Hände." },
      { title: "Toilettenpapier", description: "Zuverlässig und kindgerecht in jeder Kabine." },
      { title: "Sanitärhygiene", description: "Saubere Sanitärräume für Schulen und Kitas." },
    ],
    image: educationBg,
    color: "from-pink-500/20 to-pink-600/10",
  },
];
