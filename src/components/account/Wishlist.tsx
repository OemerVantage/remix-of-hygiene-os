import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from "@/lib/shopify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Heart, Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";

interface WishlistItem {
  id: string;
  product_handle: string;
  variant_id: string | null;
  created_at: string;
}

export function Wishlist() {
  const { user } = useAuth();
  const addItem = useCartStore((state) => state.addItem);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [products, setProducts] = useState<Map<string, ShopifyProduct["node"]>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const fetchWishlist = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("wishlist_items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Wunschliste konnte nicht geladen werden");
    } else {
      setWishlistItems(data as WishlistItem[]);
    }
    setIsLoading(false);
  };

  const fetchProducts = async () => {
    if (wishlistItems.length === 0) {
      setLoadingProducts(false);
      return;
    }

    setLoadingProducts(true);
    const productMap = new Map<string, ShopifyProduct["node"]>();

    await Promise.all(
      wishlistItems.map(async (item) => {
        try {
          const response = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, {
            handle: item.product_handle,
          });
          if (response?.data?.productByHandle) {
            productMap.set(item.product_handle, response.data.productByHandle);
          }
        } catch (err) {
          console.error(`Error fetching product ${item.product_handle}:`, err);
        }
      })
    );

    setProducts(productMap);
    setLoadingProducts(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      fetchProducts();
    }
  }, [isLoading, wishlistItems]);

  const handleRemove = async (itemId: string) => {
    const { error } = await supabase
      .from("wishlist_items")
      .delete()
      .eq("id", itemId);

    if (error) {
      toast.error("Fehler beim Entfernen");
    } else {
      toast.success("Aus Wunschliste entfernt");
      setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
    }
  };

  const handleAddToCart = async (item: WishlistItem) => {
    const product = products.get(item.product_handle);
    if (!product) return;

    const variant = product.variants.edges[0]?.node;
    if (!variant) return;

    await addItem({
      product: { node: product } as ShopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    toast.success("Zum Warenkorb hinzugefügt", {
      description: product.title,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meine Wunschliste</CardTitle>
      </CardHeader>
      <CardContent>
        {wishlistItems.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Deine Wunschliste ist leer</h3>
            <p className="text-muted-foreground mb-4">
              Stöbere durch unsere Produkte und füge deine Favoriten hinzu
            </p>
            <Link to="/produkte">
              <Button>Produkte entdecken</Button>
            </Link>
          </div>
        ) : loadingProducts ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistItems.map((item) => {
              const product = products.get(item.product_handle);
              if (!product) return null;

              const image = product.images.edges[0]?.node;
              const price = product.priceRange.minVariantPrice;

              return (
                <div
                  key={item.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link to={`/produkt/${product.handle}`}>
                    <div className="aspect-square bg-secondary/10">
                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          Kein Bild
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/produkt/${product.handle}`}>
                      <h4 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
                        {product.title}
                      </h4>
                    </Link>
                    <p className="text-lg font-bold text-primary mt-2">
                      {parseFloat(price.amount).toFixed(2)} {price.currencyCode}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Kaufen
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemove(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
