import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { guides } from "@/data/guides";

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
                <Link
                  to={`/ratgeber/${featuredGuide.slug}`}
                  className="group block bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
                >
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
                      <span className="text-primary text-sm font-medium mb-3">
                        {featuredGuide.category}
                      </span>
                      <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
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
                </Link>
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
                <Link
                  key={guide.id}
                  to={`/ratgeber/${guide.slug}`}
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
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {guide.excerpt}
                    </p>
                    <Button variant="ghost" size="sm" className="group/btn p-0 h-auto text-primary">
                      Weiterlesen
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Link>
              ))}
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
                <Button
                  variant="secondary"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
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
