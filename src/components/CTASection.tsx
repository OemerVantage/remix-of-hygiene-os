import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section id="contact" className="section-padding bg-primary">
      <div className="container-hygiscout text-center">
        <h2 className="text-display-sm md:text-display-md text-primary-foreground max-w-2xl mx-auto">
          Persönliche Hygieneberatung erhalten
        </h2>
        
        <p className="mt-6 text-body-lg text-primary-foreground/80 max-w-xl mx-auto">
          Unsere Experten entwickeln mit Ihnen die optimale Hygienelösung für Ihr Unternehmen
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Beratung anfragen
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/20"
          >
            Zum Shop
          </Button>
        </div>
      </div>
    </section>
  );
}
