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
import { motion } from "framer-motion";
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
import { staggeredContainerVariants, standardFadeUpVariants } from "../../animations/presets";
import { type Project } from "@/mock/projects";

const workSlides = [
  { id: "hero", label: "Overview" },
  { id: "cases", label: "Case Studies" },
  { id: "cta", label: "Next Step" },
];

interface WorkPageContentProps {
  projects: Project[];
}

export default function WorkPageContent({ projects }: WorkPageContentProps) {
  
  return (
    <GlobalLayout>
      <ScrollWorldContainer slides={workSlides}>
        {/* 1. HERO SLIDE (Split: Text Left / Key Highlight Right — 100vh narrative) */}
        <section
          id="hero"
          className="slide-section min-h-[100dvh] flex items-center pt-16 pb-12 md:pt-28 md:pb-20 border-b border-hairline"
        >
          <Container>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggeredContainerVariants}
              className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6"
            >
              <motion.div variants={standardFadeUpVariants} className="flex flex-col items-center">
                <div className="flex items-center justify-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-graphite mb-4">
                  <TriadMark size="sm" />
                  <span>Selected Work</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-heading font-normal md:font-medium tracking-[-0.02em] text-ink leading-[1.08]">
                  Documented outcomes for growing enterprises.
                </h1>
              </motion.div>

              <motion.p variants={standardFadeUpVariants} className="font-editorial text-graphite text-lg md:text-2xl leading-relaxed max-w-3xl">
                We do not build speculative mockups or ephemeral marketing campaigns. Every case study below represents real software, active portals, and systems in production.
              </motion.p>

              <motion.div variants={standardFadeUpVariants} className="flex flex-wrap justify-center items-center gap-4 pt-2">
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
              </motion.div>

              <motion.div variants={standardFadeUpVariants} className="w-full mt-10 md:mt-16 border-t border-hairline pt-8 md:pt-12">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-graphite mb-6 block text-center">
                  Portfolio Standards
                </span>
                <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 md:gap-12 text-left max-w-3xl mx-auto">
                  <div className="flex items-start gap-3 flex-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-ink mt-2 shrink-0" />
                     <p className="font-editorial text-sm text-graphite leading-relaxed">100% production code running in live environments.</p>
                  </div>
                  <div className="flex items-start gap-3 flex-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-ink mt-2 shrink-0" />
                     <p className="font-editorial text-sm text-graphite leading-relaxed">Full IP, codebase, and cloud infrastructure owned by the client.</p>
                  </div>
                  <div className="flex items-start gap-3 flex-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-ink mt-2 shrink-0" />
                     <p className="font-editorial text-sm text-graphite leading-relaxed">Measured by commercial KPIs: hours saved, revenue compounded.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* 2. CASE STUDIES LISTING SLIDE (Alternating Cards: Image Left / Image Right) */}
        <section
          id="cases"
          className="slide-section py-12 md:py-24 lg:py-28 border-b border-hairline"
        >
          <Container>
            <Reveal variant="fadeUp">
              <div className="max-w-3xl mb-16">
                <SectionHeading
                  tag="h2"
                  subtitle="Production Case Studies"
                  withTriadMark
                >
                  Systems engineered for sustained growth
                </SectionHeading>
                <p className="font-editorial text-graphite text-base md:text-lg leading-relaxed mt-3">
                  Review the specific business challenges, technology stacks, and measurable results achieved for our clients.
                </p>
              </div>
            </Reveal>

            <div className="space-y-16">
              {projects.map((project, index) => (
                <Reveal
                  key={project.id}
                  variant="fadeUp"
                >
                  <Card
                    hoverEffect
                    className="p-0 overflow-hidden border border-hairline"
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
                            src={project.coverImage || ""}
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
                          <span className="font-sans text-xs font-semibold text-ink uppercase tracking-wider">
                            {project.clientName}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-hairline" />
                          <Badge variant="filled">{project.industry}</Badge>
                        </div>

                        <h2 className="font-heading text-2xl md:text-3xl font-normal md:font-medium text-ink leading-tight">
                          <Link href={`/work/${project.slug}`} className="hover:underline">
                            {project.title}
                          </Link>
                        </h2>

                        <p className="font-editorial text-graphite text-base leading-relaxed">
                          {project.summary}
                        </p>

                        {/* Results Panel */}
                        <div className="grid grid-cols-2 gap-6 py-4 border-y border-hairline my-1">
                          {((Array.isArray(project.results) ? project.results : []) as {metric: string, value: string}[]).map((res, idx) => (
                            <div key={idx} className="flex flex-col gap-1">
                              <span className="font-heading text-2xl md:text-3xl font-normal md:font-medium text-ink tracking-tight">
                                {res.value}
                              </span>
                              <span className="font-sans text-xs text-graphite font-medium leading-tight">
                                {res.metric}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, idx) => (
                            <span key={idx} className="font-sans text-[11px] font-medium text-graphite bg-bone px-2.5 py-1 rounded-[2px]">
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
          className="slide-section min-h-[100dvh] flex items-center justify-center py-12 pb-32 md:py-20 md:pb-20"
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
