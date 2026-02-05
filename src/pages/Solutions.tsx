import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Building2, Hotel, UtensilsCrossed, Factory, Hospital, GraduationCap, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const industries = [
  {
    icon: Hotel,
    title: "Hotellerie",
    description: "Professionelle Hygienelösungen für Hotels und Unterkünfte aller Grössen.",
    features: ["Zimmerreinigung", "Wäschehygiene", "Gästebereich", "Wellness & Spa"],
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    icon: UtensilsCrossed,
    title: "Gastronomie",
    description: "HACCP-konforme Produkte für Restaurants, Cafés und Catering.",
    features: ["Küchenhygiene", "Geschirrspülung", "Oberflächenreinigung", "Händedesinfektion"],
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    icon: Hospital,
    title: "Gesundheitswesen",
    description: "Medizinische Hygienestandards für Kliniken und Praxen.",
    features: ["Desinfektion", "Sterilisation", "Schutzausrüstung", "Abfallentsorgung"],
    color: "from-green-500/20 to-green-600/10",
  },
  {
    icon: Building2,
    title: "Büro & Verwaltung",
    description: "Saubere Arbeitsumgebungen für produktive Mitarbeiter.",
    features: ["Sanitärbereiche", "Gemeinschaftsräume", "Lufthygiene", "Bodenpflege"],
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    icon: Factory,
    title: "Industrie & Produktion",
    description: "Robuste Lösungen für Produktionsstätten und Lagerhallen.",
    features: ["Industriereiniger", "Entfetter", "Bodenbeschichtung", "Spezialreinigung"],
    color: "from-gray-500/20 to-gray-600/10",
  },
  {
    icon: GraduationCap,
    title: "Bildung & Kinderbetreuung",
    description: "Sichere und kindgerechte Hygieneprodukte für Schulen und Kitas.",
    features: ["Hautschonung", "Allergenfrei", "Spielzeugpflege", "Sanitärhygiene"],
    color: "from-pink-500/20 to-pink-600/10",
  },
];

const Solutions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Branchenlösungen
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Massgeschneiderte Lösungen
                <span className="text-primary block mt-2">für Ihre Branche</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Jede Branche hat ihre eigenen Anforderungen. Wir bieten spezialisierte 
                Hygienelösungen, die perfekt auf Ihr Geschäftsfeld abgestimmt sind.
              </p>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {industries.map((industry, index) => (
                <div
                  key={industry.title}
                  className="group bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`bg-gradient-to-br ${industry.color} p-8`}>
                    <div className="w-16 h-16 bg-background/80 backdrop-blur rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <industry.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{industry.title}</h3>
                    <p className="text-muted-foreground">{industry.description}</p>
                  </div>
                  <div className="p-8">
                    <ul className="space-y-3 mb-6">
                      {industry.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-foreground">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full group/btn">
                      Mehr erfahren
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ihre Branche nicht dabei?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Wir entwickeln individuelle Lösungen für jede Anforderung. 
                Kontaktieren Sie uns für eine persönliche Beratung.
              </p>
              <Link to="/kontakt">
                <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Kostenlose Beratung anfragen
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
