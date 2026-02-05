import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/AdminRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Guides from "./pages/Guides";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Account from "./pages/Account";
import AdminCustomers from "./pages/admin/Customers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/ueber-uns" element={<About />} />
      <Route path="/branchenloesungen" element={<Solutions />} />
      <Route path="/produkte" element={<Products />} />
      <Route path="/produkt/:handle" element={<ProductDetail />} />
      <Route path="/ratgeber" element={<Guides />} />
      <Route path="/kontakt" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrieren" element={<Register />} />
      <Route path="/passwort-vergessen" element={<ForgotPassword />} />
      <Route path="/konto" element={<ProtectedRoute><Account /></ProtectedRoute>} />
      
      {/* Admin Routes */}
      <Route path="/admin/kunden" element={<AdminRoute><AdminCustomers /></AdminRoute>} />
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
