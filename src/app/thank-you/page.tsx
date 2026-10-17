/**
 * FILE: src/app/thank-you/page.tsx
 *
 * Confirmation screen displayed after booking a discovery call.
 * Clean line borders and clear, trustworthy copy.
 */

import * as React from "react";
import Link from "next/link";
import { CheckCircle, House, LayoutGrid, BookOpen } from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";

export default function ThankYouPage() {
  return (
    <GlobalLayout>
      <section className="min-h-[calc(100vh-72px)] flex flex-col justify-center py-12 sm:py-16 md:py-20 bg-white">
        <Container className="max-w-2xl text-center flex flex-col items-center gap-6 my-auto">
          <div className="w-16 h-16 rounded-full bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center mb-1">
            <CheckCircle className="w-8 h-8 text-[#e11d48] stroke-[2]" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48]">
              Request Received
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] leading-tight">
              Thank you for reaching out
            </h1>
          </div>

          <p className="text-[#71717a] text-lg leading-relaxed max-w-lg font-normal">
            We have received your details. A senior partner will review your business context and reach out within 24 business hours with available meeting times.
          </p>

          <div className="w-full text-left py-8 border-t border-b border-[#e4e4e7] mt-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] block mb-6">
              What Happens Next
            </span>
            
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <span className="text-xs font-bold text-[#e11d48] w-8 h-8 rounded-full bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center shrink-0">
                  01
                </span>
                <div>
                  <h2 className="text-base font-bold text-[#0a0a0a]">Brief Review</h2>
                  <p className="text-sm text-[#71717a] mt-0.5 leading-relaxed">
                    We take a quick look at your website and business workflows before we meet.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <span className="text-xs font-bold text-[#e11d48] w-8 h-8 rounded-full bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center shrink-0">
                  02
                </span>
                <div>
                  <h2 className="text-base font-bold text-[#0a0a0a]">Calendar Invitation</h2>
                  <p className="text-sm text-[#71717a] mt-0.5 leading-relaxed">
                    You will receive a Google Meet invitation with a confirmed time that works for you.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <span className="text-xs font-bold text-[#e11d48] w-8 h-8 rounded-full bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center shrink-0">
                  03
                </span>
                <div>
                  <h2 className="text-base font-bold text-[#0a0a0a]">Discovery Call</h2>
                  <p className="text-sm text-[#71717a] mt-0.5 leading-relaxed">
                    A relaxed 30-minute conversation to discuss what you need and how we can help.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0a0a0a] text-white font-medium hover:bg-[#e11d48] transition-all duration-300 text-sm"
            >
              <House className="w-4 h-4 stroke-[2]" />
              <span>Return to Home</span>
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#e4e4e7] bg-white text-[#0a0a0a] font-medium hover:border-[#0a0a0a] transition-all duration-300 text-sm"
            >
              <LayoutGrid className="w-4 h-4 stroke-[2]" />
              <span>Explore Solutions</span>
            </Link>
            <Link
              href="/insights"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#e4e4e7] bg-white text-[#0a0a0a] font-medium hover:border-[#0a0a0a] transition-all duration-300 text-sm"
            >
              <BookOpen className="w-4 h-4 stroke-[2]" />
              <span>Read Guides</span>
            </Link>
          </div>
        </Container>
      </section>
    </GlobalLayout>
  );
}
