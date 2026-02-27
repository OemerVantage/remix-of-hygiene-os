import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User, Building2, Phone, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { createShopifyCustomer } from "@/lib/shopify";

export default function Register() {
  // Personal data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Shipping address
  const [shippingStreet, setShippingStreet] = useState("");
  const [shippingPostalCode, setShippingPostalCode] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingCountry] = useState("Schweiz");
  
  // Billing address
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [billingStreet, setBillingStreet] = useState("");
  const [billingPostalCode, setBillingPostalCode] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingCountry] = useState("Schweiz");
  
  // Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Bitte gib deinen Vor- und Nachnamen ein");
      return;
    }

    if (!phone.trim()) {
      toast.error("Bitte gib deine Telefonnummer ein");
      return;
    }

    if (!shippingStreet.trim() || !shippingPostalCode.trim() || !shippingCity.trim()) {
      toast.error("Bitte fülle die Lieferadresse vollständig aus");
      return;
    }

    if (!sameAsShipping && (!billingStreet.trim() || !billingPostalCode.trim() || !billingCity.trim())) {
      toast.error("Bitte fülle die Rechnungsadresse vollständig aus");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwörter stimmen nicht überein");
      return;
    }

    if (password.length < 6) {
      toast.error("Das Passwort muss mindestens 6 Zeichen lang sein");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Sign up user
      const { error } = await signUp(email, password);

      if (error) {
        toast.error("Registrierung fehlgeschlagen", {
          description: error.message,
        });
        setIsLoading(false);
        return;
      }

      // 2. Get the newly created user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Fehler beim Erstellen des Kontos");
        setIsLoading(false);
        return;
      }

      // 3. Update profile with personal data
      await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          company: company || null,
          phone: phone,
          display_name: `${firstName} ${lastName}`,
        })
        .eq("user_id", user.id);

      // 4. Create shipping address
      await supabase
        .from("addresses")
        .insert({
          user_id: user.id,
          first_name: firstName,
          last_name: lastName,
          company: company || null,
          street: shippingStreet,
          postal_code: shippingPostalCode,
          city: shippingCity,
          country: shippingCountry,
          address_type: "shipping",
          label: "Lieferadresse",
          is_default: true,
        });

      // 5. Create billing address if different
      if (!sameAsShipping) {
        await supabase
          .from("addresses")
          .insert({
            user_id: user.id,
            first_name: firstName,
            last_name: lastName,
            company: company || null,
            street: billingStreet,
            postal_code: billingPostalCode,
            city: billingCity,
            country: billingCountry,
            address_type: "billing",
            label: "Rechnungsadresse",
            is_default: false,
          });
      } else {
        // Create billing address same as shipping
        await supabase
          .from("addresses")
          .insert({
            user_id: user.id,
            first_name: firstName,
            last_name: lastName,
            company: company || null,
            street: shippingStreet,
            postal_code: shippingPostalCode,
            city: shippingCity,
            country: shippingCountry,
            address_type: "billing",
            label: "Rechnungsadresse",
            is_default: false,
          });
      }

      // 6. Create Shopify customer in background
      createShopifyCustomer(email, password).catch(console.error);

      // 7. Notify owner about new registration
      supabase.functions.invoke("notify-new-registration", {
        body: { firstName, lastName, email, company, phone },
      }).catch(console.error);

      toast.success("Willkommen bei HYGISWISS!", {
        description: "Dein Konto wurde erfolgreich erstellt.",
      });
      navigate("/konto");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Ein Fehler ist aufgetreten");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4 pt-32">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Konto erstellen</CardTitle>
            <CardDescription>
              Registriere dich für ein neues Konto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Personal Data */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Persönliche Daten
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Vorname *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Max"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nachname *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Mustermann"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Firma (optional)</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      type="text"
                      placeholder="Firmenname"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="deine@email.ch"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+41 79 123 45 67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Lieferadresse
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="shippingStreet">Strasse & Hausnummer *</Label>
                  <Input
                    id="shippingStreet"
                    type="text"
                    placeholder="Musterstrasse 123"
                    value={shippingStreet}
                    onChange={(e) => setShippingStreet(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shippingPostalCode">PLZ *</Label>
                    <Input
                      id="shippingPostalCode"
                      type="text"
                      placeholder="8000"
                      value={shippingPostalCode}
                      onChange={(e) => setShippingPostalCode(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shippingCity">Ort *</Label>
                    <Input
                      id="shippingCity"
                      type="text"
                      placeholder="Zürich"
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingCountry">Land</Label>
                  <Input
                    id="shippingCountry"
                    type="text"
                    value={shippingCountry}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              {/* Section 3: Billing Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Rechnungsadresse
                </h3>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sameAsShipping"
                    checked={sameAsShipping}
                    onCheckedChange={(checked) => setSameAsShipping(checked === true)}
                  />
                  <Label htmlFor="sameAsShipping" className="cursor-pointer">
                    Rechnungsadresse entspricht der Lieferadresse
                  </Label>
                </div>

                {!sameAsShipping && (
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="billingStreet">Strasse & Hausnummer *</Label>
                      <Input
                        id="billingStreet"
                        type="text"
                        placeholder="Musterstrasse 123"
                        value={billingStreet}
                        onChange={(e) => setBillingStreet(e.target.value)}
                        required={!sameAsShipping}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingPostalCode">PLZ *</Label>
                        <Input
                          id="billingPostalCode"
                          type="text"
                          placeholder="8000"
                          value={billingPostalCode}
                          onChange={(e) => setBillingPostalCode(e.target.value)}
                          required={!sameAsShipping}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingCity">Ort *</Label>
                        <Input
                          id="billingCity"
                          type="text"
                          placeholder="Zürich"
                          value={billingCity}
                          onChange={(e) => setBillingCity(e.target.value)}
                          required={!sameAsShipping}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billingCountry">Land</Label>
                      <Input
                        id="billingCountry"
                        type="text"
                        value={billingCountry}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Section 4: Password */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Passwort
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="password">Passwort *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Mindestens 6 Zeichen"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Passwort bestätigen *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Passwort wiederholen"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrieren...
                  </>
                ) : (
                  "Konto erstellen"
                )}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              Bereits ein Konto?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Jetzt anmelden
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
