/**
 * FILE: src/app/thank-you/page.tsx
 *
 * WHAT THIS DOES:
 * Confirmation screen displayed immediately after a user books a consultation on /contact.
 *
 * WHERE IT IS USED:
 * - Next.js redirects users to `/thank-you` upon successful form submission.
 *
 * HOW IT WORKS:
 * 1. Shows a clean checkmark icon and "Thank you for booking a call" headline.
 * 2. Displays a 3-step "What Happens Next" card (Preliminary Audit -> Calendar Invitation -> Strategy Diagnosis).
 * 3. Provides quick navigation buttons to return Home, Explore Solutions, or Read Insights.
 *
 * BEGINNER TIP:
 * A dedicated thank-you page lets you track conversion events in web analytics!
 */

import * as React from "react";
import Link from "next/link";
import { CheckCircle, House, LayoutGrid, BookOpen } from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { Button } from "../../components/button";
import { Card } from "../../components/card";
import { TriadMark } from "../../components/triad-mark";

export default function ThankYouPage() {
  return (
    <GlobalLayout>
      <section className="min-h-[60vh] md:min-h-[80vh] flex items-center justify-center pt-32 pb-20">
        <Container className="max-w-2xl text-center flex flex-col items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-bone flex items-center justify-center mb-1">
            <CheckCircle className="w-7 h-7 text-ink stroke-[1.5]" />
          </div>

          <SectionHeading
            tag="h1"
            subtitle="Consultation Confirmed"
            withTriadMark
            className="text-center"
          >
            Thank you for booking a call
          </SectionHeading>

          <p className="font-editorial text-graphite text-lg md:text-xl leading-relaxed max-w-md">
            We have received your details. A senior partner will review your business context and reach out within 24 business hours with calendar details.
          </p>

          <Card variant="bone" className="w-full text-left p-6 md:p-8 border border-hairline mt-2">
            <div className="flex items-center gap-2 mb-4">
              <TriadMark size="sm" />
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
                What Happens Next
              </h3>
            </div>
            
            <ul className="space-y-4 font-sans">
              <li className="flex gap-4">
                <span className="font-heading text-sm font-semibold text-ink w-6 h-6 rounded-full bg-paper border border-hairline flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-ink">Preliminary Audit</h4>
                  <p className="font-editorial text-sm text-graphite mt-0.5 leading-relaxed">
                    We conduct a brief review of your public assets, sector, and digital workflows.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="font-heading text-sm font-semibold text-ink w-6 h-6 rounded-full bg-paper border border-hairline flex items-center justify-center shrink-0">2</span>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-ink">Calendar Invitation</h4>
                  <p className="font-editorial text-sm text-graphite mt-0.5 leading-relaxed">
                    You will receive a Google Meet invitation with a confirmed time slot.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="font-heading text-sm font-semibold text-ink w-6 h-6 rounded-full bg-paper border border-hairline flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-ink">Strategy Diagnosis</h4>
                  <p className="font-editorial text-sm text-graphite mt-0.5 leading-relaxed">
                    A focused 30-minute conversation to isolate friction and map technology architecture.
                  </p>
                </div>
              </li>
            </ul>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
            <Link href="/">
              <Button variant="primary" className="w-full sm:w-auto gap-2">
                <House className="w-4 h-4 stroke-[1.5]" />
                Return to Home
              </Button>
            </Link>
            <Link href="/solutions">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <LayoutGrid className="w-4 h-4 stroke-[1.5]" />
                Explore Solutions
              </Button>
            </Link>
            <Link href="/insights">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <BookOpen className="w-4 h-4 stroke-[1.5]" />
                Read Insights
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </GlobalLayout>
  );
}
