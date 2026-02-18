import { useParams, Link, Navigate } from "react-router-dom";
import { guides } from "@/data/guides";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, Linkedin, Twitter, Facebook, Bookmark, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

export default function GuideDetail() {
  const { handle } = useParams();
  const guide = guides.find((g) => g.slug === handle);
  const relatedGuides = guides.filter((g) => g.id !== guide?.id).slice(0, 3);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!guide) {
    return <Navigate to="/ratgeber" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={readProgress} className="h-1 rounded-none bg-transparent" />
      </div>

      <main className="pt-20 pb-20">
        {/* Hero Image with Overlay */}
        <div className="relative w-full h-[50vh] min-h-[400px] max-h-[560px] overflow-hidden">
          <img
            src={guide.image}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-10 max-w-4xl">
              <Link
                to="/ratgeber"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück zum Ratgeber
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-primary/90 text-primary-foreground border-0">
                  {guide.category}
                </Badge>
                <div className="flex items-center gap-1.5 text-white/80">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{guide.readTime} Lesezeit</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {guide.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Excerpt + Author */}
        <div className="container mx-auto px-4 max-w-3xl mt-10">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {guide.excerpt}
          </p>

          <Card className="p-5 bg-muted/50 border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  H
                </div>
                <div>
                  <p className="font-semibold text-foreground">Hygiswiss Redaktion</p>
                  <p className="text-sm text-muted-foreground">Experten für professionelle Hygiene</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bookmark className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 max-w-3xl mt-12">
          <div className="prose prose-lg max-w-none
            prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-3
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-5
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
            prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
            prose-li:text-muted-foreground prose-li:mb-2 prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
          ">
            <ReactMarkdown>{guide.content || ""}</ReactMarkdown>
          </div>

          {/* Share Section */}
          <div className="mt-14 pt-8 border-t border-border">
            <h4 className="font-semibold text-foreground mb-4">Artikel teilen</h4>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
              </Button>
              <Button variant="outline" size="sm" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4 mr-2" /> Twitter
              </Button>
              <Button variant="outline" size="sm" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-4 h-4 mr-2" /> Facebook
              </Button>
            </div>
          </div>

          {/* CTA Box */}
          <Card className="mt-12 p-8 bg-primary/5 border-primary/20 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">Mehr Fachwissen entdecken</h3>
            <p className="text-muted-foreground mb-6">Entdecken Sie weitere Ratgeber-Artikel rund um professionelle Hygiene.</p>
            <Button asChild>
              <Link to="/ratgeber">
                Alle Ratgeber ansehen <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </Card>
        </div>

        {/* Related Articles */}
        <section className="container mx-auto px-4 mt-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8">Das könnte Sie auch interessieren</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedGuides.map((g) => (
                <Link
                  key={g.id}
                  to={`/ratgeber/${g.slug}`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={g.image}
                      alt={g.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
                        <Clock className="w-3 h-3 mr-1" /> {g.readTime}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-primary text-sm font-medium mb-2">{g.category}</p>
                    <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {g.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mt-2">{g.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
