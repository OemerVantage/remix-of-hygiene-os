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
import { Send, Loader2, MapPin, Phone, Mail, Clock } from "lucide-react";

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

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "Musterstrasse 123, 8001 Zürich",
  },
  {
    icon: Phone,
    title: "Telefon",
    content: "+41 44 123 45 67",
  },
  {
    icon: Mail,
    title: "E-Mail",
    content: "info@hygiscout.ch",
  },
  {
    icon: Clock,
    title: "Öffnungszeiten",
    content: "Mo-Fr: 9:00 - 18:00 Uhr",
  },
];

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
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Kontakt
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Wir freuen uns auf
            <span className="text-primary block mt-2">Ihre Nachricht</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Haben Sie Fragen zu unseren Produkten oder Dienstleistungen? 
            Unser Team steht Ihnen gerne zur Verfügung.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-3xl p-8 border border-border shadow-lg animate-fade-in">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                Kontaktinformationen
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.title}</p>
                      <p className="text-foreground font-medium">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 text-primary-foreground animate-fade-in">
              <h4 className="font-bold text-lg mb-2">Schnelle Antwort garantiert</h4>
              <p className="text-primary-foreground/80 text-sm">
                Wir antworten innerhalb von 24 Stunden auf alle Anfragen.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 animate-fade-in">
            <div className="bg-card rounded-3xl shadow-xl p-8 md:p-10 border border-border relative overflow-hidden">
              {/* Form decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            Name <span className="text-primary">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ihr vollständiger Name"
                              className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary focus:ring-primary/20 transition-all"
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
                          <FormLabel className="text-foreground font-medium">
                            E-Mail <span className="text-primary">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="ihre@email.ch"
                              className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary focus:ring-primary/20 transition-all"
                              {...field}
                              disabled={isSubmitting}
                            />
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
                        <FormLabel className="text-foreground font-medium">
                          Telefon <span className="text-muted-foreground text-sm">(optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+41 44 123 45 67"
                            className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary focus:ring-primary/20 transition-all"
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
                        <FormLabel className="text-foreground font-medium">
                          Nachricht <span className="text-primary">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Wie können wir Ihnen helfen? Beschreiben Sie Ihr Anliegen..."
                            className="min-h-[160px] rounded-xl border-border/50 bg-background/50 focus:border-primary focus:ring-primary/20 transition-all resize-none"
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
                    className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Nachricht senden
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Mit dem Absenden stimmen Sie unserer{" "}
                    <a href="#" className="text-primary hover:underline">
                      Datenschutzerklärung
                    </a>{" "}
                    zu.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-16 max-w-6xl mx-auto animate-fade-in">
          <div className="bg-card rounded-3xl p-4 border border-border shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.4089465855336!2d13.388860776883048!3d52.51704327981089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sBrandenburger%20Tor!5e0!3m2!1sde!2sde!4v1702900000000!5m2!1sde!2sde"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "1.25rem" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Standort auf Google Maps"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Besuchen Sie uns vor Ort – wir freuen uns auf Sie!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
