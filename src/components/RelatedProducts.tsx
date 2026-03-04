import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, PRODUCTS_QUERY, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

interface RelatedProductsProps {
  handles: string[];
  systemGroup?: string | null;
  productType?: string;
  currentHandle?: string;
}

export const RelatedProducts = ({ handles, systemGroup, productType, currentHandle }: RelatedProductsProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchByHandles = async () => {
      const productPromises = handles.map(async (handle) => {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle: handle.trim() });
        if (data?.data?.productByHandle) {
          return { node: data.data.productByHandle } as ShopifyProduct;
        }
        return null;
      });

      const results = await Promise.all(productPromises);
      return results.filter((p): p is ShopifyProduct => p !== null);
    };

    const fetchBySystemGroup = async () => {
      if (!systemGroup) return [];

      // Fetch products and filter by matching system_group metafield
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 50 });
      if (!data?.data?.products?.edges) return [];

      return (data.data.products.edges as ShopifyProduct[]).filter((p) => {
        // Exclude current product
        if (p.node.handle === currentHandle) return false;
        // Must have a different productType (Spender ↔ Papier)
        if (productType && p.node.productType === productType) return false;
        // Must share the same system_group
        const sg = p.node.metafields?.find(m => m?.key === "system_group");
        return sg?.value === systemGroup;
      }).slice(0, 4);
    };

    const fetchProducts = async () => {
      try {
        let result: ShopifyProduct[] = [];

        if (handles.length > 0) {
          // Priority: manual metafield handles
          result = await fetchByHandles();
        } else if (systemGroup) {
          // Fallback: automatic matching by system_group
          result = await fetchBySystemGroup();
        }

        setProducts(result);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [handles, systemGroup, productType, currentHandle]);

  const hasSource = handles.length > 0 || !!systemGroup;

  if (!hasSource) {
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
