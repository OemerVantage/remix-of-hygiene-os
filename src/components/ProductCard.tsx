import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  
  const { node } = product;
  const selectedVariant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!selectedVariant) return;
    
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    });
    
    toast.success("Zum Warenkorb hinzugefügt", {
      description: node.title,
    });
  };

  return (
    <Link to={`/produkt/${node.handle}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="aspect-square overflow-hidden bg-secondary/10">
          {image ? (
            <img 
              src={image.url} 
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Kein Bild
            </div>
          )}
        </div>
        <CardContent className="p-4 flex-1">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2">{node.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{node.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {parseFloat(price.amount).toFixed(2)} {price.currencyCode}
          </span>
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            disabled={isLoading || !selectedVariant?.availableForSale}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Kaufen
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
