import { ArrowRight } from "lucide-react";

const guides = [
  {
    title: "Hygienevorschriften 2024",
    excerpt: "Aktuelle Richtlinien und gesetzliche Anforderungen für Unternehmen",
    category: "Compliance",
  },
  {
    title: "Händehygiene im Betrieb",
    excerpt: "Best Practices für effektive Handhygiene am Arbeitsplatz",
    category: "Praxis",
  },
  {
    title: "Branchenstandards im Überblick",
    excerpt: "Spezifische Anforderungen für Gastronomie, Gesundheitswesen und mehr",
    category: "Branchen",
  },
];

export function GuidesSection() {
  return (
    <section id="guides" className="section-padding">
      <div className="container-hygiswiss">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-body-sm font-medium text-primary uppercase tracking-wider">
              Wissen
            </span>
            <h2 className="mt-3 text-display-sm md:text-display-md text-foreground">
              Ratgeber
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground max-w-xl">
              Expertenwissen rund um professionelle Hygiene für Ihr Unternehmen
            </p>
          </div>
          
          <a
            href="#all-guides"
            className="mt-6 md:mt-0 inline-flex items-center text-primary font-medium hover:underline"
          >
            Alle Artikel
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <a
              key={guide.title}
              href="#"
              className="group bg-card rounded-2xl p-8 hover-lift shadow-card border border-border/50"
            >
              <span className="text-body-sm font-medium text-primary">
                {guide.category}
              </span>
              
              <h3 className="mt-3 text-heading-lg text-foreground group-hover:text-primary transition-colors duration-300">
                {guide.title}
              </h3>
              
              <p className="mt-3 text-body-md text-muted-foreground">
                {guide.excerpt}
              </p>

              <div className="mt-6 flex items-center text-primary text-body-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Weiterlesen
                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
