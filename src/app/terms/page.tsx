import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";

export const metadata: Metadata = {
  title: "Terms & Conditions — Triads Future",
  description: "Terms and commercial conditions governing Triads Future engagements.",
};

export default function TermsPage() {
  return (
    <GlobalLayout>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
        <Container className="max-w-3xl">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#71717a] hover:text-[#e11d48] transition-colors fz-link-underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
          </div>

          <header className="mb-12 border-b border-[#e4e4e7] pb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#e11d48]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#71717a]">
                Commercial Governance
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a]">
              Terms & Conditions
            </h1>
            <p className="text-[#71717a] text-lg leading-relaxed mt-4 font-normal">
              Last updated: August 2026. General terms governing engagement, intellectual property, and service delivery.
            </p>
          </header>

          <article className="space-y-10 text-base text-[#71717a] leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a]">1. Engagement Model</h2>
              <p>
                Triads Future operates on structured commercial agreements defined in mutual Statements of Work (SOW). All engagements are scope- and value-based, delivered in weekly sprint cycles with transparent deliverables.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a]">2. 100% Client IP Ownership</h2>
              <p>
                Upon final settlement of engagement fees, clients retain 100% ownership of all custom software source code, design assets, database architectures, and cloud configurations developed for their project.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a]">3. Professional Standards</h2>
              <p>
                We build production-ready systems using proven, open-source architectures to ensure maintainability by internal developer teams without proprietary vendor lock-in.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a]">4. Confidentiality</h2>
              <p>
                Both parties agree to treat proprietary technical and commercial data exchanged during consultations and project delivery as strictly confidential under binding non-disclosure terms.
              </p>
            </section>

            <section className="space-y-3 border-t border-[#e4e4e7] pt-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a]">5. Commercial Inquiries</h2>
              <p>
                For questions regarding engagement terms or specific legal agreements, please reach out to{" "}
                <a href="mailto:partners@triadsfuture.com" className="text-[#0a0a0a] font-medium underline hover:text-[#e11d48]">
                  partners@triadsfuture.com
                </a>.
              </p>
            </section>
          </article>
        </Container>
      </section>
    </GlobalLayout>
  );
}
