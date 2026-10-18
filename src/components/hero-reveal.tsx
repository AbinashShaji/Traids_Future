/**
 * FILE: src/components/hero-reveal.tsx
 *
 * Editorial Masked Line Reveal for hero headlines.
 *
 * Design intent:
 * - Each visual line of the headline is wrapped in an overflow:hidden container
 *   (.fz-hero-line). The text inside (.fz-hero-line__inner) rises from below
 *   the clipping boundary into its resting position — a clean "mask reveal"
 *   effect without word-by-word fragmentation.
 * - Lines stagger at 120ms intervals for a controlled editorial cadence.
 * - Supporting elements (subtitle, CTAs) follow the last line with a short delay.
 * - Works safely with SSR: server-rendered HTML is fully visible by default.
 *   Animation states ("armed" → "visible") are applied strictly post-hydration.
 * - Respects prefers-reduced-motion via CSS (see globals.css).
 * - CLS-safe: overflow:hidden clipping preserves the final line height in layout.
 */
"use client";

import * as React from "react";
import { cn } from "../utils/cn";

/* ——— Types ——————————————————————————————————————————————————— */

export interface HeroLine {
  /** The text content to display on this line */
  text: string;
  /** Additional Tailwind / CSS classes on the line (e.g. colour) */
  className?: string;
}

export interface HeroRevealProps {
  /**
   * Lines to render inside the clipped headline.
   * Each line is wrapped individually for the mask effect.
   */
  lines: HeroLine[];
  /** Element tag for the outer heading — defaults to "h1" */
  as?: "h1" | "h2";
  /** Class applied to the outer heading element */
  headingClassName?: string;
  /** Class applied to every line wrapper (.fz-hero-line) */
  lineWrapperClassName?: string;
  /** Starting stagger delay in ms (default 0) */
  baseDelay?: number;
  /** Per-line stagger interval in ms (default 120) */
  staggerInterval?: number;
  /**
   * Delay before supporting content (subtitle, CTAs) becomes visible.
   * This is provided as a data attribute on the wrapper so parent
   * components can target it, or passed as a CSS var.
   * Default: after last line + 100ms.
   */
  supportDelay?: number;
}

/* ——— Component ——————————————————————————————————————————————— */

export const HeroReveal: React.FC<HeroRevealProps> = ({
  lines,
  as: Tag = "h1",
  headingClassName,
  lineWrapperClassName,
  baseDelay = 0,
  staggerInterval = 120,
}) => {
  const lineRefs = React.useRef<(HTMLSpanElement | null)[]>([]);

  React.useEffect(() => {
    // If reduced-motion is requested, leave everything visible
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const inners = lineRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (inners.length === 0) return;

    // Step 1: Arm all lines simultaneously (hide them below the clip)
    inners.forEach((el) => {
      el.setAttribute("data-line-state", "armed");
    });

    // Step 2: Reveal each line with a staggered delay
    const timers: ReturnType<typeof setTimeout>[] = [];

    inners.forEach((el, idx) => {
      const delay = baseDelay + idx * staggerInterval;
      const t = setTimeout(() => {
        el.setAttribute("data-line-state", "visible");
      }, delay);
      timers.push(t);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [baseDelay, staggerInterval]);

  return (
    <Tag className={cn("block", headingClassName)}>
      {lines.map((line, idx) => (
        <span
          key={idx}
          className={cn("fz-hero-line", lineWrapperClassName)}
          aria-hidden={undefined}
        >
          <span
            ref={(el) => {
              lineRefs.current[idx] = el;
            }}
            className={cn("fz-hero-line__inner", line.className)}
          >
            {line.text}
          </span>
        </span>
      ))}
    </Tag>
  );
};

HeroReveal.displayName = "HeroReveal";

/* ——— HeroSupport: subtle entrance for subtitle and CTAs ————— */

export interface HeroSupportProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before the entrance starts (default 400) */
  delay?: number;
  delayMs?: number;
}

export const HeroSupport: React.FC<HeroSupportProps> = ({
  children,
  className,
  delay,
  delayMs,
}) => {
  const effectiveDelay = delayMs ?? delay ?? 400;
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    el.setAttribute("data-support-state", "armed");

    const t = setTimeout(() => {
      el.setAttribute("data-support-state", "visible");
    }, effectiveDelay);

    return () => clearTimeout(t);
  }, [effectiveDelay]);

  return (
    <div ref={ref} className={cn("fz-hero-support", className)}>
      {children}
    </div>
  );
};

HeroSupport.displayName = "HeroSupport";
