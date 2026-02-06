import { Link } from "react-router-dom";
import { industries } from "@/data/industries";

export function SolutionsSection() {
  return (
    <section id="solutions" className="section-padding bg-secondary">
      <div className="container-hygiscout">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-display-sm md:text-display-md text-foreground">
            Wählen Sie Ihre Umgebung
          </h2>
          <p className="mt-4 text-body-lg text-muted-foreground">
            Massgeschneiderte Hygienekonzepte für Ihre Branche
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {industries.map((industry, index) => (
            <Link
              key={industry.slug}
              to={`/branchenloesungen/${industry.slug}`}
              className="group bg-card rounded-xl p-6 md:p-8 text-center hover-lift shadow-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                <industry.icon className="w-7 h-7 md:w-8 md:h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-heading-md text-foreground mb-2">
                {industry.title}
              </h3>
              <p className="text-body-sm text-muted-foreground hidden md:block">
                {industry.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
