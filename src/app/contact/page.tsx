// Contact page route wrapping the interactive form inside a Next.js Suspense boundary.
import { Suspense } from "react";
import ContactPageContent from "./contact-page-content";
import { GlobalLayout } from "../../components/global-layout";
import { SectionWrapper } from "../../components/section-wrapper";
import { Container } from "../../components/container";

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <GlobalLayout>
          <SectionWrapper className="pt-32 pb-16">
            <Container>
              <div className="max-w-3xl flex flex-col gap-4 animate-pulse">
                <div className="h-4 w-32 bg-[#DEDDD3] rounded-[2px]" />
                <div className="h-10 w-full max-w-xl bg-[#DEDDD3] rounded-[2px]" />
                <div className="h-5 w-full max-w-lg bg-[#DEDDD3] rounded-[2px]" />
              </div>
            </Container>
          </SectionWrapper>
        </GlobalLayout>
      }
    >
      <ContactPageContent />
    </Suspense>
  );
}
