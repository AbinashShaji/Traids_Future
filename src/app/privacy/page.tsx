import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";

export const metadata: Metadata = {
  title: "Privacy Policy — Triads Future",
  description: "Privacy policy and data handling principles for Triads Future.",
};

export default function PrivacyPage() {
  return (
    <GlobalLayout>
      <section className="pt-10 sm:pt-12 md:pt-14 pb-20 md:pb-28 bg-white">
        <Container className="max-w-3xl">
          <div className="mb-6 sm:mb-8">
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
                Legal & Governance
              </span>
            </div>
            <h1 className="text-[2.25rem] min-[380px]:text-[2.75rem] min-[440px]:text-[3.25rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tighter text-[#0a0a0a] leading-[1.02]">
              Privacy Policy
            </h1>
            <p className="text-[#52525b] text-base sm:text-lg leading-relaxed mt-4 font-normal">
              Last updated: August 2026. We are committed to safeguarding the personal and commercial data entrusted to us.
            </p>
          </header>

          <article className="space-y-10 text-base text-[#71717a] leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a]">1. Information We Collect</h2>
              <p>
                We collect information you provide directly when requesting a strategy consultation, submitting enquiries, or communicating with our team. This includes your name, business email address, phone number, company name, and project requirements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a]">2. How We Use Information</h2>
              <p>
                We use collected information solely to evaluate potential partnerships, deliver scheduled consultations, provide our engineering and advisory services, and maintain administrative records. We do not sell, rent, or monetize your data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a]">3. Client IP & Confidentiality</h2>
              <p>
                All proprietary client information, source code, data architectures, and operational insights shared during engagements are held under strict confidentiality and protected by our client IP ownership standard.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a]">4. Data Retention & Security</h2>
              <p>
                We retain personal data only as long as necessary to fulfill business engagements and regulatory obligations. Technical and operational measures are maintained to protect your data against unauthorized access, alteration, or disclosure.
              </p>
            </section>

            <section className="space-y-3 border-t border-[#e4e4e7] pt-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a]">5. Contact Us</h2>
              <p>
                For privacy-related enquiries or data requests, contact us directly at{" "}
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
