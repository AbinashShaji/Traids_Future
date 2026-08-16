// Animation presets matching Design System v2: 0.65s, cubic-bezier(0.22, 1, 0.36, 1), 0.1s stagger.
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
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: revealEase,
        delay: custom * 0.1,
      },
    }),
  },
  slideLeft: {
    hidden: { opacity: 0, x: 24 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.65,
        ease: revealEase,
        delay: custom * 0.1,
      },
    }),
  },
};
