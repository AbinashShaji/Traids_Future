/**
 * FILE: src/components/cta.tsx
 *
 * WHAT THIS DOES:
 * Renders the high-impact "Call to Action" (CTA) closing section at the bottom of pages.
 *
 * WHERE IT IS USED:
 * - The final conversion slide on the Homepage (/), About page (/about), Solutions page (/solutions),
 *   and individual Case Study detail pages (/work/[slug]).
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface CTAProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The main large headline */
  headline: string;
  /** Explanatory subtext */
  description?: string;
  /** Small uppercase label above the headline (defaults to "Next Step") */
  eyebrow?: string;
}

export const CTA: React.FC<CTAProps> = ({
  className,
  headline,
  description,
  eyebrow = "Next Step",
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "py-24 md:py-32 lg:py-36 border-t border-[#e4e4e7] flex flex-col items-center text-center max-w-4xl mx-auto px-6",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#e11d48] mb-4 inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tighter text-[#0a0a0a] mb-5 leading-[1.08] max-w-3xl">
        {headline}
      </h2>

      {description && (
        <p className="font-sans text-[#71717a] max-w-2xl text-lg md:text-xl mb-10 leading-relaxed">
          {description}
        </p>
      )}

      {children && (
        <div className="flex flex-wrap justify-center items-center gap-4">
          {children}
        </div>
      )}
    </div>
  );
};

CTA.displayName = "CTA";
