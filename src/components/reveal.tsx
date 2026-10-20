/**
 * FILE: src/components/reveal.tsx
 *
 * Hydration-Safe Progressive Scroll Reveal Component.
 * - Server-rendered markup is 100% visible by default (zero FOUC, zero hydration mismatch).
 * - Elements above the fold or in viewport at mount time stay visible immediately without delay.
 * - Below-the-fold elements are armed strictly post-mount in useEffect.
 * - Triggers smooth fade/slide upon intersecting the viewport.
 * - Fully respects prefers-reduced-motion and no-JS environments.
 */

"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

export interface RevealProps {
  children: React.ReactNode;
  variant?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight";
  delay?: number;
  force?: boolean;
  className?: string;
  as?:
    | "div"
    | "span"
    | "section"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "ul"
    | "li"
    | "aside"
    | "header"
    | "footer";
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = "fadeUp",
  delay = 0,
  className = "",
  as: Tag = "div",
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [revealState, setRevealState] = useState<"armed" | "visible" | undefined>(undefined);

  // Normalize delay: if <= 10, treat as stagger step index (e.g. 1 -> 95ms, 2 -> 190ms), else raw ms
  const delayMs = delay > 0 ? (delay <= 10 ? delay * 95 : delay) : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: leave element visible without animating
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      return;
    }

    // Check if element is already in viewport or above fold on mount
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight * 0.9) {
      // Already near or in viewport, stay visible without flashing or delaying
      return;
    }

    // Element is below the fold: arm it for entrance
    setRevealState("armed");

    // Create IntersectionObserver to trigger reveal when entering viewport
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealState("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const variantClass = `variant-${variant}`;
  const combinedClassName = `fz-reveal-wrap ${variantClass} ${className}`.trim();

  const style =
    revealState === "visible" && delayMs > 0
      ? { transitionDelay: `${delayMs}ms` }
      : undefined;

  return React.createElement(
    Tag,
    {
      ref,
      className: combinedClassName,
      "data-reveal-state": revealState,
      style,
    },
    children
  );
};

Reveal.displayName = "Reveal";
