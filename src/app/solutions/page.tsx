// Solutions page implementing outcome-focused capabilities, desktop-locked slide-scroll, and alternating layout rhythms.
"use client";

import * as React from "react";
import Link from "next/link";
import { Globe, Monitor, Layers, Zap, TrendingUp, Check, HelpCircle, type LucideIcon } from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { Button } from "../../components/button";
import { Card } from "../../components/card";
import { ImageWrapper } from "../../components/image-wrapper";
import { CTA } from "../../components/cta";
import { Reveal } from "../../components/reveal";
import { TriadMark } from "../../components/triad-mark";
import { ScrollWorldContainer } from "../../components/scroll-world-container";
import { solutions } from "../../mock/solutions";

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
  return (
    <GlobalLayout>
      <ScrollWorldContainer slides={solutionsSlides}>
        {/* 1. HERO SLIDE (Split: Text Left / Visual Panel Right — 100vh narrative) */}
        <section
          id="hero"
          className="slide-section min-h-[100dvh] flex items-center pt-24 pb-16 md:pt-28 md:pb-20 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 flex flex-col gap-6">
                <SectionHeading
                  tag="h1"
                  subtitle="Commercial Capabilities"
                  withTriadMark
                >
                  Solutions shaped by business outcomes, not billable hours.
                </SectionHeading>

                <p className="font-editorial text-[#57564C] text-lg md:text-2xl leading-relaxed max-w-2xl">
                  We build digital tools, custom software, and brand infrastructure designed to remove operational bottlenecks and drive compound commercial growth.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
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
                </div>
              </div>

              <div className="lg:col-span-5 w-full aspect-[4/3] lg:aspect-[1/1] relative">
                <Reveal variant="scaleIn" className="w-full h-full">
                  <ImageWrapper
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80"
                    alt="Engineered architecture representing structural technology and scale"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    containerClassName="w-full h-full shadow-[0_8px_30px_rgba(20,20,15,0.04)]"
                  />
                </Reveal>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. OUTCOMES CATALOG SLIDE (Grid: Outcome-Named Cards) */}
        <section
          id="catalog"
          className="slide-section py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="max-w-3xl mb-16">
              <SectionHeading
                tag="h2"
                subtitle="Outcome Catalog"
                withTriadMark
              >
                Five core areas of commercial transformation
              </SectionHeading>
              <p className="font-editorial text-[#57564C] text-base md:text-lg leading-relaxed mt-3">
                Every solution is delivered as clean, documented code and open architecture that you own outright. Zero vendor lock-in.
              </p>
            </div>

            <div className="space-y-16">
              {solutions.map((solution, idx) => {
                const Icon = iconMap[solution.icon] || Globe;
                return (
                  <div
                    key={solution.id}
                    id={solution.id}
                    className="scroll-mt-24 border-t border-[#DEDDD3] pt-12"
                  >
                    <Reveal variant="fadeUp" delay={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                      {/* Left: Outcome Definition */}
                      <div className="lg:col-span-5 flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-[2px] bg-[#E4E3DB] flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[#14140F] stroke-[1.5]" />
                          </div>
                          <span className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[#57564C]">
                            Outcome 0{idx + 1}
                          </span>
                        </div>

                        <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#14140F] leading-tight">
                          {solution.title}
                        </h3>

                        <p className="font-editorial text-[#57564C] text-base leading-relaxed">
                          {solution.description}
                        </p>

                        <div className="pt-2">
                          <Link href={`/contact?interest=${solution.id}`}>
                            <Button variant="primary" size="sm">
                              {solution.ctaText}
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Right: Commercial Impact & Services */}
                      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#E4E3DB] border border-[#DEDDD3] rounded-[2px] p-6 md:p-8">
                        <div className="flex flex-col gap-4">
                          <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[#14140F]">
                            Commercial Impact
                          </h4>
                          <p className="font-editorial text-sm text-[#57564C] leading-relaxed">
                            {solution.businessValue}
                          </p>

                          <div className="mt-2 pt-4 border-t border-[#DEDDD3]">
                            <h5 className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[#14140F] mb-1.5">
                              Ideal Context
                            </h5>
                            <p className="font-editorial text-xs text-[#57564C] leading-relaxed">
                              {solution.idealFor}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-4">
                          <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[#14140F]">
                            Capabilities Included
                          </h4>
                          <ul className="space-y-2.5">
                            {solution.services.map((service, index) => (
                              <li key={index} className="font-sans text-xs text-[#14140F] flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-[#14140F] mt-0.5 shrink-0" />
                                <span>{service}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* 3. BOTTLENECK ANALYSIS SLIDE (Centered / Full-Width Problem Breakdown) */}
        <section
          id="problems"
          className="slide-section min-h-[100dvh] flex items-center py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="max-w-4xl mx-auto flex flex-col gap-12 text-center items-center">
              <div className="flex flex-col gap-4 items-center">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#57564C] flex items-center gap-2">
                  <TriadMark size="sm" /> Operational Bottlenecks
                </span>
                <h2 className="font-heading text-3xl md:text-5xl font-bold text-[#14140F] tracking-tight">
                  When systems fail to keep pace with growth
                </h2>
                <p className="font-editorial text-lg text-[#57564C] max-w-2xl">
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
                    <h4 className="font-heading text-base font-bold text-[#14140F] mb-2 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#57564C]" />
                      <span>{item.title}</span>
                    </h4>
                    <p className="font-editorial text-sm text-[#57564C] leading-relaxed">
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
          className="slide-section min-h-[100dvh] flex items-center py-20 md:py-28 border-b border-[#DEDDD3]"
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
              <p className="font-editorial text-[#57564C] text-base md:text-lg leading-relaxed mt-3">
                Our engagement model minimizes operational risk through weekly live demonstrations and structured accountability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <Card
                  key={index}
                  variant="paper"
                  className="flex flex-col justify-between p-6 min-h-[280px]"
                >
                  <div>
                    <span className="font-sans text-xs font-semibold text-[#57564C] uppercase tracking-wider block mb-2">
                      {phase.step}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-[#14140F] mb-1">
                      {phase.title}
                    </h4>
                    <span className="font-editorial text-xs text-[#57564C] block mb-4 italic">
                      {phase.duration}
                    </span>
                    <p className="font-editorial text-sm text-[#57564C] leading-relaxed">
                      {phase.details}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* 5. FINAL INITIATE CTA SLIDE (Centered Action Block — 100vh narrative) */}
        <section
          id="cta"
          className="slide-section min-h-[100dvh] flex items-center justify-center py-20"
        >
          <Container>
            <CTA
              eyebrow="Initiate Solutions"
              headline="Ready to diagnose your technology bottlenecks?"
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
