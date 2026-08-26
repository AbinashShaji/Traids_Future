// Privacy Policy page styled with Design System v2 tokens and typography.
import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { Button } from "../../components/button";

export const metadata: Metadata = {
  title: "Privacy Policy — Triads Future",
  description: "Privacy policy and data handling principles for Triads Future.",
};

export default function PrivacyPage() {
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
            <SectionHeading tag="h1" subtitle="Legal & Privacy" withTriadMark>
              Privacy Policy
            </SectionHeading>
            <p className="font-editorial text-graphite text-base md:text-lg leading-relaxed mt-4">
              Last updated: August 2026. We are committed to safeguarding the personal and commercial data entrusted to us.
            </p>
          </header>

          <article className="space-y-10 font-sans text-sm md:text-base text-graphite leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-heading text-xl md:text-2xl text-ink">1. Information We Collect</h2>
              <p>
                We collect information you provide directly when requesting a strategy consultation, submitting enquiries, or communicating with our team. This includes your name, business email address, phone number, company name, and project requirements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl md:text-2xl text-ink">2. How We Use Information</h2>
              <p>
                We use collected information solely to evaluate potential partnerships, deliver scheduled consultations, provide our engineering and advisory services, and maintain administrative records. We do not sell, rent, or monetize your data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl md:text-2xl text-ink">3. Client IP & Confidentiality</h2>
              <p>
                All proprietary client information, source code, data architectures, and operational insights shared during engagements are held under strict confidentiality and protected by our client IP ownership standard.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl md:text-2xl text-ink">4. Data Retention & Security</h2>
              <p>
                We retain personal data only as long as necessary to fulfill business engagements and regulatory obligations. Technical and operational measures are maintained to protect your data against unauthorized access, alteration, or disclosure.
              </p>
            </section>

            <section className="space-y-3 border-t border-hairline pt-8">
              <h2 className="font-heading text-xl md:text-2xl text-ink">5. Contact Us</h2>
              <p>
                For privacy-related enquiries or data requests, contact us directly at{" "}
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
