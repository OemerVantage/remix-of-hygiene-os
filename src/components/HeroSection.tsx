import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bathroom.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40 z-10" />
        <img
          src={heroImage}
          alt="Professionelle Hygienelösungen"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="container-hygiswiss relative z-20">
        <div className="max-w-2xl">
          <h1 className="text-display-md md:text-display-lg text-foreground animate-fade-in-up">
            Professionelle Hygiene
            <br />
            <span className="text-primary">für Unternehmen</span>
          </h1>
          
          <p className="mt-6 text-body-lg text-muted-foreground max-w-xl animate-fade-in-delay-1">
            Seit 2006 Ihr Partner für professionelle Hygiene. 
            Effiziente Spendersysteme und Verbrauchsmaterial für jede Branche.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-delay-2">
            <Button variant="hero" size="lg">
              Zum Shop
            </Button>
            <Button variant="hero-outline" size="lg">
              Branchenlösung finden
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap gap-8 text-body-sm text-muted-foreground animate-fade-in-delay-3">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              EU-zertifiziert
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              B2B-Konditionen
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Schnelle Lieferung
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
