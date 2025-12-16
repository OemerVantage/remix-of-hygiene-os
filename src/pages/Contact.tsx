import { Header } from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
