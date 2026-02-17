import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountOverview } from "@/components/account/AccountOverview";
import { OrderHistory } from "@/components/account/OrderHistory";
import { ProfileSettings } from "@/components/account/ProfileSettings";
import { AddressBook } from "@/components/account/AddressBook";
import { Wishlist } from "@/components/account/Wishlist";
import { User, Package, Settings, MapPin, Heart } from "lucide-react";

export default function Account() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-32 pb-16">
          <div className="container-hygiswiss">
            <h1 className="text-heading-xl font-bold mb-8">Mein Konto</h1>
            
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2">
                <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Übersicht</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2 py-3">
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">Bestellungen</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2 py-3">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Profil</span>
                </TabsTrigger>
                <TabsTrigger value="addresses" className="flex items-center gap-2 py-3">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">Adressen</span>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center gap-2 py-3">
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Wunschliste</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <AccountOverview />
              </TabsContent>
              <TabsContent value="orders">
                <OrderHistory />
              </TabsContent>
              <TabsContent value="profile">
                <ProfileSettings />
              </TabsContent>
              <TabsContent value="addresses">
                <AddressBook />
              </TabsContent>
              <TabsContent value="wishlist">
                <Wishlist />
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
