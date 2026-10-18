/**
 * FILE: src/app/home-page-content.tsx
 *
 * Home page following FinZave line-border architecture and clear plain-English business language.
 * - Zero pill badges or bracket tags.
 * - Clean hairline row dividers replacing box cards.
 * - Simple, clear language for business owners.
 * - Full motion system: HeroReveal editorial lines, section fadeUp reveals, stagger sequences.
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Layers, 
  Cpu, 
  Zap, 
  Terminal, 
  Activity, 
  ShieldCheck, 
  TrendingUp, 
  Users 
} from "lucide-react";
import { Container } from "../components/container";
import { ButtonLink } from "../components/button-link";
import { ImageWrapper } from "../components/image-wrapper";
import { GlobalLayout } from "../components/global-layout";
import { HeroReveal, HeroSupport } from "../components/hero-reveal";
import { Reveal } from "../components/reveal";
import { type Project } from "@/mock/projects";
import { type Testimonial } from "@/mock/testimonials";
import { type Article as BlogPost } from "@/mock/articles";

interface HomePageContentProps {
  featuredProjects?: Project[];
  featuredTestimonials?: Testimonial[];
  featuredArticle?: BlogPost | null;
  projects?: Project[];
  testimonials?: Testimonial[];
  articles?: BlogPost[];
}

export default function HomePageContent(props: HomePageContentProps) {
  const projects = props.featuredProjects || props.projects || [];
  return (
    <GlobalLayout>
      {/* 1. HERO SECTION — Editorial Masked Line Reveal */}
      <section className="min-h-[calc(100svh-72px)] sm:min-h-[calc(100vh-72px)] max-h-[950px] flex flex-col justify-center py-8 sm:py-12 md:py-16 lg:py-20 bg-white border-b border-[#e4e4e7] relative overflow-hidden">
        {/* Subtle Ambient Radial Glow Orb */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] md:w-[800px] h-[500px] sm:h-[700px] md:h-[800px] bg-gradient-to-tr from-[#f4f4f5] to-white rounded-full blur-[100px] -z-10 opacity-60 pointer-events-none" 
          aria-hidden="true" 
        />

        <Container size="default" className="text-center flex flex-col items-center justify-center my-auto relative z-10 px-4 sm:px-6 md:px-8">
          {/* Editorial Line-Mask Hero Headline */}
          <HeroReveal
            as="h1"
            headingClassName="text-[2.25rem] min-[380px]:text-[2.75rem] min-[440px]:text-[3.25rem] sm:text-6xl md:text-7xl lg:text-[6.25rem] xl:text-[7.25rem] font-bold tracking-tighter leading-[1.02] mb-5 sm:mb-6 md:mb-8 max-w-5xl mx-auto"
            baseDelay={80}
            staggerInterval={120}
            lines={[
              { text: "Grow your business.", className: "text-[#0a0a0a] min-[360px]:whitespace-nowrap" },
              { text: "Not just", className: "text-[#d4d4d8] min-[360px]:whitespace-nowrap" },
              { text: "your technology.", className: "text-[#d4d4d8] min-[360px]:whitespace-nowrap" },
            ]}
          />

          {/* Supporting content — delayed entrance after headline */}
          <HeroSupport delay={560} className="flex flex-col items-center gap-6 sm:gap-8 w-full">
            <p className="text-sm sm:text-base md:text-lg text-[#52525b] font-normal max-w-[320px] sm:max-w-[420px] md:max-w-xl lg:max-w-2xl mx-auto leading-relaxed">
              As a business growth and technology partner, Triads Future helps businesses grow through an integrated combination of strategy, technology, websites, SEO, digital marketing, and automation services.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full sm:w-auto">
              <ButtonLink 
                href="/contact" 
                variant="primary" 
                size="lg" 
                className="w-auto min-w-[200px] sm:min-w-0 px-7 sm:px-9 md:px-10 py-3.5 sm:py-4 rounded-full bg-[#0a0a0a] hover:bg-[#e11d48] text-white font-medium text-sm sm:text-base shadow-lg shadow-black/10 hover:shadow-red-500/20 transition-all duration-300"
              >
                Book a Strategy Call
              </ButtonLink>
              <Link 
                href="/solutions" 
                className="fz-link-underline text-sm sm:text-base md:text-lg font-medium text-[#0a0a0a] hover:text-[#e11d48] transition-colors py-2 px-2 inline-flex items-center"
              >
                Explore Solutions
              </Link>
            </div>
          </HeroSupport>
        </Container>
      </section>

      {/* 2. THE PROBLEM (Lined Layout - No Boxes) */}
      <section className="py-24 md:py-36 bg-[#fafafa] border-b border-[#e4e4e7]">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 5 Columns */}
            <Reveal variant="fadeUp" className="lg:col-span-5 flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48]">
                The Problem
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] leading-tight">
                Growing businesses are slowed down by manual work and disjointed tools.
              </h2>
            </Reveal>

            {/* Right 7 Columns */}
            <Reveal variant="fadeUp" delay={1} className="lg:col-span-7 flex flex-col gap-6">
              <p className="text-lg text-[#71717a] leading-relaxed">
                Most businesses hit a growth wall not because they lack clients, but because their staff spends hours copying information between messy spreadsheets and disconnected subscription apps.
              </p>

              <div className="border-t border-[#e4e4e7] divide-y divide-[#e4e4e7] mt-2">
                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                  <span className="text-sm font-bold text-[#e11d48] shrink-0">01. Disjointed Apps</span>
                  <p className="text-sm text-[#52525b] max-w-sm leading-relaxed">
                    Customer data is scattered across five different logins, causing confusion and delays.
                  </p>
                </div>
                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                  <span className="text-sm font-bold text-[#e11d48] shrink-0">02. Manual Copy-Pasting</span>
                  <p className="text-sm text-[#52525b] max-w-sm leading-relaxed">
                    Valuable employees spend hours re-typing details instead of focusing on customers.
                  </p>
                </div>
                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                  <span className="text-sm font-bold text-[#e11d48] shrink-0">03. Cookie-Cutter Agencies</span>
                  <p className="text-sm text-[#52525b] max-w-sm leading-relaxed">
                    Marketing agencies deliver flashy surface designs that don&apos;t fix core operational headaches.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 3. WHAT TRIADS FUTURE DOES (Clean Contrast Section) */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] text-white border-b border-[#18181b]">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Heading & Summary */}
            <Reveal variant="fadeUp" className="lg:col-span-5 flex flex-col gap-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48]">
                What We Do
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Strategy, technology, and execution engineered for business growth.
              </h2>
              <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed font-normal">
                We combine commercial business strategy, custom web systems, and growth infrastructure to eliminate operational bottlenecks and scale revenue.
              </p>
            </Reveal>

            {/* Right Column: Capability rows */}
            <Reveal variant="fadeUp" delay={1} className="lg:col-span-7 flex flex-col border-t border-[#27272a] divide-y divide-[#27272a]">
              <div className="py-8 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-[#e11d48]" />
                  <h3 className="text-xl font-bold text-white tracking-tight">Business Strategy &amp; Positioning</h3>
                </div>
                <div className="space-y-1.5 text-xs text-[#a1a1aa] leading-relaxed pl-8">
                  <p><strong className="text-white uppercase tracking-wider text-[11px] block">WHAT IT DOES:</strong> Pinpoints operational bottlenecks and crafts a verified growth roadmap before writing code.</p>
                  <p><strong className="text-white uppercase tracking-wider text-[11px] block pt-1">WHY IT HELPS:</strong> Avoids expensive technical debt and ensures every system built directly generates commercial ROI.</p>
                </div>
              </div>

              <div className="py-8 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-[#e11d48]" />
                  <h3 className="text-xl font-bold text-white tracking-tight">Custom Web Applications</h3>
                </div>
                <div className="space-y-1.5 text-xs text-[#a1a1aa] leading-relaxed pl-8">
                  <p><strong className="text-white uppercase tracking-wider text-[11px] block">WHAT IT DOES:</strong> Builds self-service client portals, internal operations dashboards, and bespoke software tools.</p>
                  <p><strong className="text-white uppercase tracking-wider text-[11px] block pt-1">WHY IT HELPS:</strong> Replaces fragmented third-party subscriptions with tailor-made systems you own 100%.</p>
                </div>
              </div>

              <div className="py-8 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#e11d48]" />
                  <h3 className="text-xl font-bold text-white tracking-tight">Process Automation &amp; Integration</h3>
                </div>
                <div className="space-y-1.5 text-xs text-[#a1a1aa] leading-relaxed pl-8">
                  <p><strong className="text-white uppercase tracking-wider text-[11px] block">WHAT IT DOES:</strong> Connects your business apps, CRM, and pipelines so data moves automatically without manual intervention.</p>
                  <p><strong className="text-white uppercase tracking-wider text-[11px] block pt-1">WHY IT HELPS:</strong> Saves 30+ team hours weekly, prevents errors, and speeds up customer fulfillment times.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 4. HOW WE HELP (Lined List) */}
      <section className="py-24 md:py-36 bg-white border-b border-[#e4e4e7]">
        <Container size="default">
          <Reveal variant="fadeUp" className="max-w-3xl mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-2">
              Our Process
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a]">
              How we take your project from idea to live deployment.
            </h2>
          </Reveal>

          <div className="border-t border-[#e4e4e7]">
            {[
              {
                num: "01",
                title: "Diagnose",
                desc: "We look closely at your operations, identify where time is wasted, and provide a fixed-scope proposal with exact costs.",
              },
              {
                num: "02",
                title: "Specify",
                desc: "Before writing any code, we map out clear screen designs and workflow steps so you know exactly what is being built.",
              },
              {
                num: "03",
                title: "Build",
                desc: "We build in weekly cycles and share live demo videos every Friday so you see real progress constantly.",
              },
              {
                num: "04",
                title: "Deploy",
                desc: "We launch the system to your accounts, train your team, and hand over 100% of the passwords and source code.",
              },
            ].map((step, idx) => (
              <Reveal key={idx} variant="fadeUp" delay={idx + 1} as="div">
                <div 
                  className="py-10 md:py-14 border-b border-[#e4e4e7] grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start md:items-baseline"
                >
                  <div className="md:col-span-2">
                    <span className="text-3xl md:text-4xl font-normal text-[#71717a] fz-scroll-num">
                      {step.num}
                    </span>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-xl md:text-2xl font-bold text-[#0a0a0a] tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-sm md:text-base text-[#52525b] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. THE TRIADS DIFFERENCE (Clean 2-Column Section) */}
      <section className="py-24 md:py-36 bg-white border-b border-[#e4e4e7]">
        <Container size="default">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <Reveal variant="slideLeft" className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a]">
                Built for everyday business operations.
              </h2>
              <p className="text-base text-[#52525b] leading-relaxed">
                Triads Future is designed for growing businesses that want dependable systems, lower software bills, and complete ownership over their digital tools.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "Growing companies moving past manual spreadsheets",
                  "Teams overwhelmed by too many disconnected software subscriptions",
                  "Founders needing clear visibility into orders, leads, and metrics",
                  "Owners who insist on 100% intellectual property ownership",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#0a0a0a]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="slideRight" className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a0a0a]">
                Transparent by design.
              </h2>
              <p className="text-base text-[#52525b] leading-relaxed">
                We work on fixed quotes and clear scopes. Everything is deployed directly to your own accounts, giving you complete autonomy.
              </p>
              <p className="text-sm text-[#52525b] leading-relaxed">
                You work directly with the senior developers and designers doing the work. No account managers or middle-men filtering your messages.
              </p>
              <p className="text-sm text-[#52525b] leading-relaxed">
                No proprietary software traps or hidden monthly licensing fees. When the project is finished, you own every piece of code and every file.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 6. WORKFLOW SEQUENCE (Clean Lined Strip) */}
      <section className="py-20 md:py-28 bg-[#fafafa] border-b border-[#e4e4e7]">
        <Container size="default">
          <Reveal variant="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-1">
                Project Roadmap
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a0a0a]">
                Predictable delivery through four disciplined steps.
              </h2>
            </div>
            <ButtonLink href="/solutions" variant="outline" size="sm">
              Explore All Solutions →
            </ButtonLink>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-[#e4e4e7] divide-y md:divide-y-0 md:divide-x divide-[#e4e4e7] py-8">
            {[
              { phase: "Step 01", name: "Diagnosis", detail: "Bottlenecks & Scope" },
              { phase: "Step 02", name: "Design", detail: "Screens & Data Flow" },
              { phase: "Step 03", name: "Build & Ship", detail: "Weekly Progress Demos" },
              { phase: "Step 04", name: "Handover", detail: "Training & Full Ownership" },
            ].map((p, idx) => (
              <Reveal key={idx} variant="fadeUp" delay={idx + 1} className="py-4 md:py-0 px-4 md:px-8 flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#71717a] fz-scroll-num">{p.phase}</span>
                <span className="text-lg font-bold text-[#0a0a0a]">{p.name}</span>
                <span className="text-xs text-[#71717a]">{p.detail}</span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. CORE CAPABILITIES (Clean Lined Layout) */}
      <section className="py-24 md:py-36 bg-white border-b border-[#e4e4e7]">
        <Container size="default">
          <Reveal variant="fadeUp" className="max-w-2xl mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-2">
              Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a]">
              Dedicated solutions built to scale your business.
            </h2>
          </Reveal>

          <div className="border-t border-[#e4e4e7] divide-y divide-[#e4e4e7]">
            {[
              { Icon: TrendingUp, title: "Custom Web Applications", href: "/solutions#custom-web-applications", desc: "Secure portals and bespoke web systems where clients and teams can manage operations, automate workflows, and handle transactions 24/7." },
              { Icon: Cpu, title: "Process Automation", href: "/solutions#process-automation", desc: "Systematize repetitive tasks like data handoffs, invoice generation, and CRM synchronization to eliminate errors and save 30+ team hours weekly." },
              { Icon: Layers, title: "Brand Architecture & Positioning", href: "/solutions#brand-architecture", desc: "Strategic market positioning and identity systems that articulate your commercial value, shorten sales cycles, and build lasting credibility." },
              { Icon: Activity, title: "High-Performance Websites", href: "/solutions#high-performance-websites", desc: "Fast, responsive websites that build trust, rank higher on Google search, and turn interested visitors into qualified inbound leads." },
              { Icon: Zap, title: "Growth Infrastructure & SEO", href: "/solutions#growth-infrastructure", desc: "Scalable technical foundations and digital marketing systems engineered to handle expanding customer acquisition volume effortlessly." },
            ].map(({ Icon, title, href, desc }, idx) => (
              <Reveal key={idx} variant="fadeUp" delay={idx + 1} as="div">
                <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                  <div className="md:col-span-4 flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#e11d48]" />
                    <h3 className="text-xl font-bold text-[#0a0a0a] tracking-tight">{title}</h3>
                  </div>
                  <p className="md:col-span-6 text-sm text-[#52525b] leading-relaxed">{desc}</p>
                  <div className="md:col-span-2 md:text-right">
                    <Link href={href} className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] hover:text-[#e11d48] transition-colors inline-flex items-center gap-1.5 fz-link-underline">
                      <span>Learn more</span> <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. OUR PRINCIPLES (Trust Section) */}
      <section className="py-24 md:py-36 bg-[#fafafa] border-b border-[#e4e4e7]">
        <Container size="default">
          <Reveal variant="fadeUp" className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-2">
              Our Principles
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a]">
              Transparency, accountability, and 100% ownership.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-[#e4e4e7] divide-y lg:divide-y-0 lg:divide-x divide-[#e4e4e7] py-8">
            {[
              { Icon: ShieldCheck, title: "100% Client Ownership", desc: "All source code, design systems, and cloud infrastructure belong to you from day one. Zero vendor lock-in." },
              { Icon: Users, title: "Zero Account Layers", desc: "You work directly with senior software architects and engineers who design and ship your code." },
              { Icon: Terminal, title: "Live Production Code", desc: "No speculative prototypes that fail in reality. Everything we build is tested and deployed into production." },
              { Icon: Activity, title: "Visible Weekly Sprints", desc: "Continuous delivery with Friday staging demos. You never wait weeks wondering what progress was made." },
            ].map(({ Icon, title, desc }, idx) => (
              <Reveal key={idx} variant="fadeUp" delay={idx + 1} className="py-6 lg:py-0 px-4 lg:px-6 flex flex-col gap-3">
                <Icon className="w-5 h-5 text-[#e11d48]" />
                <h3 className="text-base font-bold text-[#0a0a0a]">{title}</h3>
                <p className="text-xs text-[#52525b] leading-relaxed">{desc}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 9. DOCUMENTED OUTCOMES (Clean Lined Rows) */}
      <section className="py-24 md:py-36 bg-white border-b border-[#e4e4e7]">
        <Container size="default">
          <Reveal variant="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48] mb-2">
                Featured Work
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a]">
                Documented outcomes for growing businesses.
              </h2>
            </div>
            <ButtonLink href="/work" variant="primary" size="md">
              View All Projects →
            </ButtonLink>
          </Reveal>

          <div className="divide-y divide-[#e4e4e7] border-t border-b border-[#e4e4e7]">
            {projects.slice(0, 2).map((project, idx) => (
              <Reveal key={project.id} variant="fadeUp" delay={idx + 1} as="div">
                <div className="py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
                  <div className={`lg:col-span-6 relative aspect-[16/10] w-full overflow-hidden border border-[#e4e4e7] bg-[#fafafa] ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                    <Link href={`/work/${project.slug}`}>
                      <ImageWrapper
                        src={project.coverImage || ""}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        containerClassName="w-full h-full border-none rounded-none"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  </div>
                  <div className={`lg:col-span-6 flex flex-col gap-5 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#71717a]">{project.clientName}</span>
                      <span className="w-1 h-1 rounded-full bg-[#d4d4d8]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">{project.industry}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] tracking-tight">
                      <Link href={`/work/${project.slug}`} className="hover:text-[#e11d48] transition-colors">
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-base text-[#71717a] leading-relaxed">
                      {project.summary}
                    </p>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#e4e4e7]">
                      {((Array.isArray(project.results) ? project.results : []) as {metric: string, value: string}[]).slice(0, 2).map((res, rIdx) => (
                        <div key={rIdx} className="flex flex-col">
                          <span className="text-3xl font-bold text-[#0a0a0a] tracking-tight">{res.value}</span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a] mt-0.5">{res.metric}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <ButtonLink href={`/work/${project.slug}`} variant="primary" size="md">
                        Read Project Story <ArrowRight className="w-4 h-4 ml-1.5" />
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 10. FINAL CTA SECTION */}
      <section className="relative py-28 md:py-40 bg-white overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[700px] h-[300px] md:h-[400px] bg-gradient-to-tr from-[#e11d48]/5 to-transparent blur-[100px] pointer-events-none -z-0" />
        <Container size="narrow" className="relative z-10 text-center flex flex-col items-center">
          <Reveal variant="fadeUp" className="flex flex-col items-center gap-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0a0a0a] leading-[1.08] max-w-2xl">
              <span className="block">Understand your systems.</span>
              <span className="block">Make better decisions.</span>
            </h2>
            <p className="text-lg text-[#52525b] leading-relaxed max-w-xl font-normal">
              Start planning, automating, and scaling your business growth journey with Triads Future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
              <ButtonLink 
                href="/contact" 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0a0a0a] hover:bg-[#e11d48] text-white font-medium text-base shadow-sm"
              >
                Get Started
              </ButtonLink>
              <Link 
                href="/solutions" 
                className="fz-link-underline text-base font-medium text-[#0a0a0a] hover:text-[#e11d48] transition-colors py-2 inline-flex items-center gap-1.5"
              >
                <span>Explore Workflow</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </GlobalLayout>
  );
}
