import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  company: z
    .string()
    .trim()
    .max(150, { message: "Firmenname darf maximal 150 Zeichen haben" })
    .optional()
    .or(z.literal("")),
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
  postalCode: z
    .string()
    .trim()
    .max(10, { message: "PLZ darf maximal 10 Zeichen haben" })
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .trim()
    .max(100, { message: "Ort darf maximal 100 Zeichen haben" })
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
      company: "",
      email: "",
      phone: "",
      postalCode: "",
      city: "",
      message: `Ich interessiere mich für: ${productTitle}${productSku ? ` (Art.-Nr.: ${productSku})` : ""}\n\n`,
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);

    try {
      const productReference = productSku 
        ? `${productTitle} (${productSku})`
        : productTitle;

      // Build contact info parts for the message
      const contactParts: string[] = [];
      if (data.company) contactParts.push(`Firma: ${data.company}`);
      if (data.postalCode || data.city) {
        contactParts.push(`Ort: ${[data.postalCode, data.city].filter(Boolean).join(" ")}`);
      }

      // Prepend contact info to message if available
      const fullMessage = contactParts.length > 0
        ? `${contactParts.join("\n")}\n\n${data.message}`
        : data.message;

      const { error } = await supabase.from("contact_submissions").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: fullMessage,
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
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-card rounded-3xl border shadow-xl p-8 md:p-12 overflow-hidden">
              {/* Decorative blur */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              
              <div className="relative text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Vielen Dank für Ihre Anfrage!</h3>
                <p className="text-muted-foreground text-lg mb-8">
                  Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.
                </p>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="rounded-xl"
                  onClick={() => setIsSuccess(false)}
                >
                  Neue Anfrage stellen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium">
              Produktanfrage
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Fragen zu diesem Produkt?
            </h2>
            <p className="text-muted-foreground text-lg">
              Wir beraten Sie gerne zu{" "}
              <span className="font-semibold text-foreground">{productTitle}</span>
            </p>
          </div>

          {/* Form Card */}
          <div className="relative bg-card rounded-3xl border shadow-xl p-6 md:p-10 overflow-hidden">
            {/* Decorative blur */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-5">
                {/* Name and Company */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Name <span className="text-primary">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ihr Name" 
                            className="h-12 rounded-xl border-border/60 focus:border-primary transition-colors"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Firma <span className="text-muted-foreground font-normal">(optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Firmenname" 
                            className="h-12 rounded-xl border-border/60 focus:border-primary transition-colors"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          E-Mail <span className="text-primary">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="ihre@email.de" 
                            className="h-12 rounded-xl border-border/60 focus:border-primary transition-colors"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Telefon <span className="text-muted-foreground font-normal">(optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="+49 123 456789" 
                            className="h-12 rounded-xl border-border/60 focus:border-primary transition-colors"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* PLZ and City */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          PLZ <span className="text-muted-foreground font-normal">(optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="12345" 
                            className="h-12 rounded-xl border-border/60 focus:border-primary transition-colors"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Ort <span className="text-muted-foreground font-normal">(optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Stadt" 
                            className="h-12 rounded-xl border-border/60 focus:border-primary transition-colors"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Nachricht <span className="text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ihre Anfrage..."
                          className="min-h-[140px] rounded-xl border-border/60 focus:border-primary transition-colors resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    size="lg"
                    className="w-full sm:w-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Anfrage senden
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Footer hint */}
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Wir antworten in der Regel innerhalb von 24 Stunden</span>
          </div>
        </div>
      </div>
    </section>
  );
};
