/**
 * FILE: src/app/work/work-page-content.tsx
 *
 * Case studies page reconstructed with clean line borders and plain-English copy.
 * - Removed pill badges and bracket tags.
 * - Clean lined dividers replacing heavy box cards.
 * - Straightforward language explaining real outcomes.
 * - Lightweight scroll transitions.
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";
import { ButtonLink } from "../../components/button-link";
import { ImageWrapper } from "../../components/image-wrapper";
import { WordReveal } from "../../components/word-reveal";
import { Reveal } from "../../components/reveal";
import { HeroSupport } from "../../components/hero-reveal";
import { type Project } from "@/mock/projects";

interface WorkPageContentProps {
  projects: Project[];
}

export default function WorkPageContent({ projects }: WorkPageContentProps) {
  const [selectedIndustry, setSelectedIndustry] = React.useState<string | null>(null);

  const industries = Array.from(new Set(projects.map((p) => p.industry).filter(Boolean))) as string[];

  const filteredProjects = selectedIndustry
    ? projects.filter((p) => p.industry === selectedIndustry)
    : projects;

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
            <WordReveal as="span" text="Real software" delayOffset={0} className="block min-[360px]:whitespace-nowrap" />
            <WordReveal as="span" text="built for real" delayOffset={160} className="block min-[360px]:whitespace-nowrap" />
            <WordReveal as="span" text="businesses." delayOffset={400} className="block min-[360px]:whitespace-nowrap" />
          </h1>

          <HeroSupport delayMs={300} className="w-full">
            <p className="text-sm sm:text-base md:text-lg text-[#52525b] font-normal max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-10">
              Every project below represents software currently in active daily use. We build platforms that solve actual operational problems and help companies run more smoothly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full sm:w-auto">
              <ButtonLink href="/contact" variant="primary" size="lg" className="w-full sm:w-auto px-7 sm:px-9 md:px-10 py-3.5 sm:py-4 rounded-full bg-[#0a0a0a] hover:bg-[#e11d48] text-white font-medium text-sm sm:text-base shadow-lg shadow-black/10 hover:shadow-red-500/20 transition-all duration-300">
                Book a Strategy Call
              </ButtonLink>
              <ButtonLink href="#cases" variant="outline" size="lg" className="w-full sm:w-auto px-7 sm:px-9 md:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base">
                Explore Our Work
              </ButtonLink>
            </div>
          </HeroSupport>
        </Container>
      </section>

      {/* 2. OUR PROMISES (Clean Lined Strip) */}
      <section className="py-12 md:py-16 bg-[#fafafa] border-b border-[#e4e4e7]">
        <Container size="default">
          <Reveal variant="slideLeft">
            <div className="border-t border-b border-[#e4e4e7] divide-y md:divide-y-0 md:divide-x divide-[#e4e4e7] grid grid-cols-1 md:grid-cols-3">
              <div className="py-6 px-6 sm:px-8 flex flex-col justify-center bg-white">
                <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48] mb-1">
                  Real Daily Use
                </span>
                <p className="text-sm text-[#0a0a0a] font-medium leading-relaxed">
                  100% production code running live for actual clients and their customers.
                </p>
              </div>
              <div className="py-6 px-6 sm:px-8 flex flex-col justify-center bg-white">
                <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48] mb-1">
                  Full Client Ownership
                </span>
                <p className="text-sm text-[#0a0a0a] font-medium leading-relaxed">
                  You own all code, passwords, and server accounts completely. Zero lock-in.
                </p>
              </div>
              <div className="py-6 px-6 sm:px-8 flex flex-col justify-center bg-white">
                <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48] mb-1">
                  Measurable Impact
                </span>
                <p className="text-sm text-[#0a0a0a] font-medium leading-relaxed">
                  Measured by hours saved, reduced mistakes, and smoother customer flow.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 3. CASE STUDIES DIRECTORY (Clean Lined Rows) */}
      <section id="cases" className="py-20 md:py-32 bg-white border-b border-[#e4e4e7] scroll-mt-24">
        <Container size="default">
          {/* Header + Filters */}
          <Reveal variant="slideLeft" className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-2">
                Featured Work
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a]">
                Projects delivered for growing teams.
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedIndustry(null)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  selectedIndustry === null
                    ? "bg-[#0a0a0a] text-white"
                    : "bg-[#f4f4f5] text-[#71717a] hover:bg-[#e4e4e7]"
                }`}
              >
                All Industries
              </button>
              {industries.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                    selectedIndustry === ind
                      ? "bg-[#0a0a0a] text-white"
                      : "bg-[#f4f4f5] text-[#71717a] hover:bg-[#e4e4e7]"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Cases Stack (Clean Line Dividers) */}
          <div className="divide-y divide-[#e4e4e7] border-t border-b border-[#e4e4e7]">
            {filteredProjects.map((project, index) => (
              <Reveal 
                key={project.id} 
                variant="fadeUp" 
                delay={index % 3 + 1}
              >
                <div
                  className="py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center"
                >
                  {/* Image Frame (16/10) */}
                  <div className={`lg:col-span-6 relative aspect-[16/10] w-full overflow-hidden border border-[#e4e4e7] bg-[#fafafa] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <Link href={`/work/${project.slug}`}>
                      <ImageWrapper
                        src={project.coverImage || ""}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        containerClassName="w-full h-full border-none rounded-none"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  </div>

                  {/* Content Panel */}
                  <div className={`lg:col-span-6 flex flex-col gap-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#71717a]">{project.clientName}</span>
                      <span className="w-1 h-1 rounded-full bg-[#d4d4d8]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">{project.industry}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] tracking-tight leading-snug">
                      <Link href={`/work/${project.slug}`} className="hover:text-[#e11d48] transition-colors">
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-base text-[#71717a] leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Results Grid */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#e4e4e7]">
                      {((Array.isArray(project.results) ? project.results : []) as {metric: string, value: string}[]).map((res, rIdx) => (
                        <div key={rIdx} className="flex flex-col">
                          <span className="text-2xl md:text-3xl font-bold text-[#0a0a0a] tracking-tight">{res.value}</span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a] mt-0.5">{res.metric}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-3 py-1 rounded-full bg-[#f4f4f5] text-xs font-medium text-[#71717a]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2">
                      <ButtonLink href={`/work/${project.slug}`} variant="primary" size="md">
                        Read Project Story <ArrowRight className="w-4 h-4 ml-1.5" />
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-24 md:py-36 bg-white">
        <Container size="narrow" className="text-center flex flex-col items-center">
          <Reveal variant="fadeUp" className="flex flex-col items-center text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-3">
              Start A Conversation
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a0a0a] leading-[1.1] max-w-2xl mb-6">
              Ready to build reliable technology for your business?
            </h2>
            <p className="text-base sm:text-lg text-[#71717a] leading-relaxed max-w-xl font-normal mb-10">
              Book a 30-minute discovery call with our team. We will review your current systems and give you honest, actionable advice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <ButtonLink href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
                Book a Strategy Call
              </ButtonLink>
              <ButtonLink href="/solutions" variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Solutions
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </GlobalLayout>
  );
}
