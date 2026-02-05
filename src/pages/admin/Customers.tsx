import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  XCircle, 
  Search, 
  Users, 
  Clock, 
  Loader2,
  Mail,
  Calendar
} from "lucide-react";

interface Customer {
  id: string;
  user_id: string;
  email: string;
  display_name: string | null;
  phone: string | null;
  is_approved: boolean;
  created_at: string;
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (err) {
      console.error("Error fetching customers:", err);
      toast({
        title: "Fehler",
        description: "Kunden konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const toggleApproval = async (customer: Customer) => {
    setUpdatingId(customer.id);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_approved: !customer.is_approved })
        .eq("id", customer.id);

      if (error) throw error;

      setCustomers(prev =>
        prev.map(c =>
          c.id === customer.id ? { ...c, is_approved: !c.is_approved } : c
        )
      );

      toast({
        title: customer.is_approved ? "Kunde gesperrt" : "Kunde freigegeben",
        description: `${customer.email} wurde ${customer.is_approved ? "gesperrt" : "freigegeben"}.`,
      });
    } catch (err) {
      console.error("Error updating customer:", err);
      toast({
        title: "Fehler",
        description: "Status konnte nicht geändert werden.",
        variant: "destructive",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredCustomers = customers.filter(
    c =>
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  const pendingCustomers = filteredCustomers.filter(c => !c.is_approved);
  const approvedCustomers = filteredCustomers.filter(c => c.is_approved);

  const CustomerCard = ({ customer }: { customer: Customer }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">
                {customer.display_name || "Kein Name"}
              </h3>
              <Badge variant={customer.is_approved ? "default" : "secondary"}>
                {customer.is_approved ? "Freigegeben" : "Wartend"}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="truncate">{customer.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Calendar className="h-4 w-4" />
              <span>
                Registriert: {new Date(customer.created_at).toLocaleDateString("de-DE")}
              </span>
            </div>
          </div>
          <Button
            variant={customer.is_approved ? "outline" : "default"}
            size="sm"
            onClick={() => toggleApproval(customer)}
            disabled={updatingId === customer.id}
            className="ml-4"
          >
            {updatingId === customer.id ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : customer.is_approved ? (
              <>
                <XCircle className="h-4 w-4 mr-2" />
                Sperren
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Freigeben
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Kundenverwaltung</h1>
          <p className="text-muted-foreground">
            Verwalte Kundenfreigaben für den Shop
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Gesamt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{customers.length}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Wartend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-warning" />
                <span className="text-2xl font-bold">{pendingCustomers.length}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Freigegeben
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{approvedCustomers.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Nach E-Mail oder Name suchen..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="pending">
            <TabsList className="mb-4">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Wartend ({pendingCustomers.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Freigegeben ({approvedCustomers.length})
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Alle ({filteredCustomers.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              {pendingCustomers.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Keine wartenden Kunden
                  </CardContent>
                </Card>
              ) : (
                pendingCustomers.map(c => <CustomerCard key={c.id} customer={c} />)
              )}
            </TabsContent>

            <TabsContent value="approved">
              {approvedCustomers.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Keine freigegebenen Kunden
                  </CardContent>
                </Card>
              ) : (
                approvedCustomers.map(c => <CustomerCard key={c.id} customer={c} />)
              )}
            </TabsContent>

            <TabsContent value="all">
              {filteredCustomers.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Keine Kunden gefunden
                  </CardContent>
                </Card>
              ) : (
                filteredCustomers.map(c => <CustomerCard key={c.id} customer={c} />)
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>
      <Footer />
    </div>
  );
}
