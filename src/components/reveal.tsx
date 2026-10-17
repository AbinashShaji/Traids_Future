/**
 * FILE: src/components/reveal.tsx
 *
 * WHAT THIS DOES:
 * Static semantic wrapper component.
 * Motion and scroll-triggered animations have been cleaned up in accordance with
 * the controlled motion cleanup pass.
 */

import * as React from "react";

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
  className,
  as: Tag = "div",
}) => {
  return (
    <Tag className={className}>
      {children}
    </Tag>
  );
};

Reveal.displayName = "Reveal";
