import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { ModulesSection } from "@/components/ModulesSection";
import { TrustSection } from "@/components/TrustSection";
import { GuidesSection } from "@/components/GuidesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SolutionsSection />
        <ModulesSection />
        <TrustSection />
        <GuidesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
