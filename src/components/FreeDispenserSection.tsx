import { Phone, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import dispenserImage from "@/assets/dispenser-systems.png";

export const FreeDispenserSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-primary/95 to-primary/85 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-primary-foreground rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-primary-foreground rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-primary-foreground rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Column */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/15 rounded-full mb-6">
              <Gift className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground text-sm font-medium">Exklusives Angebot</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Gratis Spendersystem
            </h2>

            <p className="text-lg md:text-xl text-primary-foreground/85 mb-10 max-w-2xl mx-auto">
              Profitieren Sie von unserem kostenlosen Spendersystem für Ihr Unternehmen. 
              Wir beraten Sie gerne persönlich und finden die perfekte Lösung für Ihre Anforderungen.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                variant="hero-outline"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0 text-base px-8"
                asChild
              >
                <a href="tel:+41445001234">
                  <Phone className="w-5 h-5" />
                  Jetzt anrufen
                </a>
              </Button>
              <p className="text-primary-foreground/70 text-sm">
                Mo–Fr, 08:00–17:00 Uhr
              </p>
            </div>
          </div>

          {/* Image Column */}
          <div className="flex items-center justify-center">
            <img
              src={dispenserImage}
              alt="Spendersysteme"
              className="max-h-[420px] w-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
