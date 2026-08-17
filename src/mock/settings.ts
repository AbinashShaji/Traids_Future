/**
 * FILE: src/mock/settings.ts
 *
 * WHAT THIS DOES:
 * Stores global business and contact settings for the Triads Future website.
 *
 * WHERE IT IS USED:
 * - Read by the Footer component (src/components/footer.tsx) for office address, email, phone, and social links.
 * - Read by the Contact page (src/app/contact/contact-page-content.tsx) for direct communication details.
 *
 * HOW IT WORKS:
 * Centralizes all global text (company name, email, phone, social URLs) in one place
 * so you don't have to search and replace text across multiple pages.
 *
 * BEGINNER TIP:
 * If the company phone number, email, or physical address changes, edit this file!
 */

export const settings = {
  siteName: "Triads Future",
  tagline: "Business Growth & Technology Partner",
  description:
    "We help businesses grow through simple strategy, modern technology, and practical execution.",
  email: "partners@triadsfuture.com",
  phone: "+1 (555) 234-5678",
  address: "123 Editorial Boulevard, Suite 500, London, UK",
  businessHours: "Monday – Friday, 9am – 6pm GMT",
  // Social media accounts
  socials: {
    linkedin: "https://linkedin.com/company/triadsfuture",
    twitter: "https://twitter.com/triadsfuture",
  },
  // SEO contains parameters that help Google find and categorize our website.
  seo: {
    defaultTitle: "Triads Future — Business Growth & Technology Partner",
    defaultDescription:
      "We help businesses grow through simple strategy, modern technology, and practical execution.",
    ogImage: "/static/og-default.jpg",
  },
};
