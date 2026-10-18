import { Suspense } from "react";
import type { Metadata } from "next";
import WorkPageContent from "./work-page-content";
import { getProjects } from "@/actions/projects";
import { GlobalLayout } from "../../components/global-layout";
import { SectionWrapper } from "../../components/section-wrapper";
import { Container } from "../../components/container";

export const metadata: Metadata = {
  title: "Our Work — Triads Future",
  description: "Explore selected case studies and digital systems built by Triads Future for ambitious companies.",
};

export default async function WorkPage() {
  const projects = await getProjects();

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
      <WorkPageContent projects={projects} />
    </Suspense>
  );
}
