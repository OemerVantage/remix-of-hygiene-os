import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Package } from "lucide-react";

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center animate-fade-in">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Package className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Shop kommt bald
              </h1>
              <p className="text-muted-foreground text-lg">
                Wir arbeiten gerade an unserem Online-Shop. 
                Bald finden Sie hier unser umfangreiches Sortiment an hochwertigen Hygieneprodukten.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
