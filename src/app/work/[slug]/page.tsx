/**
 * FILE: src/app/work/[slug]/page.tsx
 *
 * WHAT THIS DOES:
 * Dynamic template that generates an individual, in-depth Case Study page
 * for each project (e.g. `/work/meridian-financial-digital-platform`).
 *
 * WHERE IT IS USED:
 * - Next.js matches any URL starting with `/work/...` to this file.
 *
 * HOW IT WORKS:
 * 1. `generateStaticParams()`: Tells Next.js to pre-render a static HTML page for every project slug at build time.
 * 2. `getProjectBySlug(slug)`: Looks up the matching project data from `src/mock/projects.ts`.
 * 3. If no matching project is found, it automatically calls `notFound()` to show the 404 screen.
 * 4. Renders full project details across desktop slides:
 *    - #overview: Client title, industry badge, summary, and cover image.
 *    - #metrics: Numerical results and business impact grid.
 *    - #narrative: Challenge, Strategy, and Technical Architecture cards.
 *    - #testimonial: Client quote (if available).
 *    - #gallery: UI screenshots gallery.
 *    - #cta: Booking call to action.
 *
 * BEGINNER TIP:
 * The `[slug]` folder name is Next.js syntax for a "Dynamic Route" (a URL parameter)!
 */

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Quote } from "lucide-react";
import { GlobalLayout } from "../../../components/global-layout";
import { Container } from "../../../components/container";
import { SectionHeading } from "../../../components/section-heading";
import { Button } from "../../../components/button";

import { ImageWrapper } from "../../../components/image-wrapper";
import { CTA } from "../../../components/cta";
import { TriadMark } from "../../../components/triad-mark";
import { ScrollWorldContainer } from "../../../components/scroll-world-container";
import { getProjects, getProjectBySlug } from "@/actions/projects";
import { getTestimonial } from "@/actions/testimonials";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
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

  const caseSlides = [
    { id: "overview", label: "Overview" },
    { id: "metrics", label: "Results" },
    { id: "narrative", label: "Architecture" },
    ...(testimonial ? [{ id: "testimonial", label: "Client Voice" }] : []),
    ...(project.galleryImages && (project.galleryImages as {url: string, alt: string}[]).length > 0 ? [{ id: "gallery", label: "Interface" }] : []),
    { id: "cta", label: "Next Step" },
  ];

  return (
    <GlobalLayout>
      <ScrollWorldContainer slides={caseSlides}>
        {/* 1. HERO SLIDE (Split: Title Left / Meta Card Right — 100vh narrative) */}
        <section
          id="overview"
          className="slide-section min-h-[100dvh] flex items-center pt-32 pb-12 md:pt-40 md:pb-20 border-b border-hairline"
        >
          <Container>
            <div className="mb-8">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-graphite hover:text-ink transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Work</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-8 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <TriadMark size="sm" />
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-graphite">
                    {project.clientName} · {project.industry}
                  </span>
                </div>
                <SectionHeading tag="h1" className="leading-[1.08]">
                  {project.title}
                </SectionHeading>
                <p className="font-editorial text-graphite text-lg md:text-2xl leading-relaxed mt-2 max-w-2xl">
                  {project.summary}
                </p>
              </div>

              <div className="lg:col-span-4 mt-6 lg:mt-0">
                <div className="bg-paper text-ink theme-inverted border border-hairline rounded-[2px] p-8 shadow-[0_20px_40px_rgba(20,20,15,0.08)] flex flex-col gap-6 relative z-10 transition-colors duration-300">
                  <span className="font-sans text-xs font-semibold text-ink uppercase tracking-wider">
                    Technologies & Scope
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="font-sans text-xs font-semibold text-paper bg-ink px-3 py-1.5 rounded-[2px] transition-colors duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. RESULTS METRICS BANNER (Full-Width 4-Column Grid) */}
        <section
          id="metrics"
          className="slide-section py-16 md:py-24 bg-ink text-paper border-b border-hairline"
        >
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {((project.results as {metric: string, value: string}[]) || []).map((result, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="font-heading text-4xl lg:text-5xl font-medium text-[var(--paper)]">
                    {result.value}
                  </span>
                  <span className="font-sans text-sm tracking-wide text-[var(--paper)]/75 uppercase">
                    {result.metric}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 3. CASE STUDY NARRATIVE (Split: Sticky Sidebar Left / Editorial Blocks Right) */}
        <section
          id="narrative"
          className="slide-section py-12 md:py-24 lg:py-28 border-b border-hairline"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
              {/* Sidebar Meta */}
              <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
                <div className="border-t border-hairline pt-6">
                  <span className="font-sans text-xs font-semibold text-graphite uppercase tracking-wider block mb-2">
                    Client Context
                  </span>
                  <p className="font-heading text-lg font-medium text-ink">
                    {project.clientName}
                  </p>
                  <p className="font-editorial text-sm text-graphite mt-1">
                    Operating in the {project.industry.toLowerCase()} sector.
                  </p>
                </div>

                <div className="border-t border-hairline pt-6">
                  <span className="font-sans text-xs font-semibold text-graphite uppercase tracking-wider block mb-3">
                    Core Disciplines
                  </span>
                  <ul className="space-y-2.5">
                    {project.tags.map((tag, idx) => (
                      <li key={idx} className="font-sans text-xs text-ink flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-ink" />
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Narrative Sections in Newsreader Editorial Body */}
              <div className="lg:col-span-8 flex flex-col gap-14">
                {((project.narrativeSections as {title: string, body: string}[]) || []).map((section, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    <h3 className="font-heading text-2xl md:text-3xl font-medium text-ink border-b border-hairline pb-3">
                      {section.title}
                    </h3>
                    <p className="font-editorial text-lg text-graphite leading-relaxed whitespace-pre-line">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* 4. CLIENT TESTIMONIAL (Full-Width Editorial Pull-Quote) */}
        {testimonial && (
          <section
            id="testimonial"
            className="slide-section py-12 md:py-24 lg:py-28"
          >
            <Container>
              <div className="max-w-5xl mx-auto bg-paper text-ink theme-inverted rounded-[2px] p-10 md:p-16 lg:p-20 shadow-[0_20px_60px_rgba(20,20,15,0.08)] relative z-10 transition-colors duration-300 overflow-hidden group">
                
                {/* Massive Watermark Quote Icon */}
                <Quote className="absolute -top-12 -left-12 w-48 h-48 text-graphite opacity-5 rotate-180 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row gap-12 lg:gap-16 items-start">
                  {/* Left: Author Block */}
                  <div className="w-full md:w-1/3 flex flex-col items-center md:items-start shrink-0 pt-2">
                    <div className="flex flex-col items-center text-center w-full max-w-[280px]">
                      {/* Pic Frame */}
                      <div className="w-full aspect-[4/5] rounded-[2px] overflow-hidden relative border border-hairline shadow-[0_8px_30px_rgba(0,0,0,0.04)] ring-1 ring-ink/5 group-hover:ring-ink/15 transition-all duration-500 mb-6">
                        <ImageWrapper
                          src={testimonial.photo || ""}
                          alt={testimonial.clientName}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          containerClassName="w-full h-full border-none"
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                        />
                      </div>
                      
                      {/* Credentials */}
                      <div className="flex flex-col items-center">
                        <cite className="font-heading text-xl font-medium text-ink not-italic">
                          {testimonial.clientName}
                        </cite>
                        <span className="font-sans text-sm text-graphite mt-1">
                          {testimonial.clientRole}
                        </span>
                        <span className="font-sans text-sm font-semibold text-ink mt-1">
                          {testimonial.company}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: The Quote */}
                  <div className="w-full md:w-2/3 flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                       <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-graphite flex items-center gap-2">
                        <TriadMark size="sm" /> Client Partnership
                      </span>
                    </div>
                    
                    <blockquote className="font-editorial text-2xl md:text-3xl lg:text-4xl leading-[1.3] tracking-tight text-ink">
                      &ldquo;{testimonial.review}&rdquo;
                    </blockquote>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* 5. GALLERY SHOWCASE (2-Column Grid) */}
        {project.galleryImages && (project.galleryImages as {url: string, alt: string}[]).length > 0 && (
          <section
            id="gallery"
            className="slide-section py-12 md:py-24 lg:py-28 border-b border-hairline"
          >
            <Container>
              <div className="mb-12">
                <SectionHeading
                  tag="h2"
                  subtitle="System Views"
                  withTriadMark
                >
                  Production Interface Architecture
                </SectionHeading>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {((project.galleryImages as {url: string, alt: string}[]) || []).map((img, idx) => (
                  <div key={idx} className="aspect-[16/10] relative rounded-[2px] overflow-hidden border border-hairline">
                    <ImageWrapper
                      src={img.url}
                      alt={img.alt || `${project.title} interface capture ${idx + 1}`}
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

        {/* 6. NEXT STEP CTA */}
        <section
          id="cta"
          className="slide-section min-h-[100dvh] flex items-center justify-center py-12 pb-32 md:py-20 md:pb-20"
        >
          <Container>
            <CTA
              eyebrow="Initiate Project"
              headline={`Ready to achieve similar results for ${project.clientName}?`}
              description="Schedule a 30-minute consultation call. We will review your current technical bottlenecks and map out a practical execution plan."
            >
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Book a Strategy Call
                </Button>
              </Link>
              <Link href="/work">
                <Button variant="outline" size="lg">
                  Back to All Work
                </Button>
              </Link>
            </CTA>
          </Container>
        </section>
      </ScrollWorldContainer>
    </GlobalLayout>
  );
}
