import { Suspense } from "react";
import type { Metadata } from "next";
import { ContactPageContent } from "./contact-page-content";
import { GlobalLayout } from "../../components/global-layout";
import { SectionWrapper } from "../../components/section-wrapper";
import { Container } from "../../components/container";
import { getFAQs } from "@/actions/faq";

export const metadata: Metadata = {
  title: "Contact & Consultation — Triads Future",
  description: "Get in touch with Triads Future to schedule a discovery call or discuss your upcoming digital project.",
};

export default async function ContactPage() {
  const faqs = await getFAQs();

  return (
    <Suspense
      fallback={
        <GlobalLayout>
          <SectionWrapper className="pt-24 pb-12 md:pt-32 md:pb-16">
            <Container>
              <div className="max-w-3xl flex flex-col gap-4 animate-pulse">
                <div className="h-4 w-32 bg-[#f4f4f5] rounded-full" />
                <div className="h-10 w-full max-w-xl bg-[#f4f4f5] rounded-xl" />
                <div className="h-5 w-full max-w-lg bg-[#f4f4f5] rounded-xl" />
              </div>
            </Container>
          </SectionWrapper>
        </GlobalLayout>
      }
    >
      <ContactPageContent faqs={faqs} />
    </Suspense>
  );
}
