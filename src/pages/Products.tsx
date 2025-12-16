import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const categories = [
  "Alle Produkte",
  "Reinigungsmittel",
  "Desinfektion",
  "Hautpflege",
  "Papierwaren",
  "Spendersysteme",
  "Zubehör",
];

const products = [
  {
    id: 1,
    name: "Premium Händedesinfektionsmittel",
    category: "Desinfektion",
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400&h=400&fit=crop",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Allzweckreiniger Konzentrat",
    category: "Reinigungsmittel",
    price: 8.49,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Hygiene-Seifenspender",
    category: "Spendersysteme",
    price: 29.99,
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop",
    badge: "Neu",
  },
  {
    id: 4,
    name: "Mikrofaser-Reinigungstücher Set",
    category: "Zubehör",
    price: 14.99,
    rating: 4.7,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Handpflegecreme 500ml",
    category: "Hautpflege",
    price: 9.99,
    rating: 4.5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Toilettenpapier Premium 3-lagig",
    category: "Papierwaren",
    price: 24.99,
    rating: 4.8,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=400&h=400&fit=crop",
    badge: "Sparpaket",
  },
  {
    id: 7,
    name: "Flächendesinfektionsspray",
    category: "Desinfektion",
    price: 7.99,
    rating: 4.6,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "WC-Reiniger Power Gel",
    category: "Reinigungsmittel",
    price: 4.99,
    rating: 4.4,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
  },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("Alle Produkte");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Alle Produkte" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Produkte
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Professionelle Hygiene
                <span className="text-primary block mt-2">für jeden Bedarf</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Entdecken Sie unser umfangreiches Sortiment an hochwertigen 
                Hygieneprodukten für Ihr Unternehmen.
              </p>
            </div>
          </div>
        </section>

        {/* Filter & Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-7xl mx-auto animate-fade-in">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Produkte suchen..."
                  className="pl-12 h-12 rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="whitespace-nowrap rounded-full"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                    <h3 className="font-semibold text-foreground mb-3 line-clamp-2 min-h-[3rem]">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-primary">
                          €{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            €{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button size="sm" className="rounded-full">
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 animate-fade-in">
                <p className="text-muted-foreground text-lg">Keine Produkte gefunden.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
