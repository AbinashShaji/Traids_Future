/**
 * FILE: src/app/work/page.tsx
 *
 * WHAT THIS DOES:
 * The Portfolio / Case Studies directory page (/work).
 *
 * WHERE IT IS USED:
 * - Rendered when visitors navigate to `/work`.
 *
 * HOW IT WORKS:
 * 1. Organizes case study proofs into 3 slides (`workSlides`):
 *    - #hero: Overview manifesto with key metrics highlight card.
 *    - #cases: Grid of case studies loaded from `src/mock/projects.ts` (showing client names, tags, cover photos, and results).
 *    - #cta: Consultation booking call to action.
 * 2. Clicking any case study card navigates to `/work/[slug]`.
 *
 * BEGINNER TIP:
 * To add a new case study to this page, add a project object to `src/mock/projects.ts`!
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { Button } from "../../components/button";
import { Card } from "../../components/card";
import { ImageWrapper } from "../../components/image-wrapper";
import { CTA } from "../../components/cta";
import { Badge } from "../../components/badge";
import { Reveal } from "../../components/reveal";
import { TriadMark } from "../../components/triad-mark";
import { ScrollWorldContainer } from "../../components/scroll-world-container";
import { projects } from "../../mock/projects";

const workSlides = [
  { id: "hero", label: "Overview" },
  { id: "cases", label: "Case Studies" },
  { id: "cta", label: "Next Step" },
];

export default function WorkPage() {
  return (
    <GlobalLayout>
      <ScrollWorldContainer slides={workSlides}>
        {/* 1. HERO SLIDE (Split: Text Left / Key Highlight Right — 100vh narrative) */}
        <section
          id="hero"
          className="slide-section min-h-[100dvh] flex items-center pt-24 pb-16 md:pt-28 md:pb-20 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 flex flex-col gap-6">
                <SectionHeading
                  tag="h1"
                  subtitle="Selected Work"
                  withTriadMark
                >
                  Documented outcomes for growing enterprises.
                </SectionHeading>

                <p className="font-editorial text-[#57564C] text-lg md:text-2xl leading-relaxed max-w-2xl">
                  We do not build speculative mockups or ephemeral marketing campaigns. Every case study below represents real software, active portals, and systems in production.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link href="/contact">
                    <Button variant="primary" size="lg">
                      Book a Strategy Call
                    </Button>
                  </Link>
                  <a href="#cases">
                    <Button variant="outline" size="lg">
                      View Success Stories
                    </Button>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Card variant="bone" className="p-8 md:p-10 flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <TriadMark size="sm" />
                    <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#14140F]">
                      Portfolio Standards
                    </span>
                  </div>
                  <div className="space-y-4 font-editorial text-base text-[#57564C] leading-relaxed">
                    <p>
                      • 100% production code running in live environments.
                    </p>
                    <p>
                      • Full IP, codebase, and cloud infrastructure owned by the client.
                    </p>
                    <p>
                      • Measured by commercial KPIs: hours saved, revenue compounded, and enterprise pipeline growth.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. CASE STUDIES LISTING SLIDE (Alternating Cards: Image Left / Image Right) */}
        <section
          id="cases"
          className="slide-section py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="max-w-3xl mb-16">
              <SectionHeading
                tag="h2"
                subtitle="Production Case Studies"
                withTriadMark
              >
                Systems engineered for sustained growth
              </SectionHeading>
              <p className="font-editorial text-[#57564C] text-base md:text-lg leading-relaxed mt-3">
                Review the specific business challenges, technology stacks, and measurable results achieved for our clients.
              </p>
            </div>

            <div className="space-y-16">
              {projects.map((project, index) => (
                <Reveal
                  key={project.id}
                  variant="fadeUp"
                  delay={index}
                >
                  <Card
                    hoverEffect
                    className="p-0 overflow-hidden border border-[#DEDDD3]"
                  >
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-12 items-center ${
                        index % 2 === 1 ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Image panel */}
                      <div className={`lg:col-span-6 relative aspect-[16/10] w-full ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                        <Link href={`/work/${project.slug}`}>
                          <ImageWrapper
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            containerClassName="w-full h-full border-none rounded-none"
                            className="transition-transform duration-500 hover:scale-[1.02]"
                          />
                        </Link>
                      </div>

                      {/* Content Panel */}
                      <div className={`lg:col-span-6 p-8 lg:p-12 flex flex-col gap-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-sans text-xs font-semibold text-[#14140F] uppercase tracking-wider">
                            {project.client}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-[#DEDDD3]" />
                          <Badge variant="filled">{project.industry}</Badge>
                        </div>

                        <h2 className="font-heading text-2xl md:text-3xl font-normal md:font-medium text-[#14140F] leading-tight">
                          <Link href={`/work/${project.slug}`} className="hover:underline">
                            {project.title}
                          </Link>
                        </h2>

                        <p className="font-editorial text-[#57564C] text-base leading-relaxed">
                          {project.summary}
                        </p>

                        {/* Results Panel */}
                        <div className="grid grid-cols-2 gap-6 py-4 border-y border-[#DEDDD3] my-1">
                          {project.results.map((res, idx) => (
                            <div key={idx} className="flex flex-col gap-1">
                              <span className="font-heading text-2xl md:text-3xl font-normal md:font-medium text-[#14140F] tracking-tight">
                                {res.value}
                              </span>
                              <span className="font-sans text-xs text-[#57564C] font-medium leading-tight">
                                {res.metric}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, idx) => (
                            <span key={idx} className="font-sans text-[11px] font-medium text-[#57564C] bg-[#E4E3DB] px-2.5 py-1 rounded-[2px]">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="pt-2">
                          <Link href={`/work/${project.slug}`}>
                            <Button variant="primary" size="sm" className="group">
                              Read Case Study <ArrowRight className="inline-block w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* 3. FINAL CTA SLIDE (Centered Action Block — 100vh narrative) */}
        <section
          id="cta"
          className="slide-section min-h-[100dvh] flex items-center justify-center py-20"
        >
          <Container>
            <CTA 
              eyebrow="Start a Project"
              headline="Ready to build systems that compound your growth?"
              description="Schedule a 30-minute diagnosis call with our senior partners. We will discuss your technology bottlenecks and map out a practical execution plan."
            >
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Book a Strategy Call
                </Button>
              </Link>
              <Link href="/solutions">
                <Button variant="outline" size="lg">
                  Explore Solutions
                </Button>
              </Link>
            </CTA>
          </Container>
        </section>
      </ScrollWorldContainer>
    </GlobalLayout>
  );
}
