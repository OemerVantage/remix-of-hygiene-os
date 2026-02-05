import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productHandle: string;
  variantId?: string;
  className?: string;
  size?: "sm" | "default" | "lg" | "icon";
}

export function WishlistButton({ productHandle, variantId, className, size = "icon" }: WishlistButtonProps) {
  const { user } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkWishlist = useCallback(async () => {
    if (!user) {
      // Check localStorage for non-logged-in users
      const localWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setIsInWishlist(localWishlist.includes(productHandle));
      return;
    }

    const { data } = await supabase
      .from("wishlist_items")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_handle", productHandle)
      .maybeSingle();

    setIsInWishlist(!!data);
  }, [user, productHandle]);

  useEffect(() => {
    checkWishlist();
  }, [checkWishlist]);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      // Handle localStorage for non-logged-in users
      const localWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      
      if (isInWishlist) {
        const updated = localWishlist.filter((h: string) => h !== productHandle);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        setIsInWishlist(false);
        toast.success("Von Wunschliste entfernt");
      } else {
        localWishlist.push(productHandle);
        localStorage.setItem("wishlist", JSON.stringify(localWishlist));
        setIsInWishlist(true);
        toast.success("Zur Wunschliste hinzugefügt", {
          description: "Melde dich an, um deine Wunschliste zu speichern",
        });
      }
      return;
    }

    setIsLoading(true);

    try {
      if (isInWishlist) {
        const { error } = await supabase
          .from("wishlist_items")
          .delete()
          .eq("user_id", user.id)
          .eq("product_handle", productHandle);

        if (error) throw error;
        setIsInWishlist(false);
        toast.success("Von Wunschliste entfernt");
      } else {
        const { error } = await supabase
          .from("wishlist_items")
          .insert({
            user_id: user.id,
            product_handle: productHandle,
            variant_id: variantId || null,
          });

        if (error) throw error;
        setIsInWishlist(true);
        toast.success("Zur Wunschliste hinzugefügt");
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error("Fehler beim Aktualisieren der Wunschliste");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size={size}
      className={cn("hover:bg-primary/10", className)}
      onClick={toggleWishlist}
      disabled={isLoading}
      aria-label={isInWishlist ? "Von Wunschliste entfernen" : "Zur Wunschliste hinzufügen"}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          isInWishlist ? "fill-primary text-primary" : "text-muted-foreground"
        )}
      />
    </Button>
  );
}
