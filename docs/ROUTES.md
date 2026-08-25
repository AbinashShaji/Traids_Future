# Application Routes

This document outlines the primary user-facing routes and their purpose within the Traids Future application.

## Public Routes

| Route | Main Component | Purpose | Data Source | Next Action |
|-------|----------------|---------|-------------|-------------|
| `/` | `src/app/page.tsx` | Homepage providing an overview of the Triad model, solutions, and featured work. | `src/mock/projects.ts`, `src/mock/testimonials.ts`, `src/mock/articles.ts` | Navigate to Solutions or Contact |
| `/about` | `src/app/about/page.tsx` | Details the founding philosophy, team members, and operating principles. | `src/mock/team.ts`, `src/mock/faq.ts` | Read insights or contact |
| `/contact` | `src/app/contact/page.tsx` | Strategy consultation booking form and general inquiries. | `src/mock/settings.ts`, `src/mock/faq.ts` | Submit contact form -> `/thank-you` |
| `/insights` | `src/app/insights/page.tsx` | Strategic perspectives, thought leadership, and blog directory. | `src/mock/articles.ts` | Read an article (`/insights/[slug]`) |
| `/insights/[slug]` | Not implemented in mock | Individual article details page. | `src/mock/articles.ts` | N/A |
| `/solutions` | `src/app/solutions/page.tsx` | Detailed breakdown of offered commercial solutions. | `src/mock/solutions.ts` | Book a call |
| `/work` | `src/app/work/page.tsx` | Case studies and featured client outcomes directory. | `src/mock/projects.ts` | Read a case study (`/work/[slug]`) |
| `/work/[slug]` | Not implemented in mock | Individual project/case study details page. | `src/mock/projects.ts` | N/A |
| `/thank-you` | `src/app/thank-you/page.tsx` | Confirmation page following a successful contact form submission. | N/A | Return to home |
| `/privacy` | `src/app/privacy/page.tsx` | Static privacy policy placeholder. | N/A | N/A |
| `/terms` | `src/app/terms/page.tsx` | Static terms of service placeholder. | N/A | N/A |

## Protected Routes
*Note: Authentication and Protected Routes (CMS, Admin Dashboard) are not implemented in Version 1.*
