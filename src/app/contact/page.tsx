// This file controls the main entry point for the "Contact" page route.
// It wraps the interactive form (ContactPageContent) inside a Next.js Suspense boundary.
// Suspense is like a loading screen placeholder; it displays a pulsing skeleton layout until the client-side JavaScript is ready.
import { Suspense } from "react";
import ContactPageContent from "./contact-page-content";
import { GlobalLayout } from "../../components/global-layout";
import { SectionWrapper } from "../../components/section-wrapper";
import { Container } from "../../components/container";

// ContactPage renders the Suspense shell and triggers the form component loading.
// Inputs: None.
// Outputs: Renders either a loading skeleton placeholder or the active <ContactPageContent> form.
export default function ContactPage() {
  return (
    <Suspense
      // fallback defines the HTML elements drawn on screen while we wait for JavaScript files to fetch.
      fallback={
        <GlobalLayout>
          <SectionWrapper animate={false} className="pt-32 pb-16">
            <Container>
              {/* Pulsing gray skeletons indicating page layout areas */}
              <div className="max-w-3xl flex flex-col gap-4 animate-pulse">
                <div className="h-4 w-32 bg-[#E8E8E8] rounded-sm" />
                <div className="h-10 w-full max-w-xl bg-[#E8E8E8] rounded-sm" />
                <div className="h-5 w-full max-w-lg bg-[#E8E8E8] rounded-sm" />
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
