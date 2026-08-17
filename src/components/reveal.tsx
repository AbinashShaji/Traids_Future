/**
 * FILE: src/components/reveal.tsx
 *
 * WHAT THIS DOES:
 * Wraps any HTML element or text and makes it smoothly fade in when it scrolls into view.
 *
 * WHERE IT IS USED:
 * - Used across page headings, cards, and text blocks throughout the site.
 *
 * HOW IT WORKS:
 * 1. Uses Framer Motion's `whileInView="visible"` and `viewport={{ once: true }}`.
 * 2. When the user scrolls down and the element is 45% visible on screen, it triggers the fade-up animation.
 * 3. If the user has "Reduced Motion" enabled in their operating system, it renders a plain static HTML tag instead!
 *
 * BEGINNER TIP:
 * Wrap any component in `<Reveal delay={1}>...</Reveal>` to make it animate when scrolled to!
 */
"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useDevice } from "../providers/device-experience-manager";
import { variants } from "../animations/presets";

export interface RevealProps {
  children: React.ReactNode;
  variant?: "fadeUp" | "fadeIn";
  delay?: number;
  force?: boolean;
  className?: string;
  as?: "div" | "span" | "section" | "h1" | "h2" | "h3" | "p" | "ul" | "li" | "aside" | "header" | "footer";
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = "fadeUp",
  delay = 0,
  force = false,
  className,
  as = "div",
}) => {
  const { isDesktop } = useDevice();
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = !prefersReducedMotion && (isDesktop || force);

  if (shouldAnimate) {
    const variantConfig = variants[variant] || variants.fadeUp;

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        variants={variantConfig}
        custom={delay}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const Tag = as;
  return (
    <Tag className={className}>
      {children}
    </Tag>
  );
};

Reveal.displayName = "Reveal";
