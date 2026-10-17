/**
 * FILE: src/app/work/[slug]/page.tsx
 *
 * Case Study Detail page with clean line-border architecture.
 * - Removed pill badges and bracket tags.
 * - Pure white and light-zinc backgrounds with high-contrast text.
 * - Clean hairline dividers and readable narrative sections.
 */

import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Quote } from "lucide-react";
import { GlobalLayout } from "../../../components/global-layout";
import { Container } from "../../../components/container";
import { ButtonLink } from "../../../components/button-link";
import { ImageWrapper } from "../../../components/image-wrapper";
import { WordReveal } from "../../../components/word-reveal";
import { getProjects, getProjectBySlug } from "@/actions/projects";
import { getTestimonial } from "@/actions/testimonials";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);
  if (!project) {
    return {
      title: "Project Not Found — Triads Future",
    };
  }
  return {
    title: `${project.title} — Triads Future`,
    description: project.summary,
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const testimonial = project.testimonialId ? await getTestimonial(project.testimonialId) : null;

  return (
    <GlobalLayout>
      {/* 1. OVERVIEW HERO */}
      <section className="min-h-[calc(100vh-72px)] flex flex-col justify-center py-12 sm:py-16 md:py-20 bg-white border-b border-[#e4e4e7]">
        <Container size="default" className="my-auto">
          <div className="mb-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#71717a] hover:text-[#e11d48] transition-colors fz-link-underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Work</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">
                  {project.clientName}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#d4d4d8]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">{project.industry}</span>
              </div>

              <WordReveal
                text={project.title}
                as="h1"
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0a0a0a] leading-[1.08]"
              />

              <p className="text-lg md:text-xl text-[#71717a] leading-relaxed max-w-2xl font-normal">
                {project.summary}
              </p>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#e4e4e7] pt-8 lg:pt-0 lg:pl-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] block mb-4">
                What Was Delivered
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-full bg-[#f4f4f5] text-xs font-medium text-[#0a0a0a]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. RESULTS METRICS BANNER (Clean Light Contrast Band) */}
      <section className="py-16 md:py-20 bg-[#fafafa] border-b border-[#e4e4e7]">
        <Container size="default">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {((project.results as {metric: string, value: string}[]) || []).map((result, idx) => (
              <div key={idx} className="flex flex-col gap-1 border-l-2 border-[#e11d48] pl-4">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a0a0a] tracking-tight">
                  {result.value}
                </span>
                <span className="text-xs font-semibold tracking-wider text-[#71717a] uppercase mt-1">
                  {result.metric}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. CASE STUDY NARRATIVE (Clean 12-Col Split) */}
      <section className="py-20 md:py-32 bg-white border-b border-[#e4e4e7]">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Sidebar Context */}
            <div className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-28">
              <div className="border-b border-[#e4e4e7] pb-6">
                <span className="text-xs font-semibold text-[#71717a] uppercase tracking-wider block mb-1">
                  Client
                </span>
                <p className="text-xl font-bold text-[#0a0a0a]">
                  {project.clientName}
                </p>
                <p className="text-sm text-[#71717a] mt-1">
                  Sector: {project.industry}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-[#71717a] uppercase tracking-wider block mb-3">
                  Scope & Solutions
                </span>
                <ul className="space-y-2.5">
                  {project.tags.map((tag, idx) => (
                    <li key={idx} className="text-sm text-[#0a0a0a] flex items-center gap-2.5 font-medium">
                      <Check className="w-4 h-4 text-[#e11d48]" />
                      <span>{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Narrative Editorial Sections */}
            <div className="lg:col-span-8 divide-y divide-[#e4e4e7]">
              {((project.narrativeSections as {title: string, body: string}[]) || []).map((sec, idx) => (
                <div key={idx} className="py-10 first:pt-0 last:pb-0 flex flex-col gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a]">
                    {sec.title}
                  </h2>
                  <p className="text-base md:text-lg text-[#71717a] leading-relaxed whitespace-pre-line font-normal">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 4. CLIENT TESTIMONIAL */}
      {testimonial && (
        <section className="py-20 md:py-32 bg-[#fafafa] border-b border-[#e4e4e7]">
          <Container size="default">
            <div className="max-w-4xl mx-auto py-12 px-6 sm:px-12 border-t border-b border-[#e4e4e7] bg-white flex flex-col gap-6 relative">
              <Quote className="w-10 h-10 text-[#e11d48] opacity-30 stroke-[1.5]" />

              <blockquote className="text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed text-[#0a0a0a]">
                &ldquo;{testimonial.review}&rdquo;
              </blockquote>

              <div className="border-t border-[#e4e4e7] pt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#e4e4e7]">
                  <ImageWrapper
                    src={testimonial.photo || ""}
                    alt={testimonial.clientName}
                    fill
                    sizes="48px"
                    containerClassName="w-full h-full border-none"
                    className="object-cover"
                  />
                </div>
                <div>
                  <cite className="text-base font-bold text-[#0a0a0a] not-italic block">
                    {testimonial.clientName}
                  </cite>
                  <span className="text-xs text-[#71717a]">
                    {testimonial.clientRole}, <strong className="text-[#0a0a0a]">{testimonial.company}</strong>
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 5. INTERFACE ARCHITECTURE GALLERY */}
      {project.galleryImages && (project.galleryImages as {url: string, alt: string}[]).length > 0 && (
        <section className="py-20 md:py-32 bg-white border-b border-[#e4e4e7]">
          <Container size="default">
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-2">
                Visual Showcase
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a]">
                Screens & Platform Features
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {((project.galleryImages as {url: string, alt: string}[]) || []).map((img, idx) => (
                <div key={idx} className="aspect-[16/10] relative overflow-hidden border border-[#e4e4e7] bg-[#fafafa]">
                  <ImageWrapper
                    src={img.url}
                    alt={img.alt || `${project.title} screenshot ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    containerClassName="w-full h-full border-none rounded-none"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 6. FINAL CTA */}
      <section className="py-24 md:py-36 bg-white">
        <Container size="narrow" className="text-center flex flex-col items-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-3">
            Start A Conversation
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a0a0a] leading-[1.1] max-w-2xl mb-6">
            Ready for similar results in your business?
          </h2>
          <p className="text-base sm:text-lg text-[#71717a] leading-relaxed max-w-xl font-normal mb-10">
            Book an introductory 30-minute call. We will review your current software and explain how custom tools can save you time and overhead.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <ButtonLink href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
              Book a Strategy Call
            </ButtonLink>
            <ButtonLink href="/work" variant="outline" size="lg" className="w-full sm:w-auto">
              Back to All Projects
            </ButtonLink>
          </div>
        </Container>
      </section>
    </GlobalLayout>
  );
}
