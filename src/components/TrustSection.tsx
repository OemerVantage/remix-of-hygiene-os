import { Truck, Award, Headphones } from "lucide-react";

const trustPoints = [
  {
    icon: Truck,
    title: "Zuverlässige Lieferung",
    description: "Konstant verfügbar mit schneller, termingerechter Zustellung",
  },
  {
    icon: Award,
    title: "Professionelle Qualität",
    description: "EU-zertifizierte Produkte nach höchsten Hygienestandards",
  },
  {
    icon: Headphones,
    title: "Persönlicher B2B-Support",
    description: "Dedizierte Beratung für Geschäftskunden",
  },
];

export function TrustSection() {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-hygiswiss">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-display-sm md:text-display-md text-foreground">
            Warum Hygiswiss
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="flex flex-col items-center text-center p-8"
            >
              <div className="w-16 h-16 rounded-full bg-card shadow-card flex items-center justify-center mb-6">
                <point.icon className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-heading-lg text-foreground mb-3">
                {point.title}
              </h3>
              
              <p className="text-body-md text-muted-foreground max-w-xs">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
