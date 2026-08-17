/**
 * FILE: src/animations/presets.ts
 *
 * WHAT THIS DOES:
 * Contains reusable animation recipes (called "Variants" in Framer Motion)
 * that make titles, text, and cards smoothly glide into view when scrolled to.
 *
 * WHERE IT IS USED:
 * - Used by the <Reveal> component (`src/components/reveal.tsx`).
 * - Used by the hero sections on the Homepage (/) and Solutions page (/solutions).
 *
 * HOW IT WORKS:
 * 1. `revealEase`: A custom mathematical curve `[0.22, 1, 0.36, 1]` that makes motion
 *    start fast and gently decelerate to a smooth stop (feels calm and expensive).
 * 2. `variants.fadeUp`: Starts the element 20px lower and transparent, then floats it up.
 * 3. `getHeroContainerVariants` / `getHeroItemVariants`: Staggers multiple items so they appear
 *    one after another (0.12s apart) instead of popping up all at once.
 *
 * ⚠️ BEGINNER NOTE:
 * If a user has "Reduced Motion" turned on in their computer accessibility settings,
 * these presets automatically skip the movement to prevent dizziness!
 */

import type { Variants } from "framer-motion";

export const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: revealEase,
        delay: custom * 0.1,
      },
    }),
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: revealEase,
        delay: custom * 0.1,
      },
    }),
  },
};

// Hero staggered animation variants for editorial statement heroes
export const getHeroContainerVariants = (prefersReducedMotion?: boolean | null): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: prefersReducedMotion ? 0 : 0.12,
      delayChildren: prefersReducedMotion ? 0 : 0.05,
    },
  },
});

export const getHeroItemVariants = (prefersReducedMotion?: boolean | null): Variants => ({
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.65,
      ease: revealEase,
    },
  },
});
