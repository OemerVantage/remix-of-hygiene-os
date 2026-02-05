import { useParams, Link, Navigate } from "react-router-dom";
import { guides } from "@/data/guides";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Linkedin, Twitter, Facebook, Bookmark } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function GuideDetail() {
  const { handle } = useParams();
  const guide = guides.find((g) => g.slug === handle);
  const relatedGuides = guides.filter((g) => g.id !== guide?.id).slice(0, 3);

  if (!guide) {
    return <Navigate to="/ratgeber" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        {/* Article Header */}
        <article className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12">
            <Link
              to="/ratgeber"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zum Ratgeber
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {guide.category}
              </span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{guide.readTime} Lesezeit</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {guide.title}
            </h1>

            <p className="text-xl text-muted-foreground">
              {guide.excerpt}
            </p>

            {/* Author / Meta Block */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  H
                </div>
                <div>
                  <p className="font-semibold text-foreground">Hygiswiss Redaktion</p>
                  <p className="text-sm text-muted-foreground">Experten für professionelle Hygiene</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bookmark className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden">
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
              <ReactMarkdown>{guide.content || ""}</ReactMarkdown>
            </div>

            {/* Share Footer */}
            <div className="mt-12 pt-8 border-t border-border">
              <h4 className="font-semibold text-foreground mb-4">Artikel teilen</h4>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Twitter className="w-4 h-4 mr-2" /> Twitter
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Facebook className="w-4 h-4 mr-2" /> Facebook
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="container mx-auto px-4 mt-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8">Das könnte Sie auch interessieren</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedGuides.map((g) => (
                <Link
                  key={g.id}
                  to={`/ratgeber/${g.slug}`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={g.image}
                      alt={g.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
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
