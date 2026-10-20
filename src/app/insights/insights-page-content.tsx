/**
 * FILE: src/app/insights/insights-page-content.tsx
 *
 * Ground-up reconstruction of Insights Directory following FinZave architecture:
 * - Massive Outfit hero.
 * - Featured article card with 7/5 split and `rounded-3xl` container.
 * - Interactive category filter pills + search input.
 * - 3-column article cards with 16/10 cover images.
 * - Bi-weekly strategy letter newsletter subscription card.
 * - Zero dark mode: clean light mode.
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Search, Mail } from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";
import { Button } from "../../components/button";
import { ButtonLink } from "../../components/button-link";
import { ImageWrapper } from "../../components/image-wrapper";
import { WordReveal } from "../../components/word-reveal";
import { Reveal } from "../../components/reveal";
import { HeroSupport } from "../../components/hero-reveal";
import { toast } from "sonner";
import { type Article as BlogPost } from "@/mock/articles";

interface InsightsPageContentProps {
  articles: BlogPost[];
}

export default function InsightsPageContent({ articles }: InsightsPageContentProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState("");

  const categories = Array.from(new Set(articles.map((a) => a.category).filter(Boolean))) as string[];
  const featuredArticle = articles.find((a) => a.featured);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.excerpt?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (article.category?.toLowerCase() || "").includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid work email address.");
      return;
    }
    toast.success("Thank you for subscribing to our strategy letters.");
    setEmail("");
  };

  return (
    <GlobalLayout>
      {/* 1. HERO */}
      <section className="min-h-[calc(100svh-72px)] sm:min-h-[calc(100vh-72px)] max-h-[950px] flex flex-col justify-center py-8 sm:py-12 md:py-16 lg:py-20 bg-white border-b border-[#e4e4e7] relative overflow-hidden">
        {/* Subtle Ambient Radial Glow Orb matching FinZave forensic spec */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] md:w-[800px] h-[500px] sm:h-[700px] md:h-[800px] bg-gradient-to-tr from-[#f4f4f5] to-white rounded-full blur-[100px] -z-10 opacity-60 pointer-events-none" 
          aria-hidden="true" 
        />

        <Container size="default" className="text-center flex flex-col items-center justify-center my-auto relative z-10 px-4 sm:px-6 md:px-8">
          <h1 className="text-[2.25rem] min-[380px]:text-[2.75rem] min-[440px]:text-[3.25rem] sm:text-6xl md:text-7xl lg:text-[6.25rem] xl:text-[7.25rem] font-bold tracking-tighter text-[#0a0a0a] leading-[0.95] mb-6 sm:mb-8 md:mb-10 max-w-5xl mx-auto">
            <WordReveal as="span" text="Practical guides" delayOffset={0} className="block min-[360px]:whitespace-nowrap" />
            <WordReveal as="span" text="for growing" delayOffset={160} className="block min-[360px]:whitespace-nowrap" />
            <WordReveal as="span" text="businesses." delayOffset={320} className="block min-[360px]:whitespace-nowrap" />
          </h1>

          <HeroSupport delayMs={300} className="w-full">
            <p className="text-sm sm:text-base md:text-lg text-[#52525b] font-normal max-w-xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-10">
              No confusing tech jargon. Just honest, practical advice on automating daily operations, choosing the right software, and scaling your company sustainably.
            </p>

            <div className="flex justify-center">
              <ButtonLink href="#articles" variant="primary" size="lg" className="w-auto px-7 sm:px-9 md:px-10 py-3.5 sm:py-4 rounded-full bg-[#0a0a0a] hover:bg-[#e11d48] text-white font-medium text-sm sm:text-base shadow-lg shadow-black/10 hover:shadow-red-500/20 transition-all duration-300">
                Explore Articles
              </ButtonLink>
            </div>
          </HeroSupport>
        </Container>
      </section>

      {/* 2. FEATURED ARTICLE (Clean Lined Layout - No Boxes) */}
      {featuredArticle && (
        <section className="py-20 md:py-28 bg-[#fafafa] border-b border-[#e4e4e7]">
          <Container size="default">
            <div className="border-t border-b border-[#e4e4e7] py-12 md:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
                <Reveal variant="slideLeft" className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#e4e4e7]">
                  <ImageWrapper
                    src={featuredArticle.featuredImage || ""}
                    alt={featuredArticle.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    containerClassName="w-full h-full border-none rounded-none"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </Reveal>

                <Reveal variant="slideRight" delay={1} className="lg:col-span-5 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">{featuredArticle.category}</span>
                    <span className="w-1 h-1 rounded-full bg-[#d4d4d8]" />
                    <span className="text-xs text-[#71717a] font-medium">{featuredArticle.readingTime} min read</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0a0a0a] tracking-tight leading-tight">
                    <Link href={`/insights/${featuredArticle.slug}`} className="hover:text-[#e11d48] transition-colors">
                      {featuredArticle.title}
                    </Link>
                  </h2>

                  <p className="text-base text-[#52525b] leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex items-center justify-between border-t border-[#e4e4e7] pt-6 mt-2">
                    <div>
                      <cite className="text-sm font-bold text-[#0a0a0a] not-italic block">
                        {featuredArticle.author}
                      </cite>
                      <span className="text-xs text-[#71717a]">{featuredArticle.authorRole}</span>
                    </div>

                    <ButtonLink href={`/insights/${featuredArticle.slug}`} variant="primary" size="sm" className="rounded-full px-5 py-2">
                      Read Guide <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </ButtonLink>
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 3. ARTICLES DIRECTORY (Clean Lined Layout - No Boxes) */}
      <section id="articles" className="py-24 md:py-36 bg-white border-b border-[#e4e4e7]">
        <Container size="default">
          {/* Filter Bar & Search */}
          <Reveal variant="slideLeft" className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">
                Filter by Category
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                    selectedCategory === null
                      ? "bg-[#0a0a0a] text-white"
                      : "bg-[#f4f4f5] text-[#71717a] hover:bg-[#e4e4e7]"
                  }`}
                >
                  All Topics
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                      selectedCategory === cat
                        ? "bg-[#0a0a0a] text-white"
                        : "bg-[#f4f4f5] text-[#71717a] hover:bg-[#e4e4e7]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-80 flex flex-col gap-2">
              <label htmlFor="search-input" className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">
                Search Articles
              </label>
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search practical guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#e4e4e7] bg-white text-sm text-[#0a0a0a] focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a] outline-none shadow-sm transition-all"
                />
                <Search className="w-4 h-4 text-[#71717a] absolute left-3.5 top-3.5" />
              </div>
            </div>
          </Reveal>

          {/* Clean Lined Article List */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 border-t border-b border-[#e4e4e7]">
              <p className="text-base text-[#71717a] mb-4">No guides found matching your search.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="border-t border-[#e4e4e7] divide-y divide-[#e4e4e7]">
              {filteredArticles.map((article, idx) => (
                <Reveal key={article.id} variant="fadeUp" delay={idx % 3 + 1}>
                  <div
                    className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start hover:bg-[#fafafa]/80 transition-colors px-4 -mx-4 rounded-xl"
                  >
                    <div className="md:col-span-3 aspect-[16/10] relative overflow-hidden rounded-xl border border-[#e4e4e7]">
                      <ImageWrapper
                        src={article.featuredImage || ""}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        containerClassName="w-full h-full border-none rounded-none"
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="md:col-span-6 flex flex-col gap-2.5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">{article.category}</span>
                        <span className="w-1 h-1 rounded-full bg-[#d4d4d8]" />
                        <span className="text-xs text-[#71717a] font-medium">{article.readingTime} min read</span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-[#0a0a0a] tracking-tight leading-snug">
                        <Link href={`/insights/${article.slug}`} className="hover:text-[#e11d48] transition-colors">
                          {article.title}
                        </Link>
                      </h3>

                      <p className="text-sm text-[#52525b] leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="md:col-span-3 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 h-full md:text-right pt-2 md:pt-0">
                      <span className="text-xs text-[#71717a]">{article.author}</span>
                      <ButtonLink href={`/insights/${article.slug}`} variant="outline" size="sm" className="rounded-full px-4 py-1.5 text-xs hover:border-[#0a0a0a]">
                        Read Guide →
                      </ButtonLink>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* 4. NEWSLETTER SUBSCRIPTION (Clean Lined Section - No Box Cards) */}
      <section className="py-24 md:py-36 bg-[#fafafa]">
        <Container size="default">
          <Reveal variant="fadeUp">
            <div className="border-t border-b border-[#e4e4e7] py-14 md:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-4xl mx-auto">
                <div className="lg:col-span-6 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e11d48]/10 flex items-center justify-center text-[#e11d48] mb-1">
                    <Mail className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0a0a0a]">
                    Practical business growth guides in your inbox.
                  </h3>
                  <p className="text-sm text-[#52525b] leading-relaxed">
                    Join hundreds of founders and business owners who read our bi-weekly updates on automating operations and scaling sustainably. Zero spam. Unsubscribe anytime.
                  </p>
                </div>

                <div className="lg:col-span-6">
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      placeholder="Enter your work email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-full border border-[#e4e4e7] bg-white text-sm text-[#0a0a0a] focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a] outline-none shadow-sm transition-all"
                    />
                    <Button variant="primary" type="submit" size="md" className="rounded-full px-6 py-3 whitespace-nowrap bg-[#0a0a0a] hover:bg-[#e11d48] text-white">
                      Subscribe
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </GlobalLayout>
  );
}
