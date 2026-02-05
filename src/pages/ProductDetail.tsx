import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Loader2, ArrowLeft, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";
import { ProductDescription } from "@/components/ProductDescription";
import { ProductImageGallery } from "@/components/ProductImageGallery";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const addItem = useCartStore(state => state.addItem);
  const isAddingToCart = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.productByHandle) {
          setProduct(data.data.productByHandle);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
    if (!selectedVariant) return;

    const shopifyProduct: ShopifyProduct = { node: product };
    
    await addItem({
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    });
    
    toast.success("Zum Warenkorb hinzugefügt", {
      description: `${quantity}x ${product.title}`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Produkt nicht gefunden</h1>
            <Link to="/produkte">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zum Shop
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const images = product.images.edges;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <Link to="/produkte" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zum Shop
          </Link>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <ProductImageGallery images={images} productTitle={product.title} />

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                {selectedVariant?.sku && (
                  <p className="text-sm text-muted-foreground mb-2">
                    Artikelnummer: {selectedVariant.sku}
                  </p>
                )}
                <p className="text-2xl font-bold text-primary">
                  {selectedVariant ? parseFloat(selectedVariant.price.amount).toFixed(2) : parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)} {product.priceRange.minVariantPrice.currencyCode}
                </p>
              </div>

              {product.description && (
                <ProductDescription 
                  description={product.description} 
                  metafields={product.metafields}
                />
              )}

              {/* Variants */}
              {product.variants.edges.length > 1 && (
                <div className="space-y-3">
                  <label className="font-medium">Variante</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map((variant, index) => (
                      <Button
                        key={variant.node.id}
                        variant={selectedVariantIndex === index ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedVariantIndex(index);
                        }}
                        disabled={!variant.node.availableForSale}
                      >
                        {variant.node.title}
                        {!variant.node.availableForSale && (
                          <Badge variant="secondary" className="ml-2">Ausverkauft</Badge>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3">
                <label className="font-medium">Menge</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleAddToCart}
                disabled={isAddingToCart || !selectedVariant?.availableForSale}
              >
                {isAddingToCart ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    In den Warenkorb
                  </>
                )}
              </Button>

              {selectedVariant && !selectedVariant.availableForSale && (
                <p className="text-destructive text-center">Dieses Produkt ist derzeit nicht verfügbar</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
