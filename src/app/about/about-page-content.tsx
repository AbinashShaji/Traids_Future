/**
 * FILE: src/app/about/about-page-content.tsx
 *
 * About page reconstructed with clean line borders, trustworthy non-technical language,
 * and zero pill badges or bracket labels.
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../../components/container";
import { ButtonLink } from "../../components/button-link";
import { ImageWrapper } from "../../components/image-wrapper";
import { GlobalLayout } from "../../components/global-layout";
import { TeamShowcase } from "../../components/team-showcase";
import { FAQItem } from "../../components/faq-item";
import { TriadPanel } from "../../components/triad-mark";
import { WordReveal } from "../../components/word-reveal";
import { Reveal } from "../../components/reveal";
import { HeroSupport } from "../../components/hero-reveal";
import { teamMembers } from "../../mock/team";
import { type FAQ } from "@/mock/faq";

const principles = [
  {
    num: "01",
    title: "Business value comes first",
    description: "We focus on what saves your team time, cuts unnecessary costs, or helps bring in more revenue. We never recommend tech for the sake of trends.",
  },
  {
    num: "02",
    title: "Simple and reliable beats complex",
    description: "We build on standard, widely supported tools. This ensures your systems don't break unexpectedly and can be easily managed by any developer.",
  },
  {
    num: "03",
    title: "Live progress every week",
    description: "You never wonder what's being built. Every week we share working demos and screen walkthroughs so you see real progress as it happens.",
  },
  {
    num: "04",
    title: "You own 100% of your technology",
    description: "From day one, you own all the source code, user data, cloud accounts, and design files. No proprietary agency locks or hidden retainers.",
  },
  {
    num: "05",
    title: "Clear, honest communication",
    description: "You work directly with the senior people doing the work. No junior account managers or sales runarounds. Just honest, straight answers.",
  },
  {
    num: "06",
    title: "Clean design builds client trust",
    description: "A fast, polished, and straightforward website immediately shows your customers that you take your business seriously.",
  },
];

interface AboutPageContentProps {
  faqs: FAQ[];
}

export default function AboutPageContent({ faqs }: AboutPageContentProps) {
  const [openFaq, setOpenFaq] = React.useState<string | null>(null);
  const faqsForPage = faqs.slice(0, 5);

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
          <WordReveal
            text="We build technology that helps companies operate better and grow."
            as="h1"
            className="text-[2.25rem] min-[380px]:text-[2.75rem] min-[440px]:text-[3.25rem] sm:text-6xl md:text-7xl lg:text-[5.75rem] xl:text-[6.5rem] font-bold tracking-tighter text-[#0a0a0a] leading-[0.98] mb-5 sm:mb-6 md:mb-8 max-w-5xl mx-auto"
          />

          <HeroSupport delayMs={300} className="w-full">
            <p className="text-sm sm:text-base md:text-lg text-[#52525b] font-normal max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-10">
              Triads Future partners with business owners to eliminate repetitive manual work, streamline customer experiences, and build custom web software that stands the test of time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full sm:w-auto">
              <ButtonLink href="/contact" variant="primary" size="lg" className="w-full sm:w-auto px-7 sm:px-9 md:px-10 py-3.5 sm:py-4 rounded-full bg-[#0a0a0a] hover:bg-[#e11d48] text-white font-medium text-sm sm:text-base shadow-lg shadow-black/10 hover:shadow-red-500/20 transition-all duration-300">
                Book a Strategy Call
              </ButtonLink>
              <ButtonLink href="#our-approach" variant="outline" size="lg" className="w-full sm:w-auto px-7 sm:px-9 md:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base">
                How We Work
              </ButtonLink>
            </div>
          </HeroSupport>
        </Container>
      </section>

      {/* 2. FOUNDING STORY (Clean Lined 2-Column Split) */}
      <section id="our-approach" className="py-20 md:py-32 bg-[#fafafa] border-b border-[#e4e4e7] scroll-mt-24">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal variant="slideLeft" className="lg:col-span-6 flex flex-col gap-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48]">
                Why We Exist
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] leading-tight">
                Built because growing businesses need real solutions, not buzzwords.
              </h2>
              <p className="text-base sm:text-lg text-[#0a0a0a] font-medium leading-relaxed">
                Most agencies give you fancy presentations and junior handoffs. When things go wrong, they blame third-party plugins.
              </p>
              <p className="text-sm sm:text-base text-[#71717a] leading-relaxed">
                We founded Triads Future to be the partner we wished we had: experienced engineers and business operators who take full responsibility, talk in plain English, and build software that genuinely supports your daily business operations.
              </p>
              <div className="pt-2">
                <Link 
                  href="/work" 
                  className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] hover:text-[#e11d48] transition-colors inline-flex items-center gap-1.5 fz-link-underline"
                >
                  <span>See client projects we have completed</span> <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Reveal>

            <Reveal variant="slideRight" delay={1} className="lg:col-span-6 aspect-[4/3] relative overflow-hidden border border-[#e4e4e7] bg-white">
              <ImageWrapper
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900&q=80"
                alt="Strategy and business technology planning"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                containerClassName="w-full h-full border-none rounded-none"
                className="object-cover"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 3. OPERATING MODEL (The Triad) */}
      <section className="py-20 md:py-32 bg-white border-b border-[#e4e4e7]">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal variant="slideLeft" className="lg:col-span-6">
              <TriadPanel />
            </Reveal>

            <Reveal variant="slideRight" delay={1} className="lg:col-span-6 flex flex-col gap-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48]">
                Our Philosophy
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] leading-tight">
                Strategy, technology, and execution working as one.
              </h2>
              <p className="text-base sm:text-lg text-[#0a0a0a] font-medium leading-relaxed">
                Software only works when it connects directly with how your company makes money and serves customers.
              </p>
              <p className="text-sm sm:text-base text-[#71717a] leading-relaxed">
                By uniting business strategy, robust technology, and dependable execution, we make sure every project delivers real ROI — whether that is cutting turnaround times, automating billing, or delighting your end customers.
              </p>
              <div className="pt-2">
                <ButtonLink href="/solutions" variant="outline" size="md">
                  Explore Solutions →
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 4. 6 CORE PRINCIPLES (Clean Aligned 3-Column Grid) */}
      <section className="py-20 md:py-32 bg-[#fafafa] border-b border-[#e4e4e7]">
        <Container size="default">
          <Reveal variant="fadeUp" className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-2">
              Our Commitments
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a]">
              The standards we stand by on every project.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {principles.map((p, idx) => (
              <Reveal 
                key={p.num} 
                variant="fadeUp" 
                delay={idx + 1}
                className="h-full"
              >
                <div className="fz-card p-8 sm:p-10 flex flex-col justify-between bg-white border border-[#e4e4e7] rounded-2xl hover:border-[#0a0a0a] transition-all h-full">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#71717a] fz-scroll-num block mb-3">{p.num}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0a0a0a] mb-3 tracking-tight">{p.title}</h3>
                  </div>
                  <p className="text-sm text-[#71717a] leading-relaxed mt-2">
                    {p.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. TEAM & LEADERSHIP */}
      <section className="py-20 md:py-32 bg-white border-b border-[#e4e4e7]">
        <TeamShowcase
          members={teamMembers}
          eyebrow="Leadership"
          heading="The people building your technology."
          subheading="We are hands-on builders who work directly with you. You always know who is writing your code and designing your systems."
        />
      </section>

      {/* 6. FAQ ACCORDION (Clean 2-Column Lined Split) */}
      <section id="faq" className="py-20 md:py-32 bg-[#fafafa] border-b border-[#e4e4e7] scroll-mt-24">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <Reveal variant="fadeUp" className="lg:col-span-5 flex flex-col gap-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48]">
                Common Questions
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a]">
                Straight answers to what clients ask most.
              </h2>
              <p className="text-base text-[#71717a] leading-relaxed">
                Clear details on how we scope projects, deliver weekly updates, hand over full code ownership, and support you after launch.
              </p>
              <div className="pt-2">
                <ButtonLink href="/contact" variant="primary" size="md">
                  Have another question? Ask us directly →
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal variant="fadeUp" delay={1} className="lg:col-span-7 flex flex-col gap-4">
              {faqsForPage.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFaq === faq.id}
                  onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                />
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-24 md:py-36 bg-white">
        <Container size="narrow" className="text-center flex flex-col items-center">
          <Reveal variant="fadeUp" className="flex flex-col items-center text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-3">
              Start A Conversation
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a0a0a] leading-[1.1] max-w-2xl mb-6">
              Ready to upgrade how your business operates?
            </h2>
            <p className="text-base sm:text-lg text-[#71717a] leading-relaxed max-w-xl font-normal mb-10">
              Book an introductory 30-minute call with our team. We will review your current systems, spot bottlenecks, and outline practical next steps.
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
