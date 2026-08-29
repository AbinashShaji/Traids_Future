// This file is the entry point for the "About" page route of our website. It imports and renders the detailed AboutPageContent layout.
import AboutPageContent from "./about-page-content";
import { getFAQs } from "@/actions/faq";

// AboutPage renders the About page content.
// Inputs: None.
// Outputs: Renders the <AboutPageContent> component.
export default async function AboutPage() {
  const faqs = await getFAQs();
  return <AboutPageContent faqs={faqs} />;
}
