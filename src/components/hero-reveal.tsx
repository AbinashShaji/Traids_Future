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
  baseDelay = 80,
  staggerInterval = 24,
}) => {
  const letterRefs = React.useRef<(HTMLSpanElement | null)[]>([]);

  // Split lines into structured word segments and individual letter glyphs
  const structuredLines = React.useMemo(() => {
    let globalIndex = 0;
    return lines.map((line) => {
      const words = line.text.trim().split(/\s+/).filter(Boolean);
      const lineWords = words.map((word) => {
        const letters = word.split("").map((char) => ({
          char,
          globalIndex: globalIndex++,
        }));
        return {
          word,
          letters,
        };
      });
      return {
        ...line,
        words: lineWords,
      };
    });
  }, [lines]);

  // Support both direct letter interval and fallback calculation if caller passes an old word interval (e.g. 120)
  const effectiveStagger = staggerInterval > 50 ? Math.round(staggerInterval / 4.5) : staggerInterval;

  React.useEffect(() => {
    // If reduced-motion is requested, leave everything visible and sharp
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const inners = letterRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (inners.length === 0) return;

    // Step 1: Arm all letters simultaneously (hide with subtle blur and displacement)
    inners.forEach((el) => {
      el.setAttribute("data-letter-state", "armed");
    });

    // Step 2: Reveal each letter in sequence with progressive blur resolving to sharp text
    const timers: ReturnType<typeof setTimeout>[] = [];

    inners.forEach((el, idx) => {
      const delay = baseDelay + idx * effectiveStagger;
      const t = setTimeout(() => {
        el.setAttribute("data-letter-state", "visible");
      }, delay);
      timers.push(t);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [baseDelay, effectiveStagger, structuredLines]);

  return (
    <Tag className={cn("block", headingClassName)}>
      {structuredLines.map((line, lineIdx) => (
        <span
          key={lineIdx}
          className={cn("fz-hero-line", line.className, lineWrapperClassName)}
          aria-hidden={undefined}
        >
          {line.words.map(({ word, letters }, wordIdx) => (
            <span key={wordIdx} className="fz-hero-word-wrap" aria-label={word}>
              {letters.map(({ char, globalIndex }) => (
                <span
                  key={globalIndex}
                  ref={(el) => {
                    letterRefs.current[globalIndex] = el;
                  }}
                  className={cn("fz-hero-letter", line.className)}
                  aria-hidden="true"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
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
