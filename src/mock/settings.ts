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
    "We partner with growing businesses to deliver sustained growth through strategy, modern technology, and practical execution.",
  email: "contact@triadsfuture.com",
  businessHours: "Monday – Friday, 9:00 AM – 6:00 PM",
  // Verified social channels (empty until official profiles are confirmed by owner)
  socials: {},
  // SEO configuration
  seo: {
    defaultTitle: "Triads Future — Business Growth & Technology Partner",
    defaultDescription:
      "We partner with growing businesses to deliver sustained growth through strategy, modern technology, and practical execution.",
    ogImage: "/static/og-default.jpg",
  },
};
