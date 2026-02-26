import { Link } from "react-router-dom";
import { Box, Droplets, Brush } from "lucide-react";

const modules = [
  {
    icon: Box,
    title: "Spender",
    description: "Seifenspender, Handtuchspender und Desinfektionsspender",
    color: "from-primary/10 to-primary/5",
  },
  {
    icon: Droplets,
    title: "Verbrauchsmaterial",
    description: "Seife, Papierhandtücher, Toilettenpapier und mehr",
    color: "from-accent to-accent/50",
  },
  {
    icon: Brush,
    title: "Reinigung",
    description: "Professionelle Reinigungsgeräte und -mittel",
    color: "from-accent to-accent/50",
  },
];

export function ModulesSection() {
  return (
    <section id="products" className="section-padding">
      <div className="container-hygiswiss">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-body-sm font-medium text-primary uppercase tracking-wider">
            Hygiene OS
          </span>
          <h2 className="mt-3 text-display-sm md:text-display-md text-foreground">
            Module
          </h2>
          <p className="mt-4 text-body-lg text-muted-foreground">
            Unser modulares System deckt alle Bereiche der professionellen Hygiene ab
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <Link
              key={module.title}
              to="/produkte"
              className="group relative overflow-hidden bg-card rounded-2xl p-8 hover-lift shadow-card border border-border/50"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <module.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                
                <h3 className="text-heading-lg text-foreground mb-3">
                  {module.title}
                </h3>
                
                <p className="text-body-md text-muted-foreground">
                  {module.description}
                </p>

                <div className="mt-6 flex items-center text-primary text-body-sm font-medium">
                  Produkte ansehen
                  <svg
                    className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
