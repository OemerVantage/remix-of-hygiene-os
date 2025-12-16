import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
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
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

const contactSchema = z.object({
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

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
      });

      if (error) throw error;

      toast.success("Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.");
      form.reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Es gab ein Problem beim Senden. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Kontaktieren Sie uns
            </h2>
            <p className="text-muted-foreground text-lg">
              Haben Sie Fragen? Wir sind für Sie da und freuen uns auf Ihre Nachricht.
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ihr vollständiger Name"
                          {...field}
                          disabled={isSubmitting}
                        />
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
                        <Input
                          type="email"
                          placeholder="ihre@email.de"
                          {...field}
                          disabled={isSubmitting}
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
                      <FormLabel>Telefon (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+49 123 456789"
                          {...field}
                          disabled={isSubmitting}
                        />
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
                          placeholder="Wie können wir Ihnen helfen?"
                          className="min-h-[150px] resize-none"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Nachricht senden
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
