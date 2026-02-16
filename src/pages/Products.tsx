import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters, FilterState } from "@/components/ProductFilters";
import { Loader2, Package } from "lucide-react";
import { storefrontApiRequest, PRODUCTS_QUERY, ShopifyProduct } from "@/lib/shopify";

const Products = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    categories: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 50 });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges as ShopifyProduct[]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(({ node }) => {
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = node.title.toLowerCase().includes(query);
        const matchesDescription = node.description.toLowerCase().includes(query);
        const matchesProductType = node.productType?.toLowerCase().includes(query);
        const matchesVendor = node.vendor?.toLowerCase().includes(query);
        const matchesTags = node.tags?.some(tag => tag.toLowerCase().includes(query));
        const matchesSku = node.variants.edges.some(
          ({ node: variant }) => variant.sku?.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesDescription && !matchesProductType && !matchesVendor && !matchesTags && !matchesSku) {
          return false;
        }
      }

      // Category filter - match against productType or tags
      if (filters.categories.length > 0) {
        const matchesType = filters.categories.some(
          cat => node.productType?.toLowerCase() === cat.toLowerCase()
        );
        const matchesTags = filters.categories.some(
          cat => node.tags?.some(tag => tag.toLowerCase() === cat.toLowerCase())
        );
        if (!matchesType && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [products, filters]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Unsere Produkte
              </h1>
              <p className="text-muted-foreground text-lg">
                Entdecken Sie unser umfangreiches Sortiment an hochwertigen Hygieneprodukten
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-8">
                {/* Filters */}
                <ProductFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  filteredCount={filteredProducts.length}
                />

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Package className="w-10 h-10 text-primary" />
                    </div>
                    {products.length === 0 ? (
                      <>
                        <h2 className="text-2xl font-bold mb-2">Keine Produkte verfügbar</h2>
                        <p className="text-muted-foreground">
                          Es sind noch keine Produkte im Shop hinterlegt.
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold mb-2">Keine Ergebnisse</h2>
                        <p className="text-muted-foreground">
                          Keine Produkte gefunden für die ausgewählten Filter
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.node.id} product={product} />
                    ))}
                  </div>
                )}
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
