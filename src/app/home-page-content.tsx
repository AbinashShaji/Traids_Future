/**
 * FILE: src/app/page.tsx
 *
 * WHAT THIS DOES:
 * The main Homepage (/) of Triads Future.
 *
 * WHERE IT IS USED:
 * - Rendered when a visitor lands on the root domain URL (https://triadsfuture.com/).
 *
 * HOW IT WORKS:
 * 1. Organizes content into 9 sequential slides (`homeSlides`):
 *    - #hero: Centered editorial manifesto statement with staggered entrance.
 *    - #reality: Commercial philosophy & founder perspective.
 *    - #approach: The Triad model (Strategy -> Technology -> Execution).
 *    - #solutions: Capability highlights with quick action links.
 *    - #work: Selected featured case studies with client metrics.
 *    - #edge: Comparison grid (Why work with us vs traditional agencies).
 *    - #testimonials: Client reviews and quotes.
 *    - #insights: Featured thought leadership article.
 *    - #cta: Strategy consultation booking call to action.
 * 2. Wrapped in `<ScrollWorldContainer>` for desktop slide snapping.
 *
 * BEGINNER TIP:
 * If you want to change what visitors see on the homepage, this is the main file!
 */
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
import { EditorialTestimonial } from "../components/editorial-testimonial";
import { solutions } from "../mock/solutions";
import { type Project, type Testimonial, type BlogPost } from "@prisma/client";
import { getHeroContainerVariants, getHeroItemVariants, springFadeUpVariants, staggeredContainerVariants } from "../animations/presets";

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

interface HomePageContentProps {
  featuredProjects: Project[];
  featuredTestimonials: Testimonial[];
  featuredArticle: BlogPost | null;
}

export default function HomePageContent({ 
  featuredProjects, 
  featuredTestimonials, 
  featuredArticle 
}: HomePageContentProps) {
  const prefersReducedMotion = useReducedMotion();

  // Centralized hero staggered animation variants
  const heroContainerVariants = getHeroContainerVariants(prefersReducedMotion);
  const heroItemVariants = getHeroItemVariants(prefersReducedMotion);

  return (
    <GlobalLayout>
      <ScrollWorldContainer slides={homeSlides}>
        {/* 1. HERO SLIDE (Centered, Bold, Editorial Statement with Generous Negative Space — 100vh narrative) */}
        <section
          id="hero"
          className="slide-section min-h-[100dvh] flex flex-col justify-between pt-20 pb-8 md:pt-36 md:pb-12 border-b border-hairline relative overflow-hidden"
        >
          {/* Main Centered Content */}
          <Container className="my-auto">
            <motion.div
              variants={heroContainerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8 md:gap-10"
            >
              {/* Eyebrow with Triad Mark */}
              <motion.div
                variants={heroItemVariants}
                className="flex flex-col md:flex-row items-center justify-center gap-3 text-center"
              >
                <TriadMark size="sm" />
                <span className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-graphite">
                  Business Growth & Technology Partner
                </span>
              </motion.div>

              {/* Massive Centered Headline in Canela */}
              <h1 className="w-full text-center font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[96px] font-normal md:font-medium tracking-[-0.025em] leading-[1.03] text-ink">
                <motion.span
                  variants={{
                    hidden: { opacity: 1 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
                  }}
                  className="inline-block"
                >
                  {"Build Smarter.".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 40, rotateX: -45, filter: "blur(4px)" },
                        visible: { 
                          opacity: 1, 
                          y: 0, 
                          rotateX: 0,
                          filter: "blur(0px)",
                          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } 
                        }
                      }}
                      className="inline-block origin-bottom"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.span>
                <br />
                <motion.span
                  variants={{
                    hidden: { opacity: 1 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
                  }}
                  className="inline-block"
                >
                  {"Grow Faster.".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 40, rotateX: -45, filter: "blur(4px)" },
                        visible: { 
                          opacity: 1, 
                          y: 0, 
                          rotateX: 0,
                          filter: "blur(0px)",
                          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } 
                        }
                      }}
                      className="inline-block origin-bottom"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.span>
              </h1>

              {/* Short Supporting Statement */}
              <motion.p
                variants={heroItemVariants}
                className="font-editorial text-graphite text-lg sm:text-xl md:text-2xl lg:text-[26px] leading-relaxed max-w-2xl font-normal"
              >
                Strategy. Technology. Execution.<br className="hidden sm:inline" />
                All working together as one cohesive system.
              </motion.p>

              {/* Restrained Dual CTAs */}
              <motion.div
                variants={heroItemVariants}
                className="flex flex-wrap items-center justify-center gap-5 pt-2"
              >
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

        {/* 2. BUSINESS REALITY SLIDE (Asymmetric Bold Statement — 100vh narrative) */}
        <section
          id="reality"
          className="slide-section min-h-[100dvh] md:min-h-fit lg:min-h-[100dvh] flex items-center py-20 md:py-32 lg:py-28 border-b border-hairline"
        >
          <Container>
            <div className="max-w-4xl mx-auto">
              <Reveal variant="fadeUp">
                <div className="flex items-center gap-2 text-graphite mb-8">
                  <TriadMark size="sm" />
                  <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em]">
                    Operating Reality
                  </span>
                </div>
              </Reveal>

              <motion.blockquote 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={{
                  hidden: { opacity: 1 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
                }}
                className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal md:font-medium text-ink leading-[1.12] tracking-tight mb-10"
              >
                <motion.span 
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                  className="inline-block mr-2"
                >&ldquo;</motion.span>
                {"Most agencies sell complexity because it justifies retainers. We do the opposite. The best commercial system is the simplest one that solves the bottleneck.".split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20, filter: "blur(2px)" },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        filter: "blur(0px)",
                        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
                      }
                    }}
                    className="inline-block mr-[0.22em] pb-2"
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span 
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                  className="inline-block"
                >&rdquo;</motion.span>
              </motion.blockquote>

              <Reveal variant="fadeUp" delay={0.6}>
                <div className="flex items-center gap-4 pt-4 border-t border-hairline">
                  <div className="w-8 h-[2px] bg-ink" />
                  <p className="font-editorial text-base md:text-lg text-graphite">
                    Triads Future — Architecture & Strategy Leadership
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* 3. OUR APPROACH SLIDE (Split: 3-Part Triad Visual Model Left / Perspective Right — 100vh narrative) */}
        <section
          id="approach"
          className="slide-section min-h-[100dvh] md:min-h-fit lg:min-h-[100dvh] flex items-center py-16 md:py-24 lg:py-28 border-b border-hairline"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <Reveal variant="fadeIn">
                  <TriadPanel />
                </Reveal>
              </div>

              <div className="lg:col-span-6 flex flex-col gap-6">
                <Reveal variant="fadeUp">
                  <SectionHeading
                    tag="h2"
                    subtitle="Signature Model"
                    withTriadMark
                  >
                    Three disciplines. One unified execution.
                  </SectionHeading>

                  <p className="font-editorial text-ink text-lg md:text-xl leading-relaxed mt-4">
                    Working with Triads Future means gaining a dedicated technology and operations arm directly inside your executive team.
                  </p>

                  <p className="font-editorial text-graphite text-base md:text-lg leading-relaxed mt-3">
                    We eliminate disconnected agency handoffs. Senior operators design your strategy, write your production code, and deploy your workflows.
                  </p>

                  <div className="pt-4">
                    <Link href="/about">
                      <Button variant="text" size="md">
                        Read about our operating model →
                      </Button>
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>

        {/* 4. SOLUTIONS SLIDE (Asymmetric Outcome-Focused Grid — 100vh narrative) */}
        <section
          id="capabilities"
          className="slide-section min-h-[100dvh] md:min-h-fit lg:min-h-[100dvh] py-16 md:py-24 lg:py-28 border-b border-hairline"
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

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggeredContainerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {solutions.slice(0, 4).map((solution, idx) => {
                const Icon = iconMap[solution.icon] || Globe;
                return (
                  <motion.div
                    key={solution.id}
                    variants={springFadeUpVariants}
                    className="w-full h-full flex flex-col"
                  >
                    <Card
                      hoverEffect
                      className="flex flex-col justify-between h-full min-h-[340px]"
                    >
                      <div>
                        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-graphite block mb-4">
                          Outcome 0{idx + 1}
                        </span>
                        <div className="w-10 h-10 rounded-[2px] bg-bone flex items-center justify-center mb-5">
                          <Icon className="w-5 h-5 text-ink stroke-[1.5]" />
                        </div>
                        <h3 className="font-heading text-xl font-medium text-ink mb-3 leading-snug">
                          {solution.title}
                        </h3>
                        <p className="font-editorial text-sm text-graphite leading-relaxed mb-6">
                          {solution.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-hairline mt-auto">
                        <Link href={`/solutions#${solution.id}`}>
                          <span className="font-sans text-xs font-semibold text-ink inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
                            Explore Outcome →
                          </span>
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </Container>
        </section>

        {/* 5. FEATURED WORK SLIDE (Alternating Cards: Image Left/Right) */}
        <section
          id="work"
          className="slide-section min-h-[100dvh] md:min-h-fit lg:min-h-[100dvh] py-16 md:py-24 lg:py-28 border-b border-hairline"
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
                <motion.div
                  key={project.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      x: index % 2 === 0 ? 60 : -60 
                    },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        type: "spring",
                        stiffness: 70,
                        damping: 20,
                        duration: 0.8
                      }
                    }
                  }}
                >
                  <Card
                    hoverEffect
                    className="p-0 overflow-hidden border border-hairline"
                  >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                      }`}
                  >
                    {/* Image Container */}
                    <div className={`lg:col-span-6 relative aspect-[16/10] w-full ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <ImageWrapper
                        src={project.coverImage || ""}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        containerClassName="w-full h-full border-none rounded-none"
                      />
                    </div>

                    {/* Content Panel */}
                    <div className={`lg:col-span-6 p-8 lg:p-12 flex flex-col gap-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      <div className="flex items-center gap-3">
                        <span className="font-sans text-xs font-semibold text-ink uppercase tracking-wider">
                          {project.clientName}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-hairline" />
                        <Badge variant="filled">{project.industry}</Badge>
                      </div>

                      <h3 className="font-heading text-2xl md:text-3xl font-medium text-ink leading-tight">
                        <Link href={`/work/${project.slug}`} className="hover:underline">
                          {project.title}
                        </Link>
                      </h3>

                      <p className="font-editorial text-graphite text-base leading-relaxed">
                        {project.summary}
                      </p>

                      <div className="grid grid-cols-2 gap-6 py-4 border-y border-hairline my-1">
                        {((Array.isArray(project.results) ? project.results : []) as {metric: string, value: string}[]).slice(0, 2).map((res, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                            <span className="font-heading text-2xl md:text-3xl font-normal md:font-medium text-ink tracking-tight">
                              {res.value}
                            </span>
                            <span className="font-sans text-xs text-graphite leading-tight font-medium">
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
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* 6. WHY BUSINESSES GROW WITH US (4-Column Comparison Grid) */}
        <section
          id="edge"
          className="slide-section min-h-[100dvh] flex items-center py-12 md:py-24 lg:py-28 border-b border-hairline"
        >
          <Container>
            <Reveal variant="fadeUp">
              <div className="max-w-3xl mb-14">
                <SectionHeading
                  tag="h2"
                  subtitle="The Triad Advantage"
                  withTriadMark
                >
                  Why ambitious businesses choose us
                </SectionHeading>
                <p className="font-editorial text-graphite text-lg leading-relaxed mt-4">
                  We operate as commercial partners who build technology, not just contractors executing brief tickets.
                </p>
              </div>
            </Reveal>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.1,
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
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
                <motion.div
                  key={idx}
                  variants={springFadeUpVariants}
                  className="h-full"
                >
                  <Card
                    variant="bone"
                    className="flex flex-col justify-between min-h-[260px] h-full"
                  >
                    <span className="font-heading text-4xl font-normal text-ink/70 select-none">
                      {item.step}
                    </span>
                    <div className="mt-4">
                      <h4 className="font-heading text-lg font-medium text-ink mb-2">
                        {item.title}
                      </h4>
                      <p className="font-editorial text-sm text-graphite leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* 7. TESTIMONIALS SLIDE (Full-Width Editorial Pull-Quote) */}
        <section
          id="testimonials"
          className="slide-section min-h-[100dvh] flex items-center py-12 md:py-24 lg:py-28 border-b border-hairline"
        >
          <Container>
            <Reveal variant="fadeUp">
              <div className="max-w-4xl mx-auto">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-graphite flex items-center gap-2 mb-8">
                  <TriadMark size="sm" /> Partner Testimonial
                </span>

                <EditorialTestimonial testimonials={featuredTestimonials} />
              </div>
            </Reveal>
          </Container>
        </section>

        {/* 8. INSIGHTS SLIDE (Split: Image Left / Article Preview Right) */}
        {featuredArticle && (
          <section
            id="insights"
            className="slide-section min-h-[100dvh] flex items-center py-12 md:py-24 lg:py-28 border-b border-hairline"
          >
            <Container>
              <Reveal variant="fadeUp">
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
              </Reveal>

              <Reveal variant="fadeUp" delay={0.2}>
                <Card className="p-0 overflow-hidden border border-hairline">
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                    <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:h-[420px] w-full">
                      <ImageWrapper
                        src={featuredArticle.featuredImage || ""}
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
                          <span className="w-1 h-1 rounded-full bg-hairline" />
                          <span className="font-sans text-xs text-graphite">{featuredArticle.readingTime} min read</span>
                        </div>

                        <h3 className="font-heading text-2xl md:text-3xl font-medium text-ink leading-tight">
                          <Link href={`/insights/${featuredArticle.slug}`} className="hover:underline">
                            {featuredArticle.title}
                          </Link>
                        </h3>

                        <p className="font-editorial text-graphite text-base leading-relaxed">
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
              </Reveal>
            </Container>
          </section>
        )}

        {/* 9. FINAL STRATEGY CTA SLIDE (Centered Action Block — 100vh narrative) */}
        <section
          id="cta"
          className="slide-section min-h-[100dvh] flex items-center justify-center py-12 md:py-20"
        >
          <Container>
            <Reveal variant="fadeUp">
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
            </Reveal>
          </Container>
        </section>
      </ScrollWorldContainer>
    </GlobalLayout>
  );
}
