import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Plus, MapPin, Trash2, Star, Edit } from "lucide-react";

interface Address {
  id: string;
  label: string;
  first_name: string;
  last_name: string;
  company: string | null;
  street: string;
  postal_code: string;
  city: string;
  country: string;
  is_default: boolean;
}

const emptyAddress: Omit<Address, "id"> = {
  label: "Zuhause",
  first_name: "",
  last_name: "",
  company: null,
  street: "",
  postal_code: "",
  city: "",
  country: "Deutschland",
  is_default: false,
};

export function AddressBook() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Omit<Address, "id">>(emptyAddress);

  const fetchAddresses = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false });

    if (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Adressen konnten nicht geladen werden");
    } else {
      setAddresses(data as Address[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  const handleOpenDialog = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        label: address.label,
        first_name: address.first_name,
        last_name: address.last_name,
        company: address.company,
        street: address.street,
        postal_code: address.postal_code,
        city: address.city,
        country: address.country,
        is_default: address.is_default,
      });
    } else {
      setEditingAddress(null);
      setFormData({ ...emptyAddress, is_default: addresses.length === 0 });
    }
    setDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);

    try {
      if (formData.is_default) {
        // Remove default from other addresses
        await supabase
          .from("addresses")
          .update({ is_default: false })
          .eq("user_id", user.id);
      }

      if (editingAddress) {
        const { error } = await supabase
          .from("addresses")
          .update(formData)
          .eq("id", editingAddress.id);

        if (error) throw error;
        toast.success("Adresse aktualisiert");
      } else {
        const { error } = await supabase
          .from("addresses")
          .insert({ ...formData, user_id: user.id });

        if (error) throw error;
        toast.success("Adresse hinzugefügt");
      }

      setDialogOpen(false);
      fetchAddresses();
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Fehler beim Speichern");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (addressId: string) => {
    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", addressId);

    if (error) {
      toast.error("Fehler beim Löschen");
    } else {
      toast.success("Adresse gelöscht");
      fetchAddresses();
    }
  };

  const handleSetDefault = async (addressId: string) => {
    if (!user) return;

    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", user.id);

    await supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", addressId);

    toast.success("Standardadresse geändert");
    fetchAddresses();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Lieferadressen</CardTitle>
            <CardDescription>Verwalte deine Lieferadressen</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Neue Adresse
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingAddress ? "Adresse bearbeiten" : "Neue Adresse"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="label">Bezeichnung</Label>
                  <Input
                    id="label"
                    placeholder="z.B. Zuhause, Büro"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">Vorname</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Nachname</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Firma (optional)</Label>
                  <Input
                    id="company"
                    value={formData.company || ""}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value || null })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Straße & Hausnummer</Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postal_code">PLZ</Label>
                    <Input
                      id="postal_code"
                      value={formData.postal_code}
                      onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Stadt</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Land</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_default"
                    checked={formData.is_default}
                    onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="is_default" className="cursor-pointer">
                    Als Standardadresse festlegen
                  </Label>
                </div>
                <Button type="submit" className="w-full" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Speichern...
                    </>
                  ) : (
                    "Speichern"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {addresses.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Keine Adressen gespeichert</h3>
              <p className="text-muted-foreground">
                Füge deine erste Lieferadresse hinzu
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`border rounded-lg p-4 relative ${
                    address.is_default ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  {address.is_default && (
                    <Badge className="absolute top-2 right-2">
                      <Star className="h-3 w-3 mr-1" />
                      Standard
                    </Badge>
                  )}
                  <h4 className="font-semibold mb-2">{address.label}</h4>
                  <p className="text-sm text-muted-foreground">
                    {address.first_name} {address.last_name}
                    {address.company && <><br />{address.company}</>}
                    <br />
                    {address.street}
                    <br />
                    {address.postal_code} {address.city}
                    <br />
                    {address.country}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(address)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Bearbeiten
                    </Button>
                    {!address.is_default && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
                      >
                        <Star className="h-3 w-3 mr-1" />
                        Standard
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(address.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Helper Badge component for this file
function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground ${className}`}>
      {children}
    </span>
  );
}
