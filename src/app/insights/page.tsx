/**
 * FILE: src/app/insights/page.tsx
 *
 * WHAT THIS DOES:
 * The Thought Leadership & Blog directory page (/insights).
 *
 * WHERE IT IS USED:
 * - Rendered when visitors navigate to `/insights`.
 *
 * HOW IT WORKS:
 * 1. Organizes articles across 4 slides (`insightSlides`):
 *    - #hero: Overview headline and mission statement on sustainable business architecture.
 *    - #featured: Prominent featured article card with reading time and author metadata.
 *    - #articles: Search bar (`searchQuery`) and category filter tags (`selectedCategory`)
 *      that filter the article list live on the client side!
 *    - #newsletter: Email newsletter subscription card with Sonner toast feedback.
 * 2. Uses `<ScrollWorldContainer>` for desktop slide snapping.
 *
 * BEGINNER TIP:
 * The live search works by checking if the typed word appears in the article's title, excerpt, or category!
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Search, Mail } from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { Button } from "../../components/button";
import { Card } from "../../components/card";
import { ImageWrapper } from "../../components/image-wrapper";
import { FormInput } from "../../components/form-input";
import { Tag } from "../../components/tag";
import { Badge } from "../../components/badge";
import { TriadMark } from "../../components/triad-mark";
import { ScrollWorldContainer } from "../../components/scroll-world-container";
import { toast } from "sonner";
import { articles, categories } from "../../mock/articles";

const insightSlides = [
  { id: "hero", label: "Overview" },
  { id: "featured", label: "Featured" },
  { id: "articles", label: "All Insights" },
  { id: "newsletter", label: "Newsletter" },
];

export default function InsightsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState("");

  const featuredArticle = articles.find((a) => a.featured);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory 
      ? article.category === selectedCategory 
      : true;
      
    return matchesSearch && matchesCategory;
  });

  /**
   * FUNCTION: handleSubscribe
   * ROLE: Form Submission Handler
   *
   * PURPOSE:
   * Processes newsletter subscription requests from the insights page.
   *
   * INPUT:
   * Standard React FormEvent from the submit action.
   *
   * VALIDATION:
   * Verifies the email exists and contains an "@" symbol. 
   * 
   * FLOW:
   * Validates input -> shows success or error toast -> clears the input field.
   */
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you for subscribing to our strategy letters.");
    setEmail("");
  };

  return (
    <GlobalLayout>
      <ScrollWorldContainer slides={insightSlides}>
        {/* 1. HERO SLIDE (Centered / Full-Width — 100vh narrative) */}
        <section
          id="hero"
          className="slide-section min-h-[100dvh] flex items-center pt-24 pb-16 md:pt-28 md:pb-20 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
              <SectionHeading
                tag="h1"
                subtitle="Strategic Perspectives"
                withTriadMark
              >
                Strategy, technology, and compounding growth.
              </SectionHeading>
              <p className="font-editorial text-[#57564C] text-lg md:text-2xl leading-relaxed">
                Practical guides, architecture breakdowns, and operational models. We write directly about the systems we design and run in production. No marketing jargon.
              </p>
              <div className="pt-2">
                <a href="#featured">
                  <Button variant="primary" size="lg">
                    Explore Insights
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. FEATURED ARTICLE SLIDE (Split: Image Left / Editorial Preview Right) */}
        {featuredArticle && (
          <section
            id="featured"
            className="slide-section py-20 md:py-28 border-b border-[#DEDDD3]"
          >
            <Container>
              <div className="mb-8 flex items-center gap-2">
                <TriadMark size="sm" />
                <span className="font-sans text-xs text-[#57564C] uppercase tracking-[0.14em] font-semibold">
                  Featured Perspective
                </span>
              </div>
              
              <Card className="p-0 overflow-hidden border border-[#DEDDD3]">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:h-[450px] w-full">
                    <ImageWrapper
                      src={featuredArticle.coverImage}
                      alt={featuredArticle.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      containerClassName="w-full h-full border-none rounded-none"
                    />
                  </div>
                  <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <Badge variant="filled">{featuredArticle.category}</Badge>
                        <span className="w-1 h-1 rounded-full bg-[#DEDDD3]" />
                        <span className="font-sans text-xs text-[#57564C]">{featuredArticle.readingTime} min read</span>
                      </div>

                      <h2 className="font-heading text-2xl md:text-3xl font-normal md:font-medium text-[#14140F] leading-snug">
                        <Link href={`/insights/${featuredArticle.slug}`} className="hover:underline">
                          {featuredArticle.title}
                        </Link>
                      </h2>

                      <p className="font-editorial text-[#57564C] text-base leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#DEDDD3] pt-6 mt-2">
                      <div>
                        <cite className="font-sans text-sm font-semibold text-[#14140F] not-italic block">
                          {featuredArticle.author}
                        </cite>
                        <span className="font-sans text-xs text-[#57564C]">
                          {featuredArticle.authorRole}
                        </span>
                      </div>
                      <Link href={`/insights/${featuredArticle.slug}`}>
                        <Button variant="primary" size="sm" className="group">
                          Read Article <ArrowRight className="inline-block w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        )}

        {/* 3. ARTICLES DIRECTORY SLIDE (Grid with Filters & Search) */}
        <section
          id="articles"
          className="slide-section py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="flex-1 flex flex-col gap-3">
                <span className="font-sans text-xs text-[#57564C] uppercase tracking-[0.14em] font-semibold">
                  Filter by Category
                </span>
                <div className="flex flex-wrap gap-2">
                  <Tag 
                    active={selectedCategory === null} 
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Topics
                  </Tag>
                  {categories.map((cat) => (
                    <Tag 
                      key={cat}
                      active={selectedCategory === cat}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Tag>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-80 relative flex flex-col gap-2">
                <label htmlFor="search-input" className="font-sans text-xs text-[#57564C] uppercase tracking-[0.14em] font-semibold">
                  Search
                </label>
                <div className="relative">
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search perspectives..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F0F0EB] border border-[#DEDDD3] rounded-[2px] font-sans text-sm text-[#14140F] focus:border-[#14140F] focus:ring-1 focus:ring-[#14140F] outline-none transition-all"
                  />
                  <Search className="w-4 h-4 text-[#57564C] absolute left-3.5 top-3.5" />
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16 border border-[#DEDDD3] border-dashed rounded-[2px]">
                <p className="font-editorial text-[#57564C] text-base mb-4">
                  No articles matched your criteria.
                </p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <Card
                    key={article.id}
                    hoverEffect
                    className="flex flex-col justify-between p-0 overflow-hidden h-full border border-[#DEDDD3]"
                  >
                    <div>
                      <div className="aspect-[16/10] relative">
                        <ImageWrapper
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 30vw"
                          containerClassName="w-full h-full border-none rounded-none"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-sans text-xs font-semibold text-[#14140F]">{article.category}</span>
                          <span className="w-1 h-1 rounded-full bg-[#DEDDD3]" />
                          <span className="font-sans text-xs text-[#57564C]">{article.readingTime} min read</span>
                        </div>
                        <h3 className="font-heading text-lg font-medium text-[#14140F] mb-2 leading-snug">
                          <Link href={`/insights/${article.slug}`} className="hover:underline">
                            {article.title}
                          </Link>
                        </h3>
                        <p className="font-editorial text-sm text-[#57564C] leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-[#DEDDD3] mt-auto">
                      <span className="font-sans text-xs text-[#57564C]">
                        {article.author}
                      </span>
                      <Link href={`/insights/${article.slug}`}>
                        <Button variant="text" size="sm" className="group">
                          Read More →
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* 4. NEWSLETTER SUBSCRIPTION SLIDE (Split: Text Left / Form Right) */}
        <section
          id="newsletter"
          className="slide-section py-20 md:py-28"
        >
          <Container>
            <div className="max-w-4xl mx-auto border border-[#DEDDD3] rounded-[2px] p-8 md:p-14 bg-[#E4E3DB]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-[2px] bg-[#F0F0EB] flex items-center justify-center mb-1">
                    <Mail className="w-5 h-5 text-[#14140F]" />
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-medium text-[#14140F]">
                    Subscribe to Strategy Letters
                  </h3>
                  <p className="font-editorial text-base text-[#57564C] leading-relaxed">
                    Published bi-weekly. Detailed breakdowns on software architecture, automation patterns, and growth frameworks. Zero spam.
                  </p>
                </div>
                
                <div className="lg:col-span-6">
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                    <FormInput
                      label="Work Email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant="primary" type="submit" className="w-full">
                      Subscribe to Letters
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </ScrollWorldContainer>
    </GlobalLayout>
  );
}
