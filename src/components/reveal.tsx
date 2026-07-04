// This file defines the Reveal wrapper component. It is used to apply entrance animations (like fading in or sliding) when an element scrolls into view on computers.
// It detects mobile screens or "reduced motion" options and automatically turns off the animation, showing the content statically instead.
"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useDevice } from "../providers/device-experience-manager";
import { variants } from "../animations/presets";

// RevealProps configures the animation style and element configuration.
// "variant" specifies the transition type (like fadeUp or fadeIn).
// "delay" is an index offset used to chain a sequence of items (making them load one-by-one).
// "force" overrides screen size checks and forces animations on mobile/tablet viewports.
// "as" allows us to decide what HTML element is created (like a div, section, or list item).
export interface RevealProps {
  children: React.ReactNode;
  variant?: "fadeUp" | "fadeIn" | "scaleIn" | "slideLeft";
  delay?: number;
  force?: boolean;
  className?: string;
  as?: "div" | "span" | "section" | "h1" | "h2" | "h3" | "p" | "ul" | "li" | "aside" | "header" | "footer";
}

// Reveal conditionally animates its contents on scroll.
// Inputs: "variant" (default "fadeUp"), "delay" (default 0), "force" (default false), "as" (default "div"), "children", "className".
// Outputs: Renders either a motion-activated element or a plain static HTML tag.
export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = "fadeUp",
  delay = 0,
  force = false,
  className,
  as = "div",
}) => {
  // Read current device size from the DeviceContext.
  const { isDesktop } = useDevice();
  // Check if the user's OS has disabled motion.
  const prefersReducedMotion = useReducedMotion();

  // Animation runs if: the user did NOT request reduced motion, AND (we are on a desktop screen OR the animation is forced).
  const shouldAnimate = !prefersReducedMotion && (isDesktop || force);

  // If we should animate, render a dynamic motion element with Framer Motion scroll listeners.
  if (shouldAnimate) {
    // Select the correct motion element (e.g. motion.div, motion.span, etc.)
    const MotionComponent = (motion as any)[as] || motion.div;
    // Choose the corresponding translation variant rules.
    const variantConfig = variants[variant] || variants.fadeUp;

    // Renders the animation element.
    // "initial" sets the hidden start state.
    // "whileInView" activates the visible state.
    // "viewport" triggers the animation once when 20% of the element is visible on screen.
    return (
      <MotionComponent
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
        variants={variantConfig}
        custom={delay}
        className={className}
      >
        {children}
      </MotionComponent>
    );
  }

  // Fallback branch: if we should NOT animate, render a plain static HTML tag with no motion triggers to keep the site fast and stable.
  const Tag = as as any;
  return (
    <Tag className={className}>
      {children}
    </Tag>
  );
};

Reveal.displayName = "Reveal";
