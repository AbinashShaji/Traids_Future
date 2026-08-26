// Terms & Conditions page styled with Design System v2 tokens and typography.
import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { Button } from "../../components/button";

export const metadata: Metadata = {
  title: "Terms & Conditions — Triads Future",
  description: "Terms and commercial conditions governing Triads Future engagements.",
};

export default function TermsPage() {
  return (
    <GlobalLayout>
      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <Container className="max-w-3xl">
          <div className="mb-8">
            <Link href="/">
              <Button variant="text" size="sm" className="gap-1.5 text-graphite hover:text-ink">
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Home
              </Button>
            </Link>
          </div>

          <header className="mb-12 border-b border-hairline pb-8">
            <SectionHeading tag="h1" subtitle="Commercial Governance" withTriadMark>
              Terms & Conditions
            </SectionHeading>
            <p className="font-editorial text-graphite text-base md:text-lg leading-relaxed mt-4">
              Last updated: August 2026. General terms governing engagement, intellectual property, and service delivery.
            </p>
          </header>

          <article className="space-y-10 font-sans text-sm md:text-base text-graphite leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-heading text-xl md:text-2xl text-ink">1. Engagement Model</h2>
              <p>
                Triads Future operates on structured commercial agreements defined in mutual Statements of Work (SOW). All engagements are scope- and value-based, delivered in weekly sprint cycles with transparent deliverables.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl md:text-2xl text-ink">2. 100% Client IP Ownership</h2>
              <p>
                Upon final settlement of engagement fees, clients retain 100% ownership of all custom software source code, design assets, database architectures, and cloud configurations developed for their project.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl md:text-2xl text-ink">3. Professional Standards</h2>
              <p>
                We build production-ready systems using proven, open-source architectures to ensure maintainability by internal developer teams without proprietary vendor lock-in.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl md:text-2xl text-ink">4. Confidentiality</h2>
              <p>
                Both parties agree to treat proprietary technical and commercial data exchanged during consultations and project delivery as strictly confidential under binding non-disclosure terms.
              </p>
            </section>

            <section className="space-y-3 border-t border-hairline pt-8">
              <h2 className="font-heading text-xl md:text-2xl text-ink">5. Commercial Inquiries</h2>
              <p>
                For questions regarding engagement terms or specific legal agreements, please reach out to{" "}
                <a href="mailto:partners@triadsfuture.com" className="text-ink underline hover:text-graphite">
                  partners@triadsfuture.com
                </a>.
              </p>
            </section>
          </article>
        </Container>
      </main>
    </GlobalLayout>
  );
}
