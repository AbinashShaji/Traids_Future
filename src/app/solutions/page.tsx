/**
 * FILE: src/app/solutions/page.tsx
 *
 * WHAT THIS DOES:
 * The Solutions & Capabilities service catalog page (/solutions).
 *
 * WHERE IT IS USED:
 * - Rendered when visitors navigate to `/solutions`.
 *
 * HOW IT WORKS:
 * 1. Organizes service offerings into 5 desktop slides (`solutionsSlides`):
 *    - #hero: Centered editorial manifesto statement on scalable technical execution.
 *    - #catalog: Service cards for each solution from `src/mock/solutions.ts`.
 *    - #problems: Bottlenecks we solve (e.g. fragile manual ops, low conversion).
 *    - #process: Engagement sprint cycle (Diagnosis -> Sprint Cycles -> Handover).
 *    - #cta: Strategy consultation call to action.
 * 2. Uses `<ScrollWorldContainer>` for desktop slide snapping.
 *
 * BEGINNER TIP:
 * If you want to change what services are listed, edit `src/mock/solutions.ts`!
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowDown, Globe, Monitor, Layers, Zap, TrendingUp, Check, HelpCircle, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { Button } from "../../components/button";
import { Card } from "../../components/card";
import { CTA } from "../../components/cta";
import { Reveal } from "../../components/reveal";
import { TriadMark } from "../../components/triad-mark";
import { ScrollWorldContainer } from "../../components/scroll-world-container";
import { solutions } from "../../mock/solutions";
import { staggeredContainerVariants, springSlideLeftVariants, springFadeUpVariants } from "../../animations/presets";
import { getHeroContainerVariants, getHeroItemVariants } from "../../animations/presets";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Monitor,
  Layers,
  Zap,
  TrendingUp,
};

const solutionsSlides = [
  { id: "hero", label: "Capabilities" },
  { id: "catalog", label: "Outcomes" },
  { id: "problems", label: "Bottlenecks" },
  { id: "process", label: "Phases" },
  { id: "cta", label: "Initiate" },
];

export default function SolutionsPage() {
  const prefersReducedMotion = useReducedMotion();

  // Centralized hero staggered animation variants
  const heroContainerVariants = React.useMemo(
    () => getHeroContainerVariants(prefersReducedMotion),
    [prefersReducedMotion]
  );

  const heroItemVariants = React.useMemo(
    () => getHeroItemVariants(prefersReducedMotion),
    [prefersReducedMotion]
  );

  return (
    <GlobalLayout>
      <ScrollWorldContainer slides={solutionsSlides}>
        {/* 1. HERO SLIDE (Clean, Centered Editorial Statement with Generous Negative Space — 100vh narrative) */}
        <section
          id="hero"
          className="slide-section min-h-[100dvh] flex flex-col justify-between pt-28 pb-10 md:pt-36 md:pb-12 border-b border-hairline relative overflow-hidden"
        >
          {/* Main Centered Content */}
          <Container className="my-auto">
            <motion.div
              variants={heroContainerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 md:gap-10"
            >
              {/* Eyebrow with Triad Mark */}
              <motion.div
                variants={heroItemVariants}
                className="flex items-center justify-center gap-3"
              >
                <TriadMark size="sm" />
                <span className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-graphite">
                  Commercial Capabilities
                </span>
              </motion.div>

              {/* Massive Centered Headline in Canela */}
              <motion.h1
                variants={heroItemVariants}
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-normal md:font-medium tracking-[-0.025em] leading-[1.06] text-ink max-w-4xl"
              >
                Solutions shaped by<br className="hidden sm:inline" />
                business outcomes,<br className="hidden sm:inline" />
                not billable hours.
              </motion.h1>

              {/* Short Supporting Statement */}
              <motion.p
                variants={heroItemVariants}
                className="font-editorial text-graphite text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl font-normal"
              >
                We build digital tools, custom software, and brand infrastructure designed to remove operational bottlenecks and drive compound commercial growth.
              </motion.p>

              {/* Dual Restrained CTAs */}
              <motion.div
                variants={heroItemVariants}
                className="flex flex-wrap items-center justify-center gap-4 pt-2"
              >
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Book a Strategy Call
                  </Button>
                </Link>
                <a href="#catalog">
                  <Button variant="outline" size="lg">
                    Explore Solutions
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </Container>

          {/* Subtle Bottom-Centered Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.7, duration: 0.5 }}
            className="w-full flex flex-col items-center justify-center gap-2 text-graphite select-none pt-4"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
              transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1.5"
            >
              <ArrowDown className="w-3.5 h-3.5 stroke-[1.5]" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-graphite/80">
                Scroll
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. OUTCOMES CATALOG SLIDE (Outcome-Named Rows) */}
        <section
          id="catalog"
          className="slide-section py-20 md:py-28 border-b border-hairline"
        >
          <Container>
            <Reveal variant="fadeUp">
              <div className="max-w-3xl mb-16">
                <SectionHeading
                  tag="h2"
                  subtitle="Solutions We Provide"
                  withTriadMark
                >
                  Technical solutions built for commercial impact.
                </SectionHeading>
                <p className="font-editorial text-graphite text-base md:text-lg leading-relaxed mt-3">
                  Every solution is delivered as clean, documented code and open architecture that you own outright. Zero vendor lock-in.
                </p>
              </div>
            </Reveal>

            <div className="relative pl-8 md:pl-12 lg:pl-16 space-y-20 md:space-y-32">
              {/* Continuous Timeline Line */}
              <div className="absolute left-2.5 md:left-4 lg:left-6 top-8 bottom-8 w-px bg-hairline" />

              {solutions.map((solution, idx) => {
                const Icon = iconMap[solution.icon] || Globe;
                
                return (
                  <motion.div
                    key={solution.id}
                    id={solution.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={springSlideLeftVariants}
                    className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start scroll-mt-24 group"
                  >
                    {/* Timeline Node */}
                    <div className="absolute -left-[30px] md:-left-[42px] lg:-left-[54px] top-2 w-6 h-6 rounded-full bg-paper border-[1.5px] border-hairline group-hover:border-ink transition-colors duration-300 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-graphite group-hover:bg-ink transition-colors duration-300" />
                    </div>

                    {/* Left: Solution Definition */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-[4px] bg-bone flex items-center justify-center group-hover:bg-ink group-hover:text-white transition-colors duration-300">
                          <Icon className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-graphite">
                          Solution 0{idx + 1}
                        </span>
                      </div>

                      <h3 className="font-heading text-3xl md:text-4xl font-normal md:font-medium text-ink leading-tight">
                        {solution.title}
                      </h3>

                      <p className="font-editorial text-graphite text-lg leading-relaxed">
                        {solution.description}
                      </p>

                      <div className="pt-4">
                        <Link href={`/contact?interest=${solution.id}`}>
                          <Button variant="primary" size="md">
                            {solution.ctaText}
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Right: Commercial Impact & Capabilities */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-10 bg-paper shadow-[0_8px_32px_rgba(20,20,15,0.02)] hover:shadow-[0_16px_48px_rgba(20,20,15,0.06)] border border-hairline rounded-[2px] p-8 md:p-10 transition-shadow duration-500">
                      <div className="flex flex-col gap-5">
                        <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink">
                          Commercial Impact
                        </h4>
                        <p className="font-editorial text-sm text-graphite leading-relaxed">
                          {solution.businessValue}
                        </p>

                        <div className="mt-4 pt-6 border-t border-hairline">
                          <h5 className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink mb-3">
                            Ideal Context
                          </h5>
                          <p className="font-editorial text-sm text-graphite leading-relaxed">
                            {solution.idealFor}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-5">
                        <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink">
                          Capabilities Included
                        </h4>
                        <ul className="space-y-3">
                          {solution.services.map((service, index) => (
                            <li key={index} className="font-sans text-[13px] text-ink flex items-start gap-3">
                              <Check className="w-4 h-4 text-ink mt-0.5 shrink-0" />
                              <span className="leading-snug">{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* 3. BOTTLENECK ANALYSIS SLIDE (Centered / Full-Width Problem Breakdown) */}
        <section
          id="problems"
          className="slide-section min-h-[100dvh] flex items-center py-20 md:py-28 border-b border-hairline"
        >
          <Container>
            <div className="max-w-4xl mx-auto flex flex-col gap-12 text-center items-center">
              <div className="flex flex-col gap-4 items-center">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-graphite flex items-center gap-2">
                  <TriadMark size="sm" /> Operational Bottlenecks
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal md:font-medium text-ink tracking-tight leading-tight">
                  When systems fail to keep pace with growth
                </h2>
                <p className="font-editorial text-lg md:text-xl text-graphite max-w-2xl">
                  Growing companies encounter predictable friction points where manual tools, fractured apps, and outdated branding restrict scale.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
                {[
                  {
                    title: "Administrative Drag",
                    description: "Senior talent spends hours copy-pasting customer records between spreadsheets instead of executing high-leverage work.",
                  },
                  {
                    title: "Credibility Gap",
                    description: "You deliver premium service, but your digital touchpoints look amateurish, costing you enterprise customer trust.",
                  },
                  {
                    title: "Fragile Integration",
                    description: "Off-the-shelf SaaS apps are loosely connected by brittle webhooks. When one fails, critical client data silently disappears.",
                  },
                  {
                    title: "Scale Ceiling",
                    description: "Customer demand exists to double revenue, but current delivery workflows break if client volume increases.",
                  },
                ].map((item, idx) => (
                  <Card key={idx} variant="bone" className="p-6">
                    <h4 className="font-heading text-lg font-medium text-ink mb-2 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-graphite" />
                      <span>{item.title}</span>
                    </h4>
                    <p className="font-editorial text-sm text-graphite leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* 4. ONBOARDING PHASES SLIDE (4-Column Structured Roadmap) */}
        <section
          id="process"
          className="slide-section min-h-[100dvh] flex items-center py-20 md:py-28 border-b border-hairline"
        >
          <Container>
            <div className="max-w-3xl mb-14">
              <SectionHeading
                tag="h2"
                subtitle="Engagement Model"
                withTriadMark
              >
                How we deliver results in sprints
              </SectionHeading>
              <p className="font-editorial text-graphite text-base md:text-lg leading-relaxed mt-3">
                Our engagement model minimizes operational risk through weekly live demonstrations and structured accountability.
              </p>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggeredContainerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  step: "Phase 01",
                  title: "Diagnosis & Scope",
                  duration: "30-Min Strategy Call",
                  details: "We isolate technical and operational bottlenecks, establishing if there is a commercial match before any contract.",
                },
                {
                  step: "Phase 02",
                  title: "Architecture Audit",
                  duration: "1 to 2 Weeks",
                  details: "We map workflows, audit codebases, and deliver a comprehensive roadmap outlining timeline, stack, and fixed deliverables.",
                },
                {
                  step: "Phase 03",
                  title: "Sprint Build",
                  duration: "Weekly Releases",
                  details: "We build in rapid weekly sprints. You review working software on staging every Friday with live video walk-throughs.",
                },
                {
                  step: "Phase 04",
                  title: "Deployment & Handover",
                  duration: "Production Launch",
                  details: "We train your internal team, deploy telemetry monitoring, and transfer complete IP and repository ownership.",
                },
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  variants={springFadeUpVariants}
                  className="h-full"
                >
                  <Card
                    variant="paper"
                    className="flex flex-col justify-between p-6 min-h-[280px] h-full"
                  >
                    <div>
                      <span className="font-sans text-xs font-semibold text-graphite uppercase tracking-wider block mb-2">
                        {phase.step}
                      </span>
                      <h4 className="font-heading text-lg font-medium text-ink mb-1">
                        {phase.title}
                      </h4>
                      <span className="font-editorial text-xs text-graphite block mb-4 italic">
                        {phase.duration}
                      </span>
                      <p className="font-editorial text-sm text-graphite leading-relaxed">
                        {phase.details}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* 5. FINAL INITIATE CTA SLIDE (Centered Action Block — 100vh narrative) */}
        <section
          id="cta"
          className="slide-section min-h-[100dvh] flex items-center justify-center py-20"
        >
          <Container>
            <CTA
              eyebrow="Why are you waiting?"
              headline="Contact us to diagnose your technology bottlenecks."
              description="Schedule a 30-minute consultation call. We will review your current systems and give you direct commercial feedback on what to streamline first."
            >
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Book a Strategy Call
                </Button>
              </Link>
              <Link href="/work">
                <Button variant="outline" size="lg">
                  View Success Stories
                </Button>
              </Link>
            </CTA>
          </Container>
        </section>
      </ScrollWorldContainer>
    </GlobalLayout>
  );
}
