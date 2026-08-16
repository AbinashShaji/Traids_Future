// Reveal component with IntersectionObserver-driven scroll reveals and reduced-motion fallbacks.
"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useDevice } from "../providers/device-experience-manager";
import { variants } from "../animations/presets";

export interface RevealProps {
  children: React.ReactNode;
  variant?: "fadeUp" | "fadeIn" | "scaleIn" | "slideLeft";
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
