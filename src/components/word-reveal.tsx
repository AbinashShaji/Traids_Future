/**
 * FILE: src/components/word-reveal.tsx
 *
 * Subpage headline reveal — used on all inner pages that are NOT the homepage.
 * Each word slides up from its clipped container with a controlled stagger.
 *
 * This is distinct from HeroReveal (homepage) — subpages use a slightly
 * faster, tighter entrance to establish hierarchy without dominating the page.
 * Triggered on page load via html.js-ready (set by ScrollObserver).
 * Respects prefers-reduced-motion via CSS override in globals.css.
 */
"use client";

import * as React from "react";
import { cn } from "../utils/cn";

interface WordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delayOffset?: number;
  /** Stagger interval per word in ms (default 80) */
  staggerMs?: number;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className,
  wordClassName,
  as: Tag = "h1",
  delayOffset = 0,
  staggerMs = 80,
}) => {
  const words = React.useMemo(() => text.split(" "), [text]);

  return (
    <Tag className={cn("inline-block", className)}>
      {words.map((word, index) => (
        <span
          key={index}
          className={cn("fz-word-reveal mr-[0.25em] last:mr-0", wordClassName)}
          style={{ animationDelay: `${delayOffset + index * staggerMs}ms` }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
};

WordReveal.displayName = "WordReveal";
