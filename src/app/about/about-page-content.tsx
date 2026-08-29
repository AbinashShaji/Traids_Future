/**
 * FILE: src/app/about/about-page-content.tsx
 *
 * WHAT THIS DOES:
 * Powers the interactive content for the About page (/about).
 *
 * WHERE IT IS USED:
 * - Loaded by `src/app/about/page.tsx` when visitors navigate to `/about`.
 *
 * HOW IT WORKS:
 * 1. Organizes the company story into 6 desktop slides (`aboutSlides`):
 *    - #hero: The founding manifesto ("Software should generate leverage, not complexity").
 *    - #story: The company origin story and founding philosophy.
 *    - #operating-model: The 3-phase Triad framework with `<TriadPanel>`.
 *    - #principles: The 6 non-negotiable engineering and business rules.
 *    - #team: The dynamic team showcase (`<TeamShowcase>`) displaying leaders and specialists.
 *    - #faq: Frequently asked questions using the shared `<FAQItem>` accordion component.
 * 2. Uses `<ScrollWorldContainer>` for desktop slide snapping.
 *
 * BEGINNER TIP:
 * If you want to change company principles, story text, or team sections, start here!
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
} from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { Button } from "../../components/button";
import { Card } from "../../components/card";
import { ImageWrapper } from "../../components/image-wrapper";
import { CTA } from "../../components/cta";
import { teamMembers } from "../../mock/team";
import { type FAQ } from "@/mock/faq";
import { Reveal } from "../../components/reveal";
import { TriadMark, TriadPanel } from "../../components/triad-mark";
import { ScrollWorldContainer } from "../../components/scroll-world-container";
import { TeamShowcase } from "../../components/team-showcase";
import { FAQItem } from "../../components/faq-item";
import { staggeredContainerVariants, standardFadeUpVariants, springFadeUpVariants } from "../../animations/presets";

const principles = [
  {
    title: "Business first, always",
    description: "We begin with commercial leverage, not tool trends. Every technical decision must directly improve margin, turnaround time, or customer conversion.",
  },
  {
    title: "Standard beats clever",
    description: "We build with proven, open-source architecture that your internal developers can comfortably maintain. Zero bespoke vendor lock-in.",
  },
  {
    title: "Visible weekly progress",
    description: "Engagements are delivered in rapid weekly sprints. You review working software on staging with recorded walkthroughs every Friday.",
  },
  {
    title: "Complete client IP ownership",
    description: "You retain 100% ownership of your source repositories, design systems, data pipelines, and cloud accounts from day one.",
  },
  {
    title: "Measurable commercial metrics",
    description: "We track project success through business outcomes: pipeline velocity, operational hours saved, and client portal retention.",
  },
  {
    title: "Quiet design builds trust",
    description: "A calm, structured interface signals competence before a visitor reads a single sentence. Restraint is a commercial asset.",
  },
];

const aboutSlides = [
  { id: "hero", label: "Manifesto" },
  { id: "story", label: "Foundations" },
  { id: "approach", label: "Triad Model" },
  { id: "principles", label: "Operating Principles" },
  { id: "team", label: "The People" },
  { id: "faq", label: "Common Questions" },
  { id: "cta", label: "Next Step" },
];

interface AboutPageContentProps {
  faqs: FAQ[];
}

export default function AboutPageContent({ faqs }: AboutPageContentProps) {
  const [openFaq, setOpenFaq] = React.useState<string | null>(null);
  const faqsForPage = faqs.slice(0, 5);

  return (
    <GlobalLayout>
      <ScrollWorldContainer slides={aboutSlides}>
        {/* 1. HERO SLIDE (Centered / Full-Width Manifesto — 100vh narrative) */}
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
              <motion.div variants={standardFadeUpVariants} className="flex items-center gap-2 text-graphite">
                <TriadMark size="sm" />
                <span className="font-sans text-xs uppercase tracking-[0.14em] font-semibold">
                  Business Growth & Technology Partner
                </span>
              </motion.div>

              <motion.div variants={standardFadeUpVariants} className="flex flex-col items-center">
                <SectionHeading tag="h1" className="leading-[1.04]">
                  We build the systems that power serious business growth.
                </SectionHeading>
              </motion.div>

              <motion.p variants={standardFadeUpVariants} className="font-editorial text-graphite text-lg md:text-2xl leading-relaxed max-w-2xl">
                Triads Future exists to help companies turn operational friction into competitive advantage through practical strategy, robust technology, and compounding execution.
              </motion.p>

              <motion.div variants={standardFadeUpVariants} className="flex flex-wrap items-center justify-center gap-4 pt-3">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Book a Strategy Call
                  </Button>
                </Link>
                <a href="#story">
                  <Button variant="outline" size="lg">
                    Read Our Story
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* 2. OUR STORY SLIDE (Split: Text Left / Narrative Visual Panel Right) */}
        <section
          id="story"
          className="slide-section py-12 md:py-24 lg:py-28 border-b border-hairline"
        >
          <Container>
            <Reveal variant="fadeUp" className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 flex flex-col gap-6">
                <SectionHeading
                  tag="h2"
                  subtitle="Founding Thesis"
                  withTriadMark
                >
                  Built because modern business needs more than cosmetic redesigns.
                </SectionHeading>

                <p className="font-editorial text-ink text-lg leading-relaxed">
                  Triads Future was founded on a simple observation: growing businesses rarely need more agency jargon, disconnected freelancers, or fragile templates.
                </p>

                <p className="font-editorial text-graphite text-base leading-relaxed">
                  They need a reliable technical partner who understands commercial operations and can build systems that withstand scale. We operate as senior leaders who design, code, and execute together.
                </p>

                <div className="pt-2">
                  <Link href="/work">
                    <Button variant="text" size="sm">
                      Review our production work →
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 aspect-[4/3] relative">
                <ImageWrapper
                  src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900&q=80"
                  alt="Strategic engineering and operational architecture planning"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  containerClassName="w-full h-full shadow-[0_8px_30px_rgba(20,20,15,0.04)]"
                />
              </div>
            </Reveal>
          </Container>
        </section>

        {/* 3. APPROACH SLIDE (Split: Triad Signature Panel Left / Narrative Right — 100vh narrative) */}
        <section
          id="approach"
          className="slide-section min-h-[100dvh] flex items-center py-12 md:py-24 lg:py-28 border-b border-hairline"
        >
          <Container>
            <Reveal variant="fadeUp" className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <TriadPanel />
              </div>

              <div className="lg:col-span-6 flex flex-col gap-6">
                <SectionHeading
                  tag="h2"
                  subtitle="Operating Model"
                  withTriadMark
                >
                  Strategy, technology, and execution unified.
                </SectionHeading>

                <p className="font-editorial text-ink text-lg leading-relaxed">
                  Hiring Triads Future should feel less like hiring an agency and more like gaining an experienced technology arm for your executive team.
                </p>

                <p className="font-editorial text-graphite text-base leading-relaxed">
                  We maintain zero account-management layers. You work directly with the senior strategists and engineers responsible for building and shipping your systems.
                </p>

                <div className="pt-2">
                  <Link href="/solutions">
                    <Button variant="outline" size="md">
                      Explore Solutions
                    </Button>
                  </Link>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* 4. OPERATING PRINCIPLES SLIDE (3-Column Grid) */}
        <section
          id="principles"
          className="slide-section py-12 md:py-24 lg:py-28 border-b border-hairline"
        >
          <Container>
            <Reveal variant="fadeUp">
              <div className="max-w-3xl mb-14">
                <SectionHeading
                  tag="h2"
                  subtitle="Core Principles"
                  withTriadMark
                >
                  Principles that govern our engineering and advisory
                </SectionHeading>
                <p className="font-editorial text-graphite text-base md:text-lg leading-relaxed mt-3">
                  These six rules dictate how we scope projects, select software stacks, and communicate with partners.
                </p>
              </div>
            </Reveal>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggeredContainerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8"
              >
              {principles.map((principle, index) => (
                  <motion.div
                    key={index}
                    variants={springFadeUpVariants}
                    className="h-full"
                  >
                  <Card
                    hoverEffect
                    variant="bone"
                    className="p-7 flex flex-col justify-between h-full min-h-[220px]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="font-sans text-xs uppercase tracking-[0.14em] text-graphite font-semibold">
                          0{index + 1}
                        </span>
                        <Sparkles className="w-4 h-4 text-ink" />
                      </div>
                      <h3 className="font-heading text-lg font-medium text-ink leading-tight mb-2">
                        {principle.title}
                      </h3>
                    </div>
                    <p className="font-editorial text-sm text-graphite leading-relaxed mt-2">
                      {principle.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* 5. TEAM & PEOPLE SLIDE (Dynamic CMS-Ready Editorial Showcase) */}
        <section
          id="team"
          className="slide-section min-h-[100dvh] flex items-center py-12 md:py-24 lg:py-28 border-b border-hairline"
        >
          <TeamShowcase
            members={teamMembers}
            eyebrow="The People Behind Triads Future"
            heading="The people turning strategy into something real."
            subheading="We operate as active practitioners and senior partners who design, code, and deploy directly with our clients."
          />
        </section>

        {/* 6. FAQ SLIDE (Split: Header Left / Accordion Rows Right) */}
        <section
          id="faq"
          className="slide-section py-12 md:py-24 lg:py-28 border-b border-hairline"
        >
          <Container>
            <Reveal variant="fadeUp" className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-5 flex flex-col gap-6">
                <SectionHeading
                  tag="h2"
                  subtitle="FAQ"
                  withTriadMark
                >
                  Frequently asked questions
                </SectionHeading>
                <p className="font-editorial text-graphite text-base md:text-lg leading-relaxed">
                  Clear answers about our engagement models, commercial terms, software handover, and sprint rhythms.
                </p>
                <div className="pt-2">
                  <Link href="/contact">
                    <Button variant="primary" size="md">
                      Have a specific question? Talk to us →
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-4">
                {faqsForPage.map((faq) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openFaq === faq.id}
                    onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  />
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        {/* 7. NEXT STEP CTA */}
        <section
          id="cta"
          className="slide-section min-h-[100dvh] flex items-center justify-center py-12 md:py-20"
        >
          <Container>
            <Reveal variant="fadeUp">
              <CTA
                eyebrow="Initiate Partnership"
                headline="Ready to scale your business operations?"
                description="Schedule a 30-minute diagnosis call with our senior leadership. We will evaluate your technical friction and outline a compound growth strategy."
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
