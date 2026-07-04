// This file contains the instructions (called "variants") for how different parts of the website should animate (like fading in or sliding up) when they appear on the screen.
import type { Variants } from "framer-motion";

// This is a custom speed setting (called "easing") that makes animations start fast and slow down smoothly at the end.
export const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// This is a collection of different animation styles that can be applied to website elements.
export const variants: Record<string, Variants> = {
  // fadeUp makes an element start invisible and slightly lower down, then fade in and slide up to its normal position.
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6, // The animation takes 0.6 seconds to complete.
        ease: revealEase,
        delay: custom * 0.08, // Extra delay so multiple items animate one after the other in a sequence.
      },
    }),
  },
  // fadeIn makes an element start invisible and smoothly become fully visible in place.
  fadeIn: {
    hidden: { opacity: 0 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: revealEase,
        delay: custom * 0.08,
      },
    }),
  },
  // scaleIn makes an element start invisible and slightly shrunk, then grow to normal size while fading in.
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: revealEase,
        delay: custom * 0.08,
      },
    }),
  },
  // slideLeft makes an element start invisible and shifted to the right, then fade in and slide left into place.
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: (custom: number = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: revealEase,
        delay: custom * 0.08,
      },
    }),
  },
};
