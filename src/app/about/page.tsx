import type { Metadata } from "next";
import AboutPageContent from "./about-page-content";
import { getFAQs } from "@/actions/faq";

export const metadata: Metadata = {
  title: "About Us — Triads Future",
  description: "Learn about Triads Future, our mission, values, and how we help growing businesses scale through custom technology and strategic execution.",
};

// AboutPage renders the About page content.
// Inputs: None.
// Outputs: Renders the <AboutPageContent> component.
export default async function AboutPage() {
  const faqs = await getFAQs();
  return <AboutPageContent faqs={faqs} />;
}
