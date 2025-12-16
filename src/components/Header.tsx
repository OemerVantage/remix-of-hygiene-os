import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Über uns", href: "#about" },
  { label: "Branchenlösungen", href: "#solutions" },
  { label: "Produkte", href: "#products", highlight: true },
  { label: "Ratgeber", href: "#guides" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-hygiscout">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="text-heading-lg tracking-tight text-primary font-semibold">
            HYGISCOUT
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`text-body-md transition-colors duration-200 ${
                    item.highlight
                      ? "text-primary font-medium hover:text-primary/80"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="default" size="default">
              Zum Shop
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-card shadow-lg border-t border-border">
            <ul className="flex flex-col py-6 px-6 gap-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`block py-2 text-body-lg ${
                      item.highlight
                        ? "text-primary font-medium"
                        : "text-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <Button variant="default" className="w-full">
                  Zum Shop
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
