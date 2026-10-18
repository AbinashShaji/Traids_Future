/**
 * FILE: src/app/solutions/page.tsx
 *
 * Solutions page aligned with FinZave line-border architecture and clear business language.
 * - Removed pill badges and bracket tags.
 * - Hairline row dividers replacing heavy rounded cards.
 * - Plain-English explanations understandable by non-technical founders.
 * - Lightweight observe-me scroll transitions.
 */

import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  Check, 
  Layers, 
  Cpu, 
  Database, 
  ShieldCheck, 
  ArrowUpRight 
} from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";
import { ButtonLink } from "../../components/button-link";
import { WordReveal } from "../../components/word-reveal";
import { Reveal } from "../../components/reveal";
import { HeroSupport } from "../../components/hero-reveal";
import { solutions } from "../../mock/solutions";

export const metadata: Metadata = {
  title: "Solutions — Triads Future",
  description: "Custom web software, automated workflows, and digital infrastructure built to help growing businesses run smoothly and scale.",
};

const domainIcons = [Layers, Cpu, Database, ShieldCheck];

export default function SolutionsPage() {
  return (
    <GlobalLayout>
      {/* 1. HERO */}
      <section className="min-h-[calc(100svh-72px)] sm:min-h-[calc(100vh-72px)] max-h-[950px] flex flex-col justify-center py-8 sm:py-12 md:py-16 lg:py-20 bg-white border-b border-[#e4e4e7] relative overflow-hidden">
        {/* Subtle Ambient Radial Glow Orb matching FinZave forensic spec */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] md:w-[800px] h-[500px] sm:h-[700px] md:h-[800px] bg-gradient-to-tr from-[#f4f4f5] to-white rounded-full blur-[100px] -z-10 opacity-60 pointer-events-none" 
          aria-hidden="true" 
        />        <Container size="default" className="text-center flex flex-col items-center justify-center my-auto relative z-10 px-4 sm:px-6 md:px-8">
          <WordReveal
            text="Software built to help your business run smoothly and scale."
            as="h1"
            className="text-[2.25rem] min-[380px]:text-[2.75rem] min-[440px]:text-[3.25rem] sm:text-6xl md:text-7xl lg:text-[5.75rem] xl:text-[6.5rem] font-bold tracking-tighter text-[#0a0a0a] leading-[0.98] mb-5 sm:mb-6 md:mb-8 max-w-5xl mx-auto"
          />

          <HeroSupport delayMs={300} className="w-full">
            <p className="text-sm sm:text-base md:text-lg text-[#52525b] font-normal max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-10">
              We design and build custom client portals, automated business workflows, and modern web platforms that save your team hours every week and give you total control over your technology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full sm:w-auto">
              <ButtonLink href="/contact" variant="primary" size="lg" className="w-full sm:w-auto px-7 sm:px-9 md:px-10 py-3.5 sm:py-4 rounded-full bg-[#0a0a0a] hover:bg-[#e11d48] text-white font-medium text-sm sm:text-base shadow-lg shadow-black/10 hover:shadow-red-500/20 transition-all duration-300">
                Book a Strategy Call
              </ButtonLink>
              <ButtonLink href="#solutions-list" variant="outline" size="lg" className="w-full sm:w-auto px-7 sm:px-9 md:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base">
                Explore What We Build
              </ButtonLink>
            </div>
          </HeroSupport>
        </Container>
      </section>

      {/* 2. SOLUTION DOMAINS (Clean Lined Rows) */}
      <section id="solutions-list" className="py-20 md:py-32 bg-white border-b border-[#e4e4e7] scroll-mt-24">
        <Container size="default">
          <Reveal variant="fadeUp" className="max-w-3xl mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-2">
              What We Build
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a]">
              Dedicated digital tools shaped around your exact business needs.
            </h2>
            <p className="text-base sm:text-lg text-[#71717a] mt-4 leading-relaxed">
              Every system is built from scratch for your team. You get full source code ownership, zero subscription traps, and software that fits your real daily operations.
            </p>
          </Reveal>

          <div className="divide-y divide-[#e4e4e7] border-t border-b border-[#e4e4e7]">
            {solutions.map((sol, index) => {
              const Icon = domainIcons[index % domainIcons.length];
              return (
                <Reveal 
                  key={sol.id} 
                  variant="fadeUp" 
                  delay={index + 1}
                >
                  <div 
                    id={sol.id}
                    className="py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start scroll-mt-24"
                  >
                    {/* Left Column (5 cols): Number, Title, Overview */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-mono font-bold text-[#71717a] fz-scroll-num">
                          0{index + 1}
                        </span>
                        <Icon className="w-4 h-4 text-[#e11d48]" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
                          Solution
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0a0a] tracking-tight">
                        {sol.title}
                      </h3>

                      <p className="text-base text-[#71717a] leading-relaxed">
                        {sol.description}
                      </p>

                      <div className="pt-2 border-l-2 border-[#e11d48] pl-4 my-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0a0a0a] block mb-1">
                          How this helps your business:
                        </span>
                        <p className="text-sm text-[#71717a] leading-relaxed">
                          {sol.businessValue}
                        </p>
                      </div>

                      <div className="pt-2">
                        <ButtonLink href={`/contact?interest=${encodeURIComponent(sol.title)}`} variant="primary" size="md">
                          {sol.ctaText || "Talk to Us About This"} <ArrowUpRight className="w-4 h-4 ml-1.5" />
                        </ButtonLink>
                      </div>
                    </div>

                    {/* Right Column (7 cols): What is delivered & Ideal For */}
                    <div className="lg:col-span-7 flex flex-col gap-6 pt-2">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] mb-4">
                          What you get
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {sol.services.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2.5 text-sm text-[#0a0a0a]">
                              <Check className="w-4 h-4 text-[#e11d48] mt-0.5 shrink-0 stroke-[2.5]" />
                              <span className="font-medium">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-[#e4e4e7] grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a] block mb-1">
                            Best Suited For
                          </span>
                          <p className="text-sm font-medium text-[#0a0a0a]">
                            {sol.idealFor}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a] block mb-1">
                            How We Work
                          </span>
                          <p className="text-sm font-medium text-[#0a0a0a]">
                            Direct communication with builders. Weekly live progress demos.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link 
                          href="/work" 
                          className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] hover:text-[#e11d48] transition-colors inline-flex items-center gap-1.5 fz-link-underline"
                        >
                          <span>See projects we have delivered</span> <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. COMMON BOTTLENECKS (Clean Lined Grid - No Box Cards) */}
      <section className="py-20 md:py-32 bg-[#fafafa] border-b border-[#e4e4e7]">
        <Container size="default">
          <Reveal variant="fadeUp" className="max-w-2xl mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-2">
              Common Problems We Fix
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a]">
              Where most growing businesses get stuck.
            </h2>
            <p className="text-base text-[#71717a] mt-3">
              If your team spends valuable hours fixing software headaches or answering repetitive questions, we replace that friction with reliable systems.
            </p>
          </Reveal>

          <div className="border-t border-b border-[#e4e4e7] divide-y md:divide-y-0 md:divide-x divide-[#e4e4e7] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                id: "01",
                label: "Manual Data Entry",
                problem: "Staff wasting hours copying and pasting details across multiple spreadsheets and apps.",
                solution: "We link your apps so data moves automatically, accurately, and without human effort.",
              },
              {
                id: "02",
                label: "Client Status Chasing",
                problem: "Clients repeatedly emailing and calling to ask 'What is the current status of my order?'",
                solution: "A simple client portal where customers can check status, files, and milestones 24/7.",
              },
              {
                id: "03",
                label: "Slow, Unreliable Websites",
                problem: "Websites that take seconds to load, look outdated on phones, or crash during promotions.",
                solution: "Ultra-fast modern web platforms built for speed, security, and effortless mobile browsing.",
              },
              {
                id: "04",
                label: "Vendor Code Lock-In",
                problem: "Agencies holding your code or accounts hostage, forcing you into expensive monthly retainers.",
                solution: "100% full ownership. You receive all code, passwords, and assets with no strings attached.",
              },
            ].map((item, idx) => (
              <Reveal key={item.id} variant="fadeUp" delay={idx + 1} className="h-full">
                <div className="py-8 md:py-10 px-6 sm:px-8 flex flex-col justify-between bg-white h-full">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#71717a] fz-scroll-num block mb-2">{item.id}</span>
                    <h3 className="text-lg font-bold text-[#0a0a0a] mb-4">{item.label}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-600 block">The Headache</span>
                        <p className="text-xs sm:text-sm text-[#71717a] mt-1 leading-relaxed">{item.problem}</p>
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0a0a0a] block">Our Fix</span>
                        <p className="text-xs sm:text-sm text-[#0a0a0a] font-medium mt-1 leading-relaxed">{item.solution}</p>
                      </div>
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
              Ready to build systems that save time and grow revenue?
            </h2>
            <p className="text-base sm:text-lg text-[#71717a] leading-relaxed max-w-xl font-normal mb-10">
              Book a friendly, no-pressure 30-minute discovery call. We will review your current workflows and give you honest recommendations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <ButtonLink href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
                Book a Strategy Call
              </ButtonLink>
              <ButtonLink href="/work" variant="outline" size="lg" className="w-full sm:w-auto">
                See Completed Projects
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </GlobalLayout>
  );
}
