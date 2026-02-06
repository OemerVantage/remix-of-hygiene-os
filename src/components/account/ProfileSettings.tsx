import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

export function ProfileSettings() {
  const { profile, updateProfile } = useAuth();
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [company, setCompany] = useState(profile?.company || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const displayName = `${firstName} ${lastName}`.trim() || null;

    const { error } = await updateProfile({
      first_name: firstName || null,
      last_name: lastName || null,
      company: company || null,
      phone: phone || null,
      display_name: displayName,
    });

    if (error) {
      toast.error("Fehler beim Speichern", {
        description: error.message,
      });
    } else {
      toast.success("Profil aktualisiert");
    }

    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Persönliche Daten</CardTitle>
        <CardDescription>
          Aktualisiere deine Kontoinformationen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              type="email"
              value={profile?.email || ""}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Die E-Mail-Adresse kann nicht geändert werden
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Vorname</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Max"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nachname</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Mustermann"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Firma</Label>
            <Input
              id="company"
              type="text"
              placeholder="Firmenname (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+41 79 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Speichern...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Änderungen speichern
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
