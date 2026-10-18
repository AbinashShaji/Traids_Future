import { Suspense } from "react";
import type { Metadata } from "next";
import InsightsPageContent from "./insights-page-content";
import { getInsights } from "@/actions/insights";
import { GlobalLayout } from "../../components/global-layout";
import { SectionWrapper } from "../../components/section-wrapper";
import { Container } from "../../components/container";

export const metadata: Metadata = {
  title: "Insights & Perspectives — Triads Future",
  description: "Practical guides, technical perspectives, and business growth strategies from the Triads Future team.",
};

export default async function InsightsPage() {
  const articles = await getInsights();

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
      <InsightsPageContent articles={articles} />
    </Suspense>
  );
}
