import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { CartDrawer } from "@/components/CartDrawer";

const navItems = [
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Branchenlösungen", href: "/branchenloesungen" },
  { label: "Produkte", href: "/produkte", highlight: true },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
          <Link to="/" className="text-heading-lg tracking-tight text-primary font-semibold">
            HYGISCOUT
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`text-body-md transition-colors duration-200 ${
                    location.pathname === item.href
                      ? "text-primary font-medium"
                      : item.highlight
                      ? "text-primary font-medium hover:text-primary/80"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <CartDrawer />
            <Link to="/produkte">
              <Button variant="default" size="default">
                Zum Shop
              </Button>
            </Link>
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
                  <Link
                    to={item.href}
                    className={`block py-2 text-body-lg ${
                      location.pathname === item.href
                        ? "text-primary font-medium"
                        : item.highlight
                        ? "text-primary font-medium"
                        : "text-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4 flex items-center gap-3">
                <CartDrawer />
                <Link to="/produkte" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <Button variant="default" className="w-full">
                    Zum Shop
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
