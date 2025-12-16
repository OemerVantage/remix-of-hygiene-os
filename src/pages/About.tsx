import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Users, Target, Award, Heart } from "lucide-react";

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

const milestones = [
  { year: "2015", title: "Gründung", description: "Start als kleines Familienunternehmen in Berlin" },
  { year: "2017", title: "Expansion", description: "Erweiterung des Produktportfolios und deutschlandweiter Vertrieb" },
  { year: "2019", title: "Zertifizierung", description: "ISO 9001 Zertifizierung für Qualitätsmanagement" },
  { year: "2021", title: "Digital", description: "Launch des Online-Shops und digitaler Beratungsservices" },
  { year: "2023", title: "Wachstum", description: "Über 1.000 zufriedene Kunden in ganz Europa" },
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
                Seit über 8 Jahren sind wir Ihr zuverlässiger Partner für professionelle 
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
                  jeder Größe mit den besten Produkten und Lösungen auszustatten.
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
                    <p className="text-4xl font-bold text-primary mb-2">8+</p>
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

        {/* Timeline Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Unsere Geschichte
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Von der Gründung bis heute – unser Weg zum Erfolg
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-center mb-12 last:mb-0 animate-fade-in ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div
                      className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}
                    >
                      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-primary font-bold text-lg">{milestone.year}</span>
                        <h3 className="text-xl font-bold text-foreground mt-2">{milestone.title}</h3>
                        <p className="text-muted-foreground mt-2">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background" />
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
