import { Suspense } from "react";
import InsightsPageContent from "./insights-page-content";
import { getInsights } from "@/actions/insights";
import { GlobalLayout } from "../../components/global-layout";
import { SectionWrapper } from "../../components/section-wrapper";
import { Container } from "../../components/container";

export default async function InsightsPage() {
  const articles = await getInsights();

  return (
    <Suspense
      fallback={
        <GlobalLayout>
          <SectionWrapper className="pt-24 pb-12 md:pt-32 md:pb-16">
            <Container>
              <div className="max-w-3xl flex flex-col gap-4 animate-pulse">
                <div className="h-4 w-32 bg-hairline rounded-[2px]" />
                <div className="h-10 w-full max-w-xl bg-hairline rounded-[2px]" />
                <div className="h-5 w-full max-w-lg bg-hairline rounded-[2px]" />
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
