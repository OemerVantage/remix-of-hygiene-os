import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, ExternalLink } from "lucide-react";
import { getShopifyCustomerOrders, ShopifyOrder } from "@/lib/shopify";

export function OrderHistory() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState<ShopifyOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      if (!profile?.shopify_customer_token) {
        setIsLoading(false);
        return;
      }

      try {
        const customerOrders = await getShopifyCustomerOrders(profile.shopify_customer_token);
        setOrders(customerOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Bestellungen konnten nicht geladen werden");
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [profile?.shopify_customer_token]);

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "FULFILLED":
        return <Badge variant="default" className="bg-green-500">Versendet</Badge>;
      case "PARTIALLY_FULFILLED":
        return <Badge variant="secondary">Teilweise versendet</Badge>;
      case "UNFULFILLED":
        return <Badge variant="outline">In Bearbeitung</Badge>;
      default:
        return <Badge variant="outline">Unbekannt</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!profile?.shopify_customer_token) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Keine Bestellungen</h3>
          <p className="text-muted-foreground">
            Dein Konto ist noch nicht mit Shopify verknüpft. Bestellungen werden nach deinem ersten Einkauf hier angezeigt.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Noch keine Bestellungen</h3>
          <p className="text-muted-foreground">
            Du hast noch keine Bestellungen aufgegeben.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Bestellhistorie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">Bestellung #{order.orderNumber}</span>
                    {getStatusBadge(order.fulfillmentStatus)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(order.processedAt).toLocaleDateString("de-DE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                
                <div className="text-sm text-muted-foreground mb-3">
                  {order.lineItems.edges.map((item, index) => (
                    <span key={index}>
                      {item.node.quantity}x {item.node.title}
                      {index < order.lineItems.edges.length - 1 && ", "}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    {parseFloat(order.totalPrice.amount).toFixed(2)} {order.totalPrice.currencyCode}
                  </span>
                  {order.statusUrl && (
                    <a
                      href={order.statusUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      Details <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
