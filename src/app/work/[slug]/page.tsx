// Case study detail page template implementing Editorial typography and alternating layout rhythm.
import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { GlobalLayout } from "../../../components/global-layout";
import { Container } from "../../../components/container";
import { SectionHeading } from "../../../components/section-heading";
import { Button } from "../../../components/button";
import { Card } from "../../../components/card";
import { ImageWrapper } from "../../../components/image-wrapper";
import { CTA } from "../../../components/cta";
import { TriadMark } from "../../../components/triad-mark";
import { ScrollWorldContainer } from "../../../components/scroll-world-container";
import { projects, getProjectBySlug } from "../../../mock/projects";
import { getTestimonialById } from "../../../mock/testimonials";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const testimonial = project.testimonialId 
    ? getTestimonialById(project.testimonialId) 
    : undefined;

  const caseSlides = [
    { id: "overview", label: "Overview" },
    { id: "metrics", label: "Results" },
    { id: "narrative", label: "Architecture" },
    ...(testimonial ? [{ id: "testimonial", label: "Client Voice" }] : []),
    ...(project.gallery && project.gallery.length > 0 ? [{ id: "gallery", label: "Interface" }] : []),
    { id: "cta", label: "Next Step" },
  ];

  return (
    <GlobalLayout>
      <ScrollWorldContainer slides={caseSlides}>
        {/* 1. HERO SLIDE (Split: Title Left / Meta Card Right — 100vh narrative) */}
        <section
          id="overview"
          className="slide-section min-h-[100dvh] flex items-center pt-24 pb-16 md:pt-28 md:pb-20 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="mb-8">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#57564C] hover:text-[#14140F] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Work</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-8 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <TriadMark size="sm" />
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#57564C]">
                    {project.client} · {project.industry}
                  </span>
                </div>
                <SectionHeading tag="h1" className="leading-[1.08]">
                  {project.title}
                </SectionHeading>
                <p className="font-editorial text-[#57564C] text-lg md:text-2xl leading-relaxed mt-2 max-w-2xl">
                  {project.summary}
                </p>
              </div>

              <div className="lg:col-span-4">
                <Card variant="bone" className="p-6 flex flex-col gap-4">
                  <span className="font-sans text-xs font-semibold text-[#14140F] uppercase tracking-wider">
                    Technologies & Scope
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="font-sans text-xs text-[#14140F] bg-[#F0F0EB] border border-[#DEDDD3] px-2.5 py-1 rounded-[2px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. RESULTS METRICS BANNER (Full-Width 4-Column Grid) */}
        <section
          id="metrics"
          className="slide-section py-16 md:py-24 bg-[#14140F] text-[#F0F0EB] border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {project.results.map((res, idx) => (
                <div key={idx} className="flex flex-col border-l border-[#F0F0EB]/20 pl-6 gap-2">
                  <span className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#F0F0EB]">
                    {res.value}
                  </span>
                  <span className="font-sans text-xs text-[#F0F0EB]/75 font-medium leading-tight">
                    {res.metric}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 3. CASE STUDY NARRATIVE (Split: Sticky Sidebar Left / Editorial Blocks Right) */}
        <section
          id="narrative"
          className="slide-section py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Sidebar Meta */}
              <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
                <div className="border-t border-[#DEDDD3] pt-6">
                  <span className="font-sans text-xs font-semibold text-[#57564C] uppercase tracking-wider block mb-2">
                    Client Context
                  </span>
                  <p className="font-heading text-lg font-bold text-[#14140F]">
                    {project.client}
                  </p>
                  <p className="font-editorial text-sm text-[#57564C] mt-1">
                    Operating in the {project.industry.toLowerCase()} sector.
                  </p>
                </div>

                <div className="border-t border-[#DEDDD3] pt-6">
                  <span className="font-sans text-xs font-semibold text-[#57564C] uppercase tracking-wider block mb-3">
                    Core Disciplines
                  </span>
                  <ul className="space-y-2.5">
                    {project.tags.map((tag, idx) => (
                      <li key={idx} className="font-sans text-xs text-[#14140F] flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#14140F]" />
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Narrative Sections in Newsreader Editorial Body */}
              <div className="lg:col-span-8 flex flex-col gap-14">
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading text-2xl font-bold text-[#14140F] border-b border-[#DEDDD3] pb-3">
                    The Challenge
                  </h3>
                  <p className="font-editorial text-lg text-[#57564C] leading-relaxed whitespace-pre-line">
                    {project.challenge}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="font-heading text-2xl font-bold text-[#14140F] border-b border-[#DEDDD3] pb-3">
                    The Strategy
                  </h3>
                  <p className="font-editorial text-lg text-[#57564C] leading-relaxed whitespace-pre-line">
                    {project.strategy}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="font-heading text-2xl font-bold text-[#14140F] border-b border-[#DEDDD3] pb-3">
                    The Technical Solution
                  </h3>
                  <p className="font-editorial text-lg text-[#57564C] leading-relaxed whitespace-pre-line">
                    {project.solution}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 4. CLIENT TESTIMONIAL (Full-Width Editorial Pull-Quote) */}
        {testimonial && (
          <section
            id="testimonial"
            className="slide-section py-20 md:py-28 border-b border-[#DEDDD3]"
          >
            <Container>
              <div className="max-w-4xl mx-auto bg-[#E4E3DB] rounded-[2px] p-8 md:p-14 border border-[#DEDDD3]">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#57564C] flex items-center gap-2 mb-6">
                  <TriadMark size="sm" /> Client Feedback
                </span>
                <blockquote className="font-editorial italic text-2xl md:text-3xl leading-snug text-[#14140F] mb-8">
                  &ldquo;{testimonial.review}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4 border-t border-[#DEDDD3] pt-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#DEDDD3]">
                    <ImageWrapper
                      src={testimonial.photo}
                      alt={testimonial.clientName}
                      fill
                      sizes="48px"
                      containerClassName="w-full h-full border-none"
                    />
                  </div>
                  <div>
                    <cite className="font-sans text-sm font-semibold text-[#14140F] not-italic block">
                      {testimonial.clientName}
                    </cite>
                    <span className="font-sans text-xs text-[#57564C] block mt-0.5">
                      {testimonial.clientRole}, {testimonial.company}
                    </span>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* 5. GALLERY SHOWCASE (2-Column Grid) */}
        {project.gallery && project.gallery.length > 0 && (
          <section
            id="gallery"
            className="slide-section py-20 md:py-28 border-b border-[#DEDDD3]"
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
                {project.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-[16/10] relative rounded-[2px] overflow-hidden border border-[#DEDDD3]">
                    <ImageWrapper
                      src={img}
                      alt={`${project.client} interface preview ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      containerClassName="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* 6. FINAL CTA SLIDE (Centered Action Block — 100vh narrative) */}
        <section
          id="cta"
          className="slide-section min-h-[100dvh] flex items-center justify-center py-20"
        >
          <Container>
            <CTA
              eyebrow="Initiate Project"
              headline="Ready to build similar capability for your company?"
              description="Book a 30-minute diagnosis call. We will review your current systems and show you how a unified strategy and technology stack can accelerate your operations."
            >
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Book a Strategy Call
                </Button>
              </Link>
              <Link href="/work">
                <Button variant="outline" size="lg">
                  View All Work
                </Button>
              </Link>
            </CTA>
          </Container>
        </section>
      </ScrollWorldContainer>
    </GlobalLayout>
  );
}
