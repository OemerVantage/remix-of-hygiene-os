import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { CartDrawer } from "@/components/CartDrawer";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

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
  const { user, isLoading } = useAuth();

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
          <Link to="/">
            <img src={logo} alt="HygiSwiss AG" className="h-10 w-auto" />
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

          {/* CTA Button + Cart + Account */}
          <div className="hidden lg:flex items-center gap-4">
            <CartDrawer />
            
            {!isLoading && (
              user ? (
                <Link to="/konto">
                  <Button variant="outline" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="outline" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Anmelden
                  </Button>
                </Link>
              )
            )}
            
            <Link to="/kontakt">
              <Button variant="default" size="default">
                Kontakt aufnehmen
              </Button>
            </Link>
          </div>

          {/* Mobile Cart + Account + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <CartDrawer />
            {!isLoading && user && (
              <Link to="/konto">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
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
              {!isLoading && !user && (
                <li>
                  <Link
                    to="/login"
                    className="block py-2 text-body-lg text-primary font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Anmelden
                  </Link>
                </li>
              )}
              <li className="pt-4">
                <Link to="/kontakt" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full">
                    Kontakt aufnehmen
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
