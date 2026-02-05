import { useParams, Link, Navigate } from "react-router-dom";
import { industries } from "@/data/industries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, ChevronRight, Star, ShoppingBag, ArrowDown } from "lucide-react";

export default function IndustryDetail() {
  const { handle } = useParams();
  const industry = industries.find((i) => i.slug === handle);

  if (!industry) {
    return <Navigate to="/branchenloesungen" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Immersive Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end pt-20">
        <div className="absolute inset-0">
          <img
            src={industry.image}
            alt={industry.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pb-16">
          <Link
            to="/branchenloesungen"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Übersicht
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 backdrop-blur flex items-center justify-center">
              <industry.icon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">Branchenlösungen</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {industry.title}
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            {industry.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/kontakt">
              <Button size="lg" className="rounded-xl">
                Lösung anfragen
              </Button>
            </Link>
            <Link to="/produkte">
              <Button size="lg" variant="outline" className="rounded-xl">
                Produkte entdecken
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-lg max-w-none">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wide">
                    Hygienestandards neu definiert
                  </span>
                </div>

                <div className="text-muted-foreground whitespace-pre-line text-lg leading-relaxed">
                  {industry.longDescription}
                </div>
              </div>

              {/* Features Grid */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  Unsere Lösungen für die {industry.title}
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {industry.features.map((feature, idx) => (
                    <div
                      key={feature}
                      className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                          <CheckCircle className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{feature}</h3>
                          <p className="text-sm text-muted-foreground">Spezialisierte Anwendung</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Recommendations Teaser */}
              <div className="bg-muted/30 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Empfohlene Produkte</h3>
                    <p className="text-muted-foreground">Bestseller für die {industry.title}</p>
                  </div>
                  <Link to="/produkte">
                    <Button variant="ghost" className="group">
                      Alle ansehen
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-all duration-300"
                    >
                      <span className="absolute top-3 left-3 z-10 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        Bestseller
                      </span>
                      <div className="aspect-square relative overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <span className="text-4xl">📦</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">(24)</span>
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">Profi-Hygienereiniger XL</h4>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary">CHF 24.90</span>
                          <Button size="sm" variant="outline" className="rounded-lg">
                            <ShoppingBag className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1">
              {/* Sticky Contact Card */}
              <div className="sticky top-24 space-y-6">
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 text-primary-foreground">
                  <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mb-6">
                    <industry.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Beratung gewünscht?</h3>
                  <p className="text-primary-foreground/80 mb-6">
                    Unsere Experten erstellen Ihnen gerne ein individuelles Hygienekonzept für Ihre Branche.
                  </p>
                  <Link to="/kontakt">
                    <Button variant="secondary" className="w-full rounded-xl bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                      Jetzt anfragen
                    </Button>
                  </Link>
                </div>

                <div className="bg-card rounded-3xl border border-border p-8">
                  <h4 className="font-bold text-foreground mb-4">Warum Hygiswiss?</h4>
                  <ul className="space-y-3">
                    {[
                      "Schweizer Qualitätsprodukte",
                      "24h Lieferservice",
                      "Kostenlose Schulungen",
                      "Persönliche Betreuung",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
