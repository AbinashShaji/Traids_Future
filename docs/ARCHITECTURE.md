# Architecture Overview

## Current Stack
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

## Application Structure
The application is currently a static frontend. Data is supplied via mock files located in `src/mock`.
- `src/app/`: Next.js App Router definitions (Pages, Layouts).
- `src/components/`: Reusable UI components.
- `src/mock/`: Static data representing content (Articles, Projects, Testimonials, Settings).
- `src/providers/`: Context providers (e.g., Device Experience Manager).

## Design Philosophy
- **Component Reusability:** Core components like `<Button />`, `<Card />`, and `<Container />` are designed for maximum reuse without cluttering page-level files.
- **Scroll World Concept:** The site employs a custom `ScrollWorldContainer` on desktop, which leverages CSS `scroll-snap-type` to create a slide-by-slide narrative experience.
- **Clean Naming:** Files and functions aim to be declarative (`contact-page-content.tsx`, `handleSubscribe`).

## Future Scalability
While this V1 operates as a static site, the architecture is primed for integration with headless CMS platforms (e.g., Sanity, Contentful) or a database backend (e.g., Prisma + PostgreSQL). The `src/mock/` structure cleanly isolates data fetching logic so it can be swapped out with real API calls or Server Actions in the future.
