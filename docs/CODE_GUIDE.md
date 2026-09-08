# Code Guide

This guide is for any developer taking over the Triads Future codebase. It outlines where code lives, how it is organized, and how to debug common issues.

## Where Things Live

| What | Where |
|------|-------|
| **Pages & Routes** | `src/app/` (e.g., `src/app/about/page.tsx`) |
| **Reusable UI Components** | `src/components/` (e.g., `src/components/button.tsx`) |
| **Page Layouts & Global Wrapper** | `src/app/layout.tsx` and `src/components/global-layout.tsx` |
| **Static Content & Data** | `src/mock/` (e.g., `src/mock/projects.ts`) |
| **Global CSS & Theme Variables** | `src/app/globals.css` |
| **Animations & Framer Motion Variants**| `src/animations/presets.ts` (or hardcoded in component) |
| **Utility Functions** | `src/utils/` (e.g., `src/utils/cn.ts` for Tailwind merging) |

## How to Add New Things

### How to Add a Page
1. Create a new folder in `src/app/` (e.g., `src/app/new-page/`).
2. Add a `page.tsx` file inside that folder.
3. Import `GlobalLayout` and wrap your content. If you want the desktop scroll snapping, wrap your sections in `ScrollWorldContainer` and ensure sections have the `.slide-section` class.

### How to Add/Edit Content
1. Navigate to `src/mock/`.
2. Open the relevant file (e.g., `articles.ts` or `team.ts`).
3. Add a new object to the exported array following the existing TypeScript interface structure. The UI will automatically reflect the new data.

## Best Practices
- **Single Responsibility:** Keep components small. If a page file gets too large, split it into smaller logical chunks.
- **Tailwind:** Avoid creating bespoke CSS unless absolutely necessary. Rely on Tailwind's utility classes. Use `cn()` from `src/utils/cn.ts` when conditionally joining classes.
- **Type Safety:** Always define explicit interfaces for component Props. Avoid `any`.

## Debugging Common Problems
- **"Scroll snapping isn't working on Desktop!"**
  - Ensure the parent uses `<ScrollWorldContainer>`.
  - Ensure the immediate children are `<section>` tags with the `slide-section` class.
  - Verify that the `min-h-[100dvh]` (or appropriate height) is applied so the section takes up the screen.
- **"Build fails with font error"**
  - If `next/font/google` fails to fetch, check your internet connection or proxy settings.
- **"Tailwind classes aren't applying dynamically"**
  - Ensure you aren't concatenating partial class names (e.g., `bg-${color}-500`). Tailwind cannot scan dynamically constructed classes. Use full class names.
