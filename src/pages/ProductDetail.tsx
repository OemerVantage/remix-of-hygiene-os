import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { storefrontApiRequest, STOREFRONT_PRODUCT_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingCart, Loader2, ArrowLeft, Package, Minus, Plus } from "lucide-react";

interface ProductData {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType: string;
  vendor: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  options: Array<{
    name: string;
    values: string[];
  }>;
}

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      setIsLoading(true);
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCT_QUERY, { handle });
        
        if (data?.data?.productByHandle) {
          setProduct(data.data.productByHandle);
          if (data.data.productByHandle.variants.edges[0]) {
            setSelectedVariant(data.data.productByHandle.variants.edges[0].node.id);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error("Fehler beim Laden des Produkts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const variant = product.variants.edges.find(v => v.node.id === selectedVariant)?.node;
    if (!variant) return;

    addItem({
      product: {
        node: {
          id: product.id,
          title: product.title,
          description: product.description,
          handle: product.handle,
          productType: product.productType || '',
          vendor: product.vendor || '',
          priceRange: product.priceRange,
          images: product.images,
          variants: product.variants,
          options: product.options
        }
      },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || []
    });
    
    toast.success("Zum Warenkorb hinzugefügt", {
      position: "top-center"
    });
  };

  const currentVariant = product?.variants.edges.find(v => v.node.id === selectedVariant)?.node;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="flex items-center justify-center py-32">
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
          <div className="container mx-auto px-4 py-32 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-foreground mb-4">Produkt nicht gefunden</h1>
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Link to="/produkte" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zum Shop
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Images */}
              <div className="space-y-4 animate-fade-in">
                <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
                  {product.images.edges[selectedImage]?.node ? (
                    <img
                      src={product.images.edges[selectedImage].node.url}
                      alt={product.images.edges[selectedImage].node.altText || product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-24 h-24 text-muted-foreground" />
                    </div>
                  )}
                </div>
                {product.images.edges.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto">
                    {product.images.edges.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={image.node.url}
                          alt={image.node.altText || `${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {product.title}
                </h1>
                
                <p className="text-3xl font-bold text-primary mb-6">
                  {currentVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode}{" "}
                  {parseFloat(currentVariant?.price.amount || product.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>

                {product.description && (
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {product.description}
                  </p>
                )}

                {/* Variants */}
                {product.variants.edges.length > 1 && (
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Variante wählen
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.edges.map((variant) => (
                        <button
                          key={variant.node.id}
                          onClick={() => setSelectedVariant(variant.node.id)}
                          disabled={!variant.node.availableForSale}
                          className={`px-4 py-2 rounded-lg border transition-all ${
                            selectedVariant === variant.node.id
                              ? 'border-primary bg-primary/10 text-primary'
                              : variant.node.availableForSale
                              ? 'border-border hover:border-primary/50'
                              : 'border-border opacity-50 cursor-not-allowed'
                          }`}
                        >
                          {variant.node.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Menge
                  </label>
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
                  className="w-full h-14 text-lg rounded-xl"
                  onClick={handleAddToCart}
                  disabled={!currentVariant?.availableForSale}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {currentVariant?.availableForSale ? 'In den Warenkorb' : 'Nicht verfügbar'}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
