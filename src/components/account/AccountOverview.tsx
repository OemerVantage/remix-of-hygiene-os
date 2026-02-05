import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Package, Heart, MapPin, LogOut, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AccountOverview() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const isApproved = profile?.is_approved ?? false;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="space-y-6">
      {/* Approval Status Banner */}
      {isApproved ? (
        <Alert className="border-primary/50 bg-primary/10">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertTitle>Konto aktiv</AlertTitle>
          <AlertDescription>
            Dein Konto ist freigegeben. Du kannst jetzt Bestellungen aufgeben.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="default" className="border-warning/50 bg-warning/10">
          <Clock className="h-4 w-4 text-warning" />
          <AlertTitle>Warte auf Freigabe</AlertTitle>
          <AlertDescription>
            Dein Konto wartet auf Freigabe durch unser Team. Du kannst Produkte ansehen und zum Warenkorb hinzufügen, aber noch nicht bestellen.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Willkommen{profile?.display_name ? `, ${profile.display_name}` : ""}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Eingeloggt als: <span className="font-medium text-foreground">{user?.email}</span>
          </p>
          {profile?.created_at && (
            <p className="text-sm text-muted-foreground mt-2">
              Mitglied seit: {new Date(profile.created_at).toLocaleDateString("de-DE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => {}}>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Bestellungen</h3>
              <p className="text-sm text-muted-foreground">Deine Bestellhistorie</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => {}}>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Wunschliste</h3>
              <p className="text-sm text-muted-foreground">Gemerkte Produkte</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => {}}>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Adressen</h3>
              <p className="text-sm text-muted-foreground">Lieferadressen verwalten</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Abmelden
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
