import { Suspense } from "react";
import HomePageContent from "./home-page-content";
import { getFeaturedProjects } from "@/actions/projects";
import { getFeaturedTestimonials } from "@/actions/testimonials";
import { getFeaturedArticle } from "@/actions/insights";
import { GlobalLayout } from "../components/global-layout";
import { SectionWrapper } from "../components/section-wrapper";
import { Container } from "../components/container";

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();
  const featuredTestimonials = await getFeaturedTestimonials();
  const featuredArticle = await getFeaturedArticle();

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
      <HomePageContent 
        featuredProjects={featuredProjects}
        featuredTestimonials={featuredTestimonials}
        featuredArticle={featuredArticle}
      />
    </Suspense>
  );
}
