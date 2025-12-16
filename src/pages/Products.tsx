import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Loader2, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, {
          first: 50,
          query: searchQuery || null
        });
        
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error("Fehler beim Laden der Produkte");
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem: CartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Zum Warenkorb hinzugefügt", {
      position: "top-center"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Shop
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

        {/* Search Bar */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto animate-fade-in">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Produkte suchen..."
                  className="pl-12 h-12 rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 pb-20">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Keine Produkte gefunden</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Wir haben noch keine Produkte im Shop. Erstellen Sie Produkte, indem Sie mir im Chat beschreiben, 
                  was Sie verkaufen möchten.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {products.map((product, index) => (
                  <div
                    key={product.node.id}
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Link to={`/produkt/${product.node.handle}`}>
                      <div className="relative aspect-square bg-muted overflow-hidden">
                        {product.node.images.edges[0]?.node ? (
                          <img
                            src={product.node.images.edges[0].node.url}
                            alt={product.node.images.edges[0].node.altText || product.node.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-5">
                      <Link to={`/produkt/${product.node.handle}`}>
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem] hover:text-primary transition-colors">
                          {product.node.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {product.node.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">
                          {product.node.priceRange.minVariantPrice.currencyCode}{" "}
                          {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                        </span>
                        <Button 
                          size="sm" 
                          className="rounded-full"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
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
