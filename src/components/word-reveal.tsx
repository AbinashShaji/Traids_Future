/**
 * FILE: src/components/word-reveal.tsx
 *
 * Staggered word-by-word headline reveal following FinZave specification:
 * - 80ms interval per word
 * - 20px vertical shift ease-out
 * - Respects prefers-reduced-motion via CSS overrides
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
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className,
  wordClassName,
  as: Tag = "h1",
  delayOffset = 0,
}) => {
  const words = React.useMemo(() => text.split(" "), [text]);

  return (
    <Tag className={cn("inline-block", className)}>
      {words.map((word, index) => (
        <span
          key={index}
          className={cn("fz-word-reveal mr-[0.25em] last:mr-0", wordClassName)}
          style={{ animationDelay: `${delayOffset + index * 80}ms` }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
};
