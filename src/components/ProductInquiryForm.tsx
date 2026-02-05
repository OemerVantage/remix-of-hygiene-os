import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name ist erforderlich" })
    .max(100, { message: "Name darf maximal 100 Zeichen haben" }),
  email: z
    .string()
    .trim()
    .email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein" })
    .max(255, { message: "E-Mail darf maximal 255 Zeichen haben" }),
  phone: z
    .string()
    .trim()
    .max(30, { message: "Telefonnummer darf maximal 30 Zeichen haben" })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(1, { message: "Nachricht ist erforderlich" })
    .max(2000, { message: "Nachricht darf maximal 2000 Zeichen haben" }),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface ProductInquiryFormProps {
  productTitle: string;
  productSku?: string;
}

export const ProductInquiryForm = ({ productTitle, productSku }: ProductInquiryFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: `Ich interessiere mich für: ${productTitle}${productSku ? ` (Art.-Nr.: ${productSku})` : ""}\n\n`,
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);

    try {
      const productReference = productSku 
        ? `${productTitle} (${productSku})`
        : productTitle;

      const { error } = await supabase.from("contact_submissions").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
        product_reference: productReference,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Anfrage gesendet", {
        description: "Wir werden uns schnellstmöglich bei Ihnen melden.",
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Fehler beim Senden", {
        description: "Bitte versuchen Sie es später erneut.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="py-12 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Vielen Dank für Ihre Anfrage!</h3>
            <p className="text-muted-foreground">
              Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.
            </p>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={() => setIsSuccess(false)}
            >
              Neue Anfrage stellen
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 border-t bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Anfrage zu diesem Produkt</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Haben Sie Fragen zu <span className="font-medium text-foreground">{productTitle}</span>? 
            Wir helfen Ihnen gerne weiter.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ihr Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="ihre@email.de" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon (optional)</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+49 123 456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nachricht *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ihre Anfrage..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Anfrage senden
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
