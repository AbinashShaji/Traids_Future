// About page content implementing Design System v2 tokens, desktop slide-scroll world, and alternating layout rhythm.
"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { Button } from "../../components/button";
import { Card } from "../../components/card";
import { ImageWrapper } from "../../components/image-wrapper";
import { CTA } from "../../components/cta";
import { cn } from "../../utils/cn";
import { faqs, type FAQ } from "../../mock/faq";
import { Reveal } from "../../components/reveal";
import { TriadMark, TriadPanel } from "../../components/triad-mark";
import { ScrollWorldContainer } from "../../components/scroll-world-container";

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

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-[#DEDDD3] rounded-[2px] bg-[#F0F0EB] overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left font-sans font-semibold text-[#14140F] hover:bg-[#E4E3DB]/40 transition-colors"
      >
        <span className="text-sm md:text-base leading-snug">{faq.question}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-[#57564C] transition-transform duration-300 shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100 border-t border-[#DEDDD3]" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-6 font-editorial text-base text-[#57564C] leading-relaxed bg-[#E4E3DB]/30">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

const aboutSlides = [
  { id: "hero", label: "Manifesto" },
  { id: "story", label: "Foundations" },
  { id: "approach", label: "Triad Model" },
  { id: "principles", label: "Operating Principles" },
  { id: "faq", label: "Common Questions" },
  { id: "cta", label: "Next Step" },
];

export default function AboutPageContent() {
  const [openFaq, setOpenFaq] = React.useState<string | null>("faq-001");
  const faqsForPage = faqs.slice(0, 5);

  return (
    <GlobalLayout>
      <ScrollWorldContainer slides={aboutSlides}>
        {/* 1. HERO SLIDE (Centered / Full-Width Manifesto — 100vh narrative) */}
        <section
          id="hero"
          className="slide-section min-h-[100dvh] flex items-center pt-24 pb-16 md:pt-28 md:pb-20 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-[#57564C]">
                <TriadMark size="sm" />
                <span className="font-sans text-xs uppercase tracking-[0.14em] font-semibold">
                  Business Growth & Technology Partner
                </span>
              </div>

              <SectionHeading tag="h1" className="leading-[1.04]">
                We build the systems that power serious business growth.
              </SectionHeading>

              <p className="font-editorial text-[#57564C] text-lg md:text-2xl leading-relaxed max-w-2xl">
                Triads Future exists to help companies turn operational friction into competitive advantage through practical strategy, robust technology, and compounding execution.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
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
              </div>
            </div>
          </Container>
        </section>

        {/* 2. OUR STORY SLIDE (Split: Text Left / Narrative Visual Panel Right) */}
        <section
          id="story"
          className="slide-section py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 flex flex-col gap-6">
                <SectionHeading
                  tag="h2"
                  subtitle="Founding Thesis"
                  withTriadMark
                >
                  Built because modern business needs more than cosmetic redesigns.
                </SectionHeading>

                <p className="font-editorial text-[#14140F] text-lg leading-relaxed">
                  Triads Future was founded on a simple observation: growing businesses rarely need more agency jargon, disconnected freelancers, or fragile templates.
                </p>

                <p className="font-editorial text-[#57564C] text-base leading-relaxed">
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
            </div>
          </Container>
        </section>

        {/* 3. APPROACH SLIDE (Split: Triad Signature Panel Left / Narrative Right — 100vh narrative) */}
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
                  subtitle="Operating Model"
                  withTriadMark
                >
                  Strategy, technology, and execution unified.
                </SectionHeading>

                <p className="font-editorial text-[#14140F] text-lg leading-relaxed">
                  Hiring Triads Future should feel less like hiring an agency and more like gaining an experienced technology arm for your executive team.
                </p>

                <p className="font-editorial text-[#57564C] text-base leading-relaxed">
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
            </div>
          </Container>
        </section>

        {/* 4. OPERATING PRINCIPLES SLIDE (3-Column Grid) */}
        <section
          id="principles"
          className="slide-section py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="max-w-3xl mb-14">
              <SectionHeading
                tag="h2"
                subtitle="Core Principles"
                withTriadMark
              >
                Principles that govern our engineering and advisory
              </SectionHeading>
              <p className="font-editorial text-[#57564C] text-base md:text-lg leading-relaxed mt-3">
                These six rules dictate how we scope projects, select software stacks, and communicate with partners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, index) => (
                <Reveal
                  key={principle.title}
                  variant="fadeUp"
                  delay={index}
                >
                  <Card
                    hoverEffect
                    variant="bone"
                    className="p-7 flex flex-col justify-between h-full min-h-[220px]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="font-sans text-xs uppercase tracking-[0.14em] text-[#57564C] font-semibold">
                          0{index + 1}
                        </span>
                        <Sparkles className="w-4 h-4 text-[#14140F]" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-[#14140F] leading-tight mb-2">
                        {principle.title}
                      </h3>
                    </div>
                    <p className="font-editorial text-sm text-[#57564C] leading-relaxed mt-2">
                      {principle.description}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* 5. FAQ SLIDE (Split: Header Left / Accordion Rows Right) */}
        <section
          id="faq"
          className="slide-section py-20 md:py-28 border-b border-[#DEDDD3]"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-5 flex flex-col gap-5">
                <SectionHeading
                  tag="h2"
                  subtitle="Questions & Answers"
                  withTriadMark
                >
                  Straightforward answers to key questions.
                </SectionHeading>
                <p className="font-editorial text-[#57564C] text-base md:text-lg leading-relaxed">
                  These are the commercial questions clients ask before starting. We keep answers transparent so you can assess alignment immediately.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-4">
                {faqsForPage.map((faq) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openFaq === faq.id}
                    onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  />
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* 6. FINAL CTA SLIDE (Centered Action Block — 100vh narrative) */}
        <section
          id="cta"
          className="slide-section min-h-[100dvh] flex items-center justify-center py-20"
        >
          <Container>
            <CTA
              eyebrow="Direct Collaboration"
              headline="Ready to partner with senior operators?"
              description="Schedule a 30-minute diagnosis call with our leadership. We will discuss your current technology bottlenecks and provide practical commercial feedback."
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
