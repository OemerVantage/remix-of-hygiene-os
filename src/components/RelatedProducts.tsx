import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

interface RelatedProductsProps {
  handles: string[];
}

export const RelatedProducts = ({ handles }: RelatedProductsProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (handles.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const productPromises = handles.map(async (handle) => {
          const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle: handle.trim() });
          if (data?.data?.productByHandle) {
            return { node: data.data.productByHandle } as ShopifyProduct;
          }
          return null;
        });

        const results = await Promise.all(productPromises);
        const validProducts = results.filter((p): p is ShopifyProduct => p !== null);
        setProducts(validProducts);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [handles]);

  if (handles.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <section className="py-12 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Dazu passende Produkte</h2>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Dazu passende Produkte</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
