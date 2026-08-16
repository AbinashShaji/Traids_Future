// Homepage implementing Design System v2: Minimal, bold, centered, editorial statement hero and 9-slide desktop scroll-world.
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Globe, Monitor, Layers, Zap, TrendingUp, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { GlobalLayout } from "../components/global-layout";
import { Container } from "../components/container";
import { SectionHeading } from "../components/section-heading";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { Badge } from "../components/badge";
import { ImageWrapper } from "../components/image-wrapper";
import { CTA } from "../components/cta";
import { Reveal } from "../components/reveal";
import { TriadMark, TriadPanel } from "../components/triad-mark";
import { ScrollWorldContainer } from "../components/scroll-world-container";
import { solutions } from "../mock/solutions";
import { getFeaturedProjects } from "../mock/projects";
import { getFeaturedTestimonials } from "../mock/testimonials";
import { getFeaturedArticle } from "../mock/articles";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Monitor,
  Layers,
  Zap,
  TrendingUp,
};

const homeSlides = [
  { id: "hero", label: "Overview" },
  { id: "reality", label: "Philosophy" },
  { id: "approach", label: "Triad Model" },
  { id: "solutions", label: "Capabilities" },
  { id: "work", label: "Selected Work" },
  { id: "edge", label: "Why Us" },
  { id: "testimonials", label: "Client Voice" },
  { id: "insights", label: "Perspectives" },
  { id: "cta", label: "Next Step" },
];

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const featuredProjects = getFeaturedProjects();
  const featuredTestimonials = getFeaturedTestimonials();
  const featuredArticle = getFeaturedArticle();

  return (
    <GlobalLayout>
      <ScrollWorldContainer slides={homeSlides}>
        {/* 1. HERO SLIDE (Centered, Bold, Editorial Statement with Generous Negative Space — 100vh narrative) */}
        <section
          id="hero"
          className="slide-section min-h-[100dvh] flex flex-col justify-between pt-28 pb-10 md:pt-36 md:pb-12 border-b border-[#DEDDD3] relative overflow-hidden"
        >
          {/* Main Centered Content */}
          <Container className="my-auto">
            <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8 md:gap-10">
              {/* Eyebrow with Triad Mark */}
              <div className="flex items-center justify-center gap-3">
                <TriadMark size="sm" />
                <span className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[#57564C]">
                  Business Growth & Technology Partner
                </span>
              </div>

              {/* Massive Centered Headline in Canela */}
              <h1 className="font-hero text-5xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[94px] font-normal md:font-medium tracking-[-0.025em] leading-[1.03] text-[#14140F]">
                Build Smarter.<br />
                Grow Faster.
              </h1>

              {/* Short Supporting Statement */}
              <p className="font-editorial text-[#57564C] text-lg sm:text-xl md:text-2xl lg:text-[26px] leading-relaxed max-w-2xl font-normal">
                Strategy. Technology. Execution.<br className="hidden sm:inline" />
                All working together as one cohesive system.
              </p>

              {/* Restrained Dual CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Book a Strategy Call
                  </Button>
                </Link>
                <Link href="/work">
                  <Button variant="outline" size="lg" className="group">
                    Explore Our Work
                    <ArrowRight className="inline-block w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>

          {/* Subtle Bottom-Centered Scroll Indicator */}
          <div className="w-full flex flex-col items-center justify-center gap-2 text-[#57564C] select-none pt-4">
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
              transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1.5"
            >
              <ArrowDown className="w-3.5 h-3.5 stroke-[1.5]" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-[#57564C]/80">
                Scroll
              </span>
            </motion.div>
          </div>
        </section>

        {/* 2. BUSINESS REALITY SLIDE (Asymmetric Bold Statement — 100vh narrative) */}
        <section
          id="reality"
          className="slide-section min-h-[100dvh] flex items-center py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 text-[#57564C] mb-8">
                <TriadMark size="sm" />
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em]">
                  Operating Reality
                </span>
              </div>

              <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#14140F] leading-[1.12] tracking-tight mb-10">
                &ldquo;Most agencies sell complexity because it justifies retainers. We do the opposite. The best commercial system is the simplest one that solves the bottleneck.&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 pt-4 border-t border-[#DEDDD3]">
                <div className="w-8 h-[2px] bg-[#14140F]" />
                <p className="font-editorial text-base md:text-lg text-[#57564C]">
                  Triads Future — Architecture & Strategy Leadership
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. OUR APPROACH SLIDE (Split: 3-Part Triad Visual Model Left / Perspective Right — 100vh narrative) */}
        <section
          id="approach"
          className="slide-section min-h-[100dvh] flex items-center py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <TriadPanel />
              </div>

              <div className="lg:col-span-6 flex flex-col gap-6">
                <SectionHeading
                  tag="h2"
                  subtitle="Signature Model"
                  withTriadMark
                >
                  Three disciplines. One unified execution.
                </SectionHeading>

                <p className="font-editorial text-[#14140F] text-lg md:text-xl leading-relaxed">
                  Working with Triads Future means gaining a dedicated technology and operations arm directly inside your executive team.
                </p>

                <p className="font-editorial text-[#57564C] text-base md:text-lg leading-relaxed">
                  We eliminate disconnected agency handoffs. Senior operators design your strategy, write your production code, and deploy your workflows.
                </p>

                <div className="pt-2">
                  <Link href="/about">
                    <Button variant="text" size="md">
                      Read about our operating model →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 4. SOLUTIONS SLIDE (Asymmetric 2x2 Outcome-Focused Grid — 100vh narrative) */}
        <section
          id="solutions"
          className="slide-section min-h-[100dvh] flex items-center py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <SectionHeading
                tag="h2"
                subtitle="Commercial Solutions"
                withTriadMark
              >
                Engineered for compound growth
              </SectionHeading>
              <Link href="/solutions">
                <Button variant="text" size="sm">
                  Explore all solutions →
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solutions.slice(0, 4).map((solution, idx) => {
                const Icon = iconMap[solution.icon] || Globe;
                return (
                  <Reveal
                    key={solution.id}
                    variant="fadeUp"
                    delay={idx}
                    className="w-full h-full flex flex-col"
                  >
                    <Card
                      hoverEffect
                      className="flex flex-col justify-between h-full min-h-[340px]"
                    >
                      <div>
                        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-[#57564C] block mb-4">
                          Outcome 0{idx + 1}
                        </span>
                        <div className="w-10 h-10 rounded-[2px] bg-[#E4E3DB] flex items-center justify-center mb-5">
                          <Icon className="w-5 h-5 text-[#14140F] stroke-[1.5]" />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-[#14140F] mb-3 leading-snug">
                          {solution.title}
                        </h3>
                        <p className="font-editorial text-sm text-[#57564C] leading-relaxed mb-6">
                          {solution.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#DEDDD3] mt-auto">
                        <Link href={`/solutions#${solution.id}`}>
                          <span className="font-sans text-xs font-semibold text-[#14140F] inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
                            Explore Outcome →
                          </span>
                        </Link>
                      </div>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

        {/* 5. FEATURED WORK SLIDE (Alternating Cards: Image Left/Right) */}
        <section
          id="work"
          className="slide-section min-h-[100dvh] flex items-center py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <SectionHeading
                tag="h2"
                subtitle="Case Studies"
                withTriadMark
              >
                Selected client outcomes
              </SectionHeading>
              <Link href="/work">
                <Button variant="text" size="sm">
                  View all case studies →
                </Button>
              </Link>
            </div>

            <div className="space-y-12">
              {featuredProjects.slice(0, 2).map((project, index) => (
                <Card
                  key={project.id}
                  hoverEffect
                  className="p-0 overflow-hidden border border-[#DEDDD3]"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 items-center ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Image Container */}
                    <div className={`lg:col-span-6 relative aspect-[16/10] w-full ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <ImageWrapper
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        containerClassName="w-full h-full border-none rounded-none"
                      />
                    </div>

                    {/* Content Panel */}
                    <div className={`lg:col-span-6 p-8 lg:p-12 flex flex-col gap-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      <div className="flex items-center gap-3">
                        <span className="font-sans text-xs font-semibold text-[#14140F] uppercase tracking-wider">
                          {project.client}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[#DEDDD3]" />
                        <Badge variant="filled">{project.industry}</Badge>
                      </div>

                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#14140F] leading-tight">
                        <Link href={`/work/${project.slug}`} className="hover:underline">
                          {project.title}
                        </Link>
                      </h3>

                      <p className="font-editorial text-[#57564C] text-base leading-relaxed">
                        {project.summary}
                      </p>

                      <div className="grid grid-cols-2 gap-6 py-4 border-y border-[#DEDDD3] my-1">
                        {project.results.slice(0, 2).map((res, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                            <span className="font-heading text-2xl md:text-3xl font-bold text-[#14140F] tracking-tight">
                              {res.value}
                            </span>
                            <span className="font-sans text-xs text-[#57564C] leading-tight font-medium">
                              {res.metric}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div>
                        <Link href={`/work/${project.slug}`}>
                          <Button variant="text" size="sm">
                            Read full case study →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* 6. WHY BUSINESSES GROW WITH US (4-Column Comparison Grid) */}
        <section
          id="edge"
          className="slide-section min-h-[100dvh] flex items-center py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="max-w-3xl mb-14">
              <SectionHeading
                tag="h2"
                subtitle="The Triad Advantage"
                withTriadMark
              >
                Why ambitious businesses choose us
              </SectionHeading>
              <p className="font-editorial text-[#57564C] text-lg leading-relaxed mt-4">
                We operate as commercial partners who build technology, not just contractors executing brief tickets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Direct Senior Access",
                  description: "You partner directly with senior operators who design and build the work. Zero account layers, zero translation loss.",
                },
                {
                  step: "02",
                  title: "Maintainable Tech",
                  description: "We use robust, modern, and open web standards. No proprietary lock-in; any skilled engineering team can maintain our code.",
                },
                {
                  step: "03",
                  title: "Commercial Focus",
                  description: "We measure project success by commercial outcomes: operational hours saved, client portal retention, and qualified pipeline growth.",
                },
                {
                  step: "04",
                  title: "Monochrome Restraint",
                  description: "Our design avoids fleeting visual trends. We craft quiet, timeless interfaces that establish enduring brand authority.",
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  variant="bone"
                  className="flex flex-col justify-between min-h-[260px]"
                >
                  <span className="font-heading text-4xl font-bold text-[#14140F]/30 select-none">
                    {item.step}
                  </span>
                  <div className="mt-4">
                    <h4 className="font-heading text-lg font-bold text-[#14140F] mb-2">
                      {item.title}
                    </h4>
                    <p className="font-editorial text-sm text-[#57564C] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* 7. TESTIMONIALS SLIDE (Full-Width Editorial Pull-Quote) */}
        <section
          id="testimonials"
          className="slide-section min-h-[100dvh] flex items-center py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="max-w-4xl mx-auto">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#57564C] flex items-center gap-2 mb-8">
                <TriadMark size="sm" /> Partner Testimonial
              </span>

              {featuredTestimonials.slice(0, 1).map((t) => (
                <div
                  key={t.id}
                  className="bg-[#E4E3DB] rounded-[2px] p-8 md:p-14 border border-[#DEDDD3]"
                >
                  <blockquote className="font-editorial italic text-2xl md:text-3xl lg:text-[34px] leading-snug text-[#14140F] mb-8">
                    &ldquo;{t.review}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4 border-t border-[#DEDDD3] pt-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#DEDDD3]">
                      <ImageWrapper
                        src={t.photo}
                        alt={t.clientName}
                        fill
                        sizes="48px"
                        containerClassName="w-full h-full border-none"
                      />
                    </div>
                    <div>
                      <cite className="font-sans text-sm font-semibold text-[#14140F] not-italic block">
                        {t.clientName}
                      </cite>
                      <span className="font-sans text-xs text-[#57564C] block mt-0.5">
                        {t.clientRole}, {t.company}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 8. INSIGHTS SLIDE (Split: Image Left / Article Preview Right) */}
        {featuredArticle && (
          <section
            id="insights"
            className="slide-section min-h-[100dvh] flex items-center py-20 md:py-28 border-b border-[#DEDDD3]"
          >
            <Container>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <SectionHeading
                  tag="h2"
                  subtitle="Strategic Insights"
                  withTriadMark
                >
                  Perspectives on technology and growth
                </SectionHeading>
                <Link href="/insights">
                  <Button variant="text" size="sm">
                    Read all articles →
                  </Button>
                </Link>
              </div>

              <Card className="p-0 overflow-hidden border border-[#DEDDD3]">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:h-[420px] w-full">
                    <ImageWrapper
                      src={featuredArticle.coverImage}
                      alt={featuredArticle.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      containerClassName="w-full h-full border-none rounded-none"
                    />
                  </div>
                  <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <Badge variant="filled">{featuredArticle.category}</Badge>
                        <span className="w-1 h-1 rounded-full bg-[#DEDDD3]" />
                        <span className="font-sans text-xs text-[#57564C]">{featuredArticle.readingTime} min read</span>
                      </div>

                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#14140F] leading-tight">
                        <Link href={`/insights/${featuredArticle.slug}`} className="hover:underline">
                          {featuredArticle.title}
                        </Link>
                      </h3>

                      <p className="font-editorial text-[#57564C] text-base leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>
                    </div>

                    <div>
                      <Link href={`/insights/${featuredArticle.slug}`}>
                        <Button variant="text" size="sm">
                          Read full article →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        )}

        {/* 9. FINAL STRATEGY CTA SLIDE (Centered Action Block — 100vh narrative) */}
        <section
          id="cta"
          className="slide-section min-h-[100dvh] flex items-center justify-center py-20"
        >
          <Container>
            <CTA
              eyebrow="Initiate Partnership"
              headline="Ready to scale your business operations?"
              description="Book a confidential, 30-minute consultation call. We will review your current technical bottlenecks and provide a practical roadmap. No pushy sales pitch, just real feedback."
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
