/**
 * FILE: src/components/section-wrapper.tsx
 *
 * WHAT THIS DOES:
 * Wraps major content sections in semantic `<section>` HTML tags with standard vertical spacing.
 *
 * WHERE IT IS USED:
 * - Non-slide pages (like the fallback on `/contact` or individual article pages).
 *
 * HOW IT WORKS:
 * 1. Automatically renders `<section id={id}>`.
 * 2. Applies standard vertical padding (`py-16 md:py-24`).
 * 3. Applies side padding (`px-6 md:px-12 lg:px-16`) unless `padded={false}`.
 *
 * BEGINNER TIP:
 * Wrapping sections in semantic `<section>` tags helps search engines and accessibility tools index the page!
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface SectionWrapperProps {
  /** Inner max-width container padding */
  padded?: boolean;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  className,
  padded = true,
  id,
  children,
}) => {
  return (
    <section
      id={id}
      className={cn("w-full py-16 md:py-24", padded && "px-6 md:px-12 lg:px-16", className)}
    >
      {children}
    </section>
  );
};

SectionWrapper.displayName = "SectionWrapper";
