/**
 * FILE: src/app/insights/[slug]/page.tsx
 *
 * Article detail page with clean line-border architecture and clear business language.
 * - Removed pill badges and bracket tags.
 * - Clean hairline dividers and high-contrast typography.
 * - Accessible, friendly, and trustworthy.
 */

import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { GlobalLayout } from "../../../components/global-layout";
import { Container } from "../../../components/container";
import { ButtonLink } from "../../../components/button-link";
import { ImageWrapper } from "../../../components/image-wrapper";
import { WordReveal } from "../../../components/word-reveal";
import { getInsights, getInsightBySlug, getRelatedInsights } from "@/actions/insights";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getInsightBySlug(resolvedParams.slug);
  if (!article) {
    return {
      title: "Article Not Found — Triads Future",
    };
  }
  return {
    title: `${article.title} — Triads Future`,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  const articles = await getInsights();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

function parseInlineFormatting(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-bold text-[#0a0a0a]">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-[#f4f4f5] text-[#e11d48] font-mono text-sm">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const listItems: string[] = [];
  const elements: React.ReactNode[] = [];

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key} className="list-disc pl-6 mb-6 space-y-2 text-[#71717a] text-lg">
          {listItems.map((item, idx) => (
            <li key={idx}>{parseInlineFormatting(item)}</li>
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
        <h2 key={`h2-${index}`} className="text-2xl md:text-3xl font-bold tracking-tight text-[#0a0a0a] mt-12 mb-4 border-b border-[#e4e4e7] pb-3">
          {trimmed.replace(/^##\s*/, "")}
        </h2>
      );
    } else if (trimmed.startsWith("###")) {
      flushList(`list-before-h3-${index}`);
      elements.push(
        <h3 key={`h3-${index}`} className="text-xl md:text-2xl font-bold tracking-tight text-[#0a0a0a] mt-8 mb-3">
          {trimmed.replace(/^###\s*/, "")}
        </h3>
      );
    } else if (trimmed.startsWith(">")) {
      flushList(`list-before-quote-${index}`);
      elements.push(
        <blockquote key={`quote-${index}`} className="border-l-2 border-[#e11d48] pl-6 py-3 my-6 text-xl italic text-[#0a0a0a] bg-[#fafafa] font-normal leading-relaxed">
          {parseInlineFormatting(trimmed.replace(/^>\s*/, ""))}
        </blockquote>
      );
    } else if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
      listItems.push(trimmed.replace(/^[\*\-]\s*/, ""));
    } else {
      if (trimmed === "") {
        flushList(`list-before-empty-${index}`);
      } else {
        flushList(`list-before-p-${index}`);
        elements.push(
          <p key={`p-${index}`} className="text-[#3f3f46] text-lg md:text-xl leading-[1.8] mb-6 whitespace-pre-line font-normal">
            {parseInlineFormatting(trimmed)}
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
  const article = await getInsightBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = article.category ? await getRelatedInsights(article.category, article.slug) : [];
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <GlobalLayout>
      {/* 1. ARTICLE HEADER */}
      <section className="min-h-[calc(100vh-72px)] flex flex-col justify-center py-12 sm:py-16 md:py-20 bg-white border-b border-[#e4e4e7]">
        <Container size="default" className="my-auto">
          <div className="mb-8">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#71717a] hover:text-[#e11d48] transition-colors fz-link-underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </Link>
          </div>

          <div className="max-w-4xl flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">{article.category}</span>
              <span className="w-1 h-1 rounded-full bg-[#d4d4d8]" />
              <span className="flex items-center gap-1.5 text-xs text-[#71717a] font-medium">
                <Calendar className="w-3.5 h-3.5 stroke-[1.8]" />
                {formattedDate}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#d4d4d8]" />
              <span className="flex items-center gap-1.5 text-xs text-[#71717a] font-medium">
                <Clock className="w-3.5 h-3.5 stroke-[1.8]" />
                {article.readingTime} min read
              </span>
            </div>

            <WordReveal
              text={article.title}
              as="h1"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0a0a0a] leading-[1.08]"
            />

            <p className="text-xl md:text-2xl text-[#71717a] leading-relaxed border-l-2 border-[#e11d48] pl-6 mt-2 font-normal">
              {article.excerpt}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. COVER PHOTO */}
      <section className="py-12 md:py-16 bg-[#fafafa] border-b border-[#e4e4e7]">
        <Container size="default">
          <div className="w-full aspect-[21/9] min-h-[360px] relative overflow-hidden border border-[#e4e4e7] bg-white">
            <ImageWrapper
              src={article.featuredImage || ""}
              alt={article.title}
              fill
              sizes="100vw"
              priority
              containerClassName="w-full h-full border-none rounded-none"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* 3. READING BODY (4/8 Split) */}
      <section className="py-20 md:py-32 bg-white border-b border-[#e4e4e7]">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 4 cols: Sticky Sidebar with Author and Topics */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6">
              <div className="border-b border-[#e4e4e7] pb-6">
                <span className="text-xs font-semibold text-[#71717a] uppercase tracking-wider block mb-1">
                  Author
                </span>
                <p className="text-lg font-bold text-[#0a0a0a]">
                  {article.author}
                </p>
                <p className="text-xs text-[#71717a] mt-0.5">
                  {article.authorRole}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-[#71717a] uppercase tracking-wider block mb-3">
                  Topics Covered
                </span>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-[#f4f4f5] text-xs font-medium text-[#71717a]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 8 cols: Long-Form Content */}
            <div className="lg:col-span-8 max-w-3xl">
              {renderContent(article.content)}
            </div>
          </div>
        </Container>
      </section>

      {/* 4. RELATED ARTICLES (Clean Lined 2-Col Split) */}
      {relatedArticles.length > 0 && (
        <section className="py-20 md:py-32 bg-[#fafafa] border-b border-[#e4e4e7]">
          <Container size="default">
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-2">
                More Reading
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a]">
                Related articles and guides.
              </h2>
            </div>

            <div className="border-t border-b border-[#e4e4e7] divide-y md:divide-y-0 md:divide-x divide-[#e4e4e7] grid grid-cols-1 md:grid-cols-2">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  className="py-8 md:py-10 px-6 sm:px-8 flex flex-col justify-between bg-white"
                >
                  <div>
                    <div className="aspect-[16/10] relative overflow-hidden border border-[#e4e4e7] bg-[#fafafa] mb-6">
                      <ImageWrapper
                        src={rel.featuredImage || ""}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        containerClassName="w-full h-full border-none rounded-none"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">{rel.category}</span>
                        <span className="w-1 h-1 rounded-full bg-[#d4d4d8]" />
                        <span className="text-xs text-[#71717a] font-medium">{rel.readingTime} min read</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#0a0a0a] tracking-tight leading-snug mb-2">
                        <Link href={`/insights/${rel.slug}`} className="hover:text-[#e11d48] transition-colors">
                          {rel.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-[#71717a] leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#e4e4e7] flex items-center justify-between">
                    <span className="text-xs text-[#71717a] font-medium">{rel.author}</span>
                    <Link href={`/insights/${rel.slug}`} className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] hover:text-[#e11d48] transition-colors inline-flex items-center gap-1">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 5. FINAL CTA */}
      <section className="py-24 md:py-36 bg-white">
        <Container size="narrow" className="text-center flex flex-col items-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-3">
            Start A Conversation
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a0a0a] leading-[1.1] max-w-2xl mb-6">
            Ready to apply these solutions to your business?
          </h2>
          <p className="text-base sm:text-lg text-[#71717a] leading-relaxed max-w-xl font-normal mb-10">
            Book an introductory 30-minute discovery call. We will review your current software and explain how custom tools can save you time and overhead.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <ButtonLink href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
              Book a Strategy Call
            </ButtonLink>
            <ButtonLink href="/insights" variant="outline" size="lg" className="w-full sm:w-auto">
              Back to All Articles
            </ButtonLink>
          </div>
        </Container>
      </section>
    </GlobalLayout>
  );
}
