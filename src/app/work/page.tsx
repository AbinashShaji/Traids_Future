import { Suspense } from "react";
import WorkPageContent from "./work-page-content";
import { getProjects } from "@/actions/projects";
import { GlobalLayout } from "../../components/global-layout";
import { SectionWrapper } from "../../components/section-wrapper";
import { Container } from "../../components/container";

export default async function WorkPage() {
  const projects = await getProjects();

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
      <WorkPageContent projects={projects} />
    </Suspense>
  );
}
