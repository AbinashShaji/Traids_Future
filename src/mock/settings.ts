// This file holds mock (fake) settings information for the website, like its name, tagline, email, and social media links.
// In the future, this data will be loaded from a live server (database), but for now, it is saved directly here to make development easier.
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
