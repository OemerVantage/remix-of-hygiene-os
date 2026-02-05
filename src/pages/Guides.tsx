import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ArrowRight, Download, Play } from "lucide-react";
import { Link } from "react-router-dom";

const guides = [
  {
    id: 1,
    title: "Der ultimative Leitfaden zur Händehygiene am Arbeitsplatz",
    excerpt: "Erfahren Sie, wie Sie mit einfachen Massnahmen die Händehygiene in Ihrem Unternehmen verbessern können.",
    category: "Hygiene Basics",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800&h=400&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "HACCP-Hygieneschulung: Was Sie wissen müssen",
    excerpt: "Ein umfassender Überblick über HACCP-Anforderungen und wie Sie diese in Ihrer Küche umsetzen.",
    category: "Gastronomie",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Nachhaltige Reinigung: Umweltfreundliche Alternativen",
    excerpt: "Wie Sie Ihre Reinigungsprozesse nachhaltiger gestalten, ohne Kompromisse bei der Hygiene einzugehen.",
    category: "Nachhaltigkeit",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Desinfektion vs. Reinigung: Der Unterschied erklärt",
    excerpt: "Wann ist Reinigung ausreichend und wann sollten Sie desinfizieren? Ein praktischer Guide.",
    category: "Hygiene Basics",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Hygiene im Gesundheitswesen: Best Practices",
    excerpt: "Die wichtigsten Hygienestandards für medizinische Einrichtungen und deren Umsetzung.",
    category: "Gesundheitswesen",
    readTime: "15 min",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Spendersysteme richtig warten und pflegen",
    excerpt: "Tipps und Tricks für die optimale Wartung Ihrer Hygiene-Spendersysteme.",
    category: "Produkte",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&h=400&fit=crop",
  },
];

const resources = [
  { title: "Hygiene-Checkliste (PDF)", type: "PDF", size: "2.4 MB" },
  { title: "HACCP-Vorlagen", type: "ZIP", size: "5.1 MB" },
  { title: "Schulungsvideo: Händehygiene", type: "Video", duration: "12 min" },
];

const Guides = () => {
  const featuredGuide = guides.find((g) => g.featured);
  const regularGuides = guides.filter((g) => !g.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Ratgeber
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Wissen & Expertise
                <span className="text-primary block mt-2">rund um Hygiene</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Entdecken Sie unsere Ratgeber, Anleitungen und Best Practices 
                für professionelle Hygiene in Ihrem Unternehmen.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Guide */}
        {featuredGuide && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto animate-fade-in">
                <div className="group bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="grid lg:grid-cols-2">
                    <div className="aspect-video lg:aspect-auto relative overflow-hidden">
                      <img
                        src={featuredGuide.image}
                        alt={featuredGuide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        Empfohlen
                      </span>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <span className="text-primary text-sm font-medium mb-3">{featuredGuide.category}</span>
                      <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                        {featuredGuide.title}
                      </h2>
                      <p className="text-muted-foreground mb-6">{featuredGuide.excerpt}</p>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{featuredGuide.readTime} Lesezeit</span>
                        </div>
                        <Button className="group/btn">
                          Jetzt lesen
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Guides Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 max-w-6xl mx-auto animate-fade-in">
              Alle Ratgeber
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {regularGuides.map((guide, index) => (
                <article
                  key={guide.id}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-primary text-sm font-medium">{guide.category}</span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{guide.readTime}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{guide.excerpt}</p>
                    <Button variant="ghost" size="sm" className="group/btn p-0 h-auto text-primary">
                      Weiterlesen
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-3xl font-bold text-foreground mb-4">Kostenlose Ressourcen</h2>
                <p className="text-muted-foreground">
                  Laden Sie unsere kostenlosen Vorlagen und Materialien herunter
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <div
                    key={resource.title}
                    className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow animate-fade-in group cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      {resource.type === "Video" ? (
                        <Play className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                      ) : (
                        <Download className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {resource.type} • {resource.size || resource.duration}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-10 text-center text-primary-foreground animate-fade-in">
              <BookOpen className="w-12 h-12 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl font-bold mb-4">Bleiben Sie informiert</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Erhalten Sie regelmässig neue Ratgeber, Tipps und exklusive Angebote 
                direkt in Ihr Postfach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Ihre E-Mail-Adresse"
                  className="flex-1 px-6 py-3 rounded-xl text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
                />
                <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Abonnieren
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Guides;
