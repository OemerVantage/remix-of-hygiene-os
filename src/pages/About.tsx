import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Users, Target, Award, Heart, Leaf, Recycle, Package, BadgeCheck, Building, Clock } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Qualität",
    description: "Wir setzen auf höchste Qualitätsstandards bei allen unseren Produkten und Dienstleistungen.",
  },
  {
    icon: Users,
    title: "Kundennähe",
    description: "Ihre Zufriedenheit steht bei uns an erster Stelle. Wir hören zu und finden gemeinsam die beste Lösung.",
  },
  {
    icon: Award,
    title: "Innovation",
    description: "Wir entwickeln kontinuierlich neue Lösungen, um den Anforderungen der Zukunft gerecht zu werden.",
  },
  {
    icon: Heart,
    title: "Verantwortung",
    description: "Nachhaltigkeit und soziale Verantwortung sind fest in unserer Unternehmenskultur verankert.",
  },
];

const sustainabilityPoints = [
  {
    icon: Leaf,
    title: "Umweltfreundliche Produkte",
    description: "Wir bieten recycelbare Materialien und biologisch abbaubare Optionen für eine saubere Zukunft.",
  },
  {
    icon: Recycle,
    title: "CO2-reduzierte Lieferkette",
    description: "Optimierte Logistik und regionale Partner minimieren unseren ökologischen Fussabdruck.",
  },
  {
    icon: Package,
    title: "Ressourcenschonend",
    description: "Effiziente Verpackungen und reduzierter Materialeinsatz schonen natürliche Ressourcen.",
  },
  {
    icon: BadgeCheck,
    title: "Zertifizierte Partner",
    description: "Wir arbeiten ausschliesslich mit nachhaltig zertifizierten Lieferanten zusammen.",
  },
];

const timelineEvents = [
  { year: "2004", title: "Gründung", description: "Gründung des Unternehmens als Familienbetrieb mit Fokus auf Hygieneprodukte." },
  { year: "2008", title: "Wachstum", description: "Erweiterung des Sortiments und Aufbau eines schweizweiten Kundenstamms." },
  { year: "2014", title: "Expansion", description: "Über 500 Produkte im Portfolio und Partnerschaften mit führenden Herstellern." },
  { year: "2020", title: "Digitalisierung", description: "Launch des Online-Shops und digitaler Bestellprozesse für unsere Kunden." },
  { year: "Heute", title: "Marktführer", description: "Über 1.000 zufriedene Kunden vertrauen auf unsere Hygienelösungen." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Über uns
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Ihr Partner für
                <span className="text-primary block mt-2">Hygiene & Sauberkeit</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Seit über 20 Jahren sind wir Ihr zuverlässiger Partner für professionelle 
                Hygienelösungen. Qualität, Innovation und Kundenzufriedenheit stehen bei uns an erster Stelle.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div className="animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Unsere Mission
                </h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  Wir glauben daran, dass professionelle Hygiene der Grundstein für 
                  ein gesundes Arbeitsumfeld ist. Unsere Mission ist es, Unternehmen 
                  jeder Grösse mit den besten Produkten und Lösungen auszustatten.
                </p>
                <p className="text-muted-foreground text-lg">
                  Mit einem erfahrenen Team und einem breiten Produktportfolio 
                  unterstützen wir Sie dabei, höchste Hygienestandards zu erreichen 
                  und zu halten – effizient, nachhaltig und kostenoptimiert.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-10 animate-fade-in">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary mb-2">1.000+</p>
                    <p className="text-muted-foreground">Zufriedene Kunden</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary mb-2">20+</p>
                    <p className="text-muted-foreground">Jahre Erfahrung</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary mb-2">500+</p>
                    <p className="text-muted-foreground">Produkte</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary mb-2">24h</p>
                    <p className="text-muted-foreground">Lieferzeit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Geschäftsführer Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Geschäftsführung
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Geführt mit Erfahrung & Leidenschaft
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Unser Unternehmen wird mit Herzblut und über 34 Jahren Branchenkenntnis geführt. 
                Als Familienbetrieb stehen wir für persönliche Beratung und langfristige Kundenbeziehungen – 
                mit dem Anspruch, für jeden Kunden die beste Lösung zu finden.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Über 34 Jahre Berufserfahrung</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  <span>Familienbetrieb mit persönlicher Betreuung</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16 animate-fade-in">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Seit über 20 Jahren
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Unsere Geschichte
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Von der Gründung bis heute – ein Weg geprägt von Wachstum und Vertrauen.
                </p>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

                <div className="space-y-12">
                  {timelineEvents.map((event, index) => (
                    <div
                      key={event.year}
                      className={`relative flex items-start gap-6 md:gap-12 animate-fade-in ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Dot */}
                      <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-1/2 z-10 mt-1" />

                      {/* Content */}
                      <div className={`ml-14 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:text-right" : ""}`}>
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold mb-2">
                          {event.year}
                        </span>
                        <h3 className="text-xl font-bold text-foreground mb-1">{event.title}</h3>
                        <p className="text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Unsere Werte
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Diese Grundsätze leiten uns jeden Tag bei unserer Arbeit
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <value.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sustainability Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 animate-fade-in">
                <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                  Verantwortung für morgen
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Nachhaltigkeit
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Umweltbewusstes Handeln ist Teil unserer Unternehmens-DNA. 
                  Wir setzen auf nachhaltige Lösungen entlang der gesamten Wertschöpfungskette.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {sustainabilityPoints.map((point, index) => (
                  <div
                    key={point.title}
                    className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-8 border border-green-200/50 hover:shadow-lg transition-all duration-300 animate-fade-in group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300">
                      <point.icon className="w-7 h-7 text-green-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{point.title}</h3>
                    <p className="text-muted-foreground">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
