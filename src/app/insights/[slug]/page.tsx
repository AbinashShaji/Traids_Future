// Article detail template with Editorial serif body copy, Archivo headings, and alternating layout rhythm.
import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { GlobalLayout } from "../../../components/global-layout";
import { Container } from "../../../components/container";
import { SectionHeading } from "../../../components/section-heading";
import { Button } from "../../../components/button";
import { Card } from "../../../components/card";
import { Badge } from "../../../components/badge";
import { ImageWrapper } from "../../../components/image-wrapper";
import { CTA } from "../../../components/cta";
import { ScrollWorldContainer } from "../../../components/scroll-world-container";
import { articles, getArticleBySlug, getRelatedArticles } from "../../../mock/articles";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const listItems: string[] = [];
  const elements: React.ReactNode[] = [];

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key} className="list-disc pl-6 mb-6 space-y-2 text-[#57564C] font-editorial text-lg md:text-xl">
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
      listItems.length = 0;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    if (trimmed.startsWith("##")) {
      flushList(`list-before-h2-${index}`);
      elements.push(
        <h3 key={`h2-${index}`} className="font-heading text-2xl md:text-3xl font-bold text-[#14140F] mt-10 mb-4 border-b border-[#DEDDD3] pb-3">
          {trimmed.replace(/^##\s*/, "")}
        </h3>
      );
    } else if (trimmed.startsWith("###")) {
      flushList(`list-before-h3-${index}`);
      elements.push(
        <h4 key={`h3-${index}`} className="font-heading text-xl md:text-2xl font-bold text-[#14140F] mt-8 mb-3">
          {trimmed.replace(/^###\s*/, "")}
        </h4>
      );
    } else if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
      listItems.push(trimmed.replace(/^[\*\-]\s*/, ""));
    } else {
      if (trimmed === "") {
        flushList(`list-before-empty-${index}`);
      } else {
        flushList(`list-before-p-${index}`);
        elements.push(
          <p key={`p-${index}`} className="font-editorial text-[#14140F] text-lg md:text-xl leading-[1.7] mb-6 whitespace-pre-line">
            {trimmed}
          </p>
        );
      }
    }
  });

  flushList("list-final");
  return elements;
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug, 2);
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const articleSlides = [
    { id: "hero", label: "Overview" },
    { id: "cover", label: "Cover" },
    { id: "body", label: "Article" },
    ...(relatedArticles.length > 0 ? [{ id: "related", label: "Related" }] : []),
    { id: "cta", label: "Next Step" },
  ];

  return (
    <GlobalLayout>
      <ScrollWorldContainer slides={articleSlides}>
        {/* 1. HERO SLIDE (Split: Title Left / Meta Right — 100vh narrative) */}
        <section
          id="hero"
          className="slide-section min-h-[100dvh] flex items-center pt-24 pb-16 md:pt-28 md:pb-20 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="mb-8">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#57564C] hover:text-[#14140F] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Insights</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8 flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="filled">{article.category}</Badge>
                  <span className="w-1 h-1 rounded-full bg-[#DEDDD3]" />
                  <span className="flex items-center gap-1.5 font-sans text-xs text-[#57564C]">
                    <Calendar className="w-3.5 h-3.5 stroke-[1.5]" />
                    {formattedDate}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#DEDDD3]" />
                  <span className="flex items-center gap-1.5 font-sans text-xs text-[#57564C]">
                    <Clock className="w-3.5 h-3.5 stroke-[1.5]" />
                    {article.readingTime} min read
                  </span>
                </div>

                <SectionHeading tag="h1" className="leading-[1.08]">
                  {article.title}
                </SectionHeading>

                <p className="font-editorial italic text-[#57564C] text-xl md:text-2xl leading-relaxed border-l-2 border-[#14140F] pl-5 mt-2">
                  {article.excerpt}
                </p>
              </div>

              <div className="lg:col-span-4">
                <Card variant="bone" className="p-6 flex flex-col gap-4">
                  <span className="font-sans text-xs font-semibold text-[#57564C] uppercase tracking-wider">
                    Author
                  </span>
                  <div>
                    <cite className="font-sans text-base font-bold text-[#14140F] not-italic block">
                      {article.author}
                    </cite>
                    <span className="font-editorial text-sm text-[#57564C] block mt-0.5">
                      {article.authorRole}
                    </span>
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. COVER PHOTO SLIDE (Full-Width Aspect 21/9) */}
        <section
          id="cover"
          className="slide-section py-0 border-b border-[#DEDDD3]"
        >
          <div className="w-full aspect-[21/9] min-h-[340px] relative">
            <ImageWrapper
              src={article.coverImage}
              alt={article.title}
              fill
              sizes="100vw"
              priority
              containerClassName="w-full h-full border-none rounded-none"
            />
          </div>
        </section>

        {/* 3. ARTICLE CONTENT SLIDE (Split: Meta Left / Newsreader Body Right) */}
        <section
          id="body"
          className="slide-section py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Topics */}
              <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
                <div className="border-t border-[#DEDDD3] pt-6">
                  <span className="font-sans text-xs font-semibold text-[#57564C] uppercase tracking-wider block mb-3">
                    Topics
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, idx) => (
                      <span key={idx} className="font-sans text-xs text-[#14140F] bg-[#E4E3DB] px-2.5 py-1 rounded-[2px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#DEDDD3] pt-6">
                  <span className="font-sans text-xs font-semibold text-[#57564C] uppercase tracking-wider block mb-3">
                    Author
                  </span>
                  <div className="font-sans text-sm font-semibold text-[#14140F]">
                    {article.author}
                    <span className="block font-editorial text-xs text-[#57564C] mt-0.5">
                      {article.authorRole}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Newsreader Long-Form Editorial Body */}
              <div className="lg:col-span-8 max-w-3xl">
                {renderContent(article.content)}
              </div>
            </div>
          </Container>
        </section>

        {/* 4. RELATED ARTICLES SLIDE (2-Column Grid) */}
        {relatedArticles.length > 0 && (
          <section
            id="related"
            className="slide-section py-20 md:py-28 border-b border-[#DEDDD3]"
          >
            <Container>
              <div className="mb-12">
                <SectionHeading
                  tag="h2"
                  subtitle="Related Writing"
                  withTriadMark
                >
                  Continue exploring strategy
                </SectionHeading>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedArticles.map((rel) => (
                  <Card
                    key={rel.id}
                    hoverEffect
                    className="flex flex-col justify-between p-0 overflow-hidden border border-[#DEDDD3]"
                  >
                    <div>
                      <div className="aspect-[16/10] relative">
                        <ImageWrapper
                          src={rel.coverImage}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 45vw"
                          containerClassName="w-full h-full border-none rounded-none"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-sans text-xs font-semibold text-[#14140F]">{rel.category}</span>
                          <span className="w-1 h-1 rounded-full bg-[#DEDDD3]" />
                          <span className="font-sans text-xs text-[#57564C]">{rel.readingTime} min read</span>
                        </div>
                        <h3 className="font-heading text-lg font-bold text-[#14140F] mb-2 leading-snug">
                          <Link href={`/insights/${rel.slug}`} className="hover:underline">
                            {rel.title}
                          </Link>
                        </h3>
                        <p className="font-editorial text-sm text-[#57564C] leading-relaxed">
                          {rel.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-3 border-t border-[#DEDDD3]">
                      <Link href={`/insights/${rel.slug}`}>
                        <Button variant="text" size="sm" className="group w-full justify-between">
                          <span>Read perspective</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* 5. FINAL CTA SLIDE (Centered Action Block — 100vh narrative) */}
        <section
          id="cta"
          className="slide-section min-h-[100dvh] flex items-center justify-center py-20"
        >
          <Container>
            <CTA
              eyebrow="Direct Advisory"
              headline="Want tailored perspective for your business systems?"
              description="Book a 30-minute diagnosis call with our senior engineering and strategy team. We will review your architecture and discuss practical paths forward."
            >
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Book a Strategy Call
                </Button>
              </Link>
              <Link href="/insights">
                <Button variant="outline" size="lg">
                  Back to Insights
                </Button>
              </Link>
            </CTA>
          </Container>
        </section>
      </ScrollWorldContainer>
    </GlobalLayout>
  );
}
