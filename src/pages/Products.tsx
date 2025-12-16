import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Loader2, Package, SlidersHorizontal, ChevronDown, Grid3X3, LayoutList, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";
type ViewMode = "grid" | "list";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
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

  // Extract unique categories from products
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach(p => {
      if (p.node.productType) {
        cats.add(p.node.productType);
      }
    });
    return Array.from(cats);
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(p => 
        p.node.productType && selectedCategories.includes(p.node.productType)
      );
    }

    // Filter by price range
    if (priceRange) {
      result = result.filter(p => {
        const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
        return price >= priceRange.min && price <= priceRange.max;
      });
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => 
          parseFloat(a.node.priceRange.minVariantPrice.amount) - 
          parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-desc":
        result.sort((a, b) => 
          parseFloat(b.node.priceRange.minVariantPrice.amount) - 
          parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "name-asc":
        result.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.node.title.localeCompare(a.node.title));
        break;
    }

    return result;
  }, [products, selectedCategories, priceRange, sortBy]);

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

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange(null);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategories.length > 0 || priceRange !== null || searchQuery !== "";

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="font-semibold text-foreground mb-3">Kategorien</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label htmlFor={category} className="text-sm cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Preis</h3>
        <div className="space-y-2">
          {[
            { label: "Unter 20€", min: 0, max: 20 },
            { label: "20€ - 50€", min: 20, max: 50 },
            { label: "50€ - 100€", min: 50, max: 100 },
            { label: "Über 100€", min: 100, max: 10000 },
          ].map(range => (
            <div key={range.label} className="flex items-center space-x-2">
              <Checkbox
                id={range.label}
                checked={priceRange?.min === range.min && priceRange?.max === range.max}
                onCheckedChange={(checked) => 
                  setPriceRange(checked ? { min: range.min, max: range.max } : null)
                }
              />
              <Label htmlFor={range.label} className="text-sm cursor-pointer">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="w-4 h-4 mr-2" />
          Filter zurücksetzen
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Professionelle Hygiene
                <span className="text-primary"> für jeden Bedarf</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Entdecken Sie unser umfangreiches Sortiment an hochwertigen 
                Hygieneprodukten für Ihr Unternehmen.
              </p>
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Produkte suchen..."
                  className="pl-10 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                {/* Mobile Filter Button */}
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="md:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filter
                      {hasActiveFilters && (
                        <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                          {selectedCategories.length + (priceRange ? 1 : 0)}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filter</SheetTitle>
                      <SheetDescription>
                        Verfeinern Sie Ihre Suche
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Results Count */}
                <span className="text-sm text-muted-foreground">
                  {filteredAndSortedProducts.length} Produkte
                </span>

                {/* Sort */}
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-[180px] h-10">
                    <SelectValue placeholder="Sortieren" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Empfohlen</SelectItem>
                    <SelectItem value="price-asc">Preis: Niedrig → Hoch</SelectItem>
                    <SelectItem value="price-desc">Preis: Hoch → Niedrig</SelectItem>
                    <SelectItem value="name-asc">Name: A → Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z → A</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="hidden md:flex items-center border border-border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-10 w-10 rounded-r-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-10 w-10 rounded-l-none"
                    onClick={() => setViewMode("list")}
                  >
                    <LayoutList className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedCategories.map(cat => (
                  <Badge key={cat} variant="secondary" className="cursor-pointer" onClick={() => toggleCategory(cat)}>
                    {cat}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {priceRange && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setPriceRange(null)}>
                    {priceRange.min}€ - {priceRange.max === 10000 ? "∞" : priceRange.max + "€"}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                    Suche: {searchQuery}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              {/* Sidebar Filters (Desktop) */}
              <aside className="hidden md:block w-64 flex-shrink-0">
                <div className="sticky top-36">
                  <h2 className="font-semibold text-lg text-foreground mb-4">Filter</h2>
                  <FilterContent />
                </div>
              </aside>

              {/* Products */}
              <div className="flex-1 min-w-0">
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : filteredAndSortedProducts.length === 0 ? (
                  <div className="text-center py-20 animate-fade-in">
                    <Package className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">Keine Produkte gefunden</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-4">
                      {hasActiveFilters 
                        ? "Versuchen Sie, Ihre Filter anzupassen."
                        : "Wir haben noch keine Produkte im Shop."}
                    </p>
                    {hasActiveFilters && (
                      <Button variant="outline" onClick={clearFilters}>
                        Filter zurücksetzen
                      </Button>
                    )}
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedProducts.map((product, index) => (
                      <div
                        key={product.node.id}
                        className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${index * 30}ms` }}
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
                              {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)} €
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
                ) : (
                  <div className="space-y-4">
                    {filteredAndSortedProducts.map((product, index) => (
                      <div
                        key={product.node.id}
                        className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in flex"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <Link to={`/produkt/${product.node.handle}`} className="flex-shrink-0">
                          <div className="relative w-40 h-40 bg-muted overflow-hidden">
                            {product.node.images.edges[0]?.node ? (
                              <img
                                src={product.node.images.edges[0].node.url}
                                alt={product.node.images.edges[0].node.altText || product.node.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-10 h-10 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        </Link>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <Link to={`/produkt/${product.node.handle}`}>
                              <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                                {product.node.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {product.node.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-xl font-bold text-primary">
                              {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)} €
                            </span>
                            <Button 
                              size="sm"
                              onClick={() => handleAddToCart(product)}
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              In den Warenkorb
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
