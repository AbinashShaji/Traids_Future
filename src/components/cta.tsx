/**
 * FILE: src/components/cta.tsx
 *
 * WHAT THIS DOES:
 * Renders the high-impact "Call to Action" (CTA) closing section at the bottom of pages.
 *
 * WHERE IT IS USED:
 * - The final conversion slide on the Homepage (/), About page (/about), Solutions page (/solutions),
 *   and individual Case Study detail pages (/work/[slug]).
 *
 * HOW IT WORKS:
 * 1. Takes an `eyebrow` (e.g. "Next Step"), `headline` (e.g. "Ready to build systems that scale?"),
 *    and an editorial `description`.
 * 2. Centers the content with a crisp top divider (`border-t border-[#DEDDD3]`).
 * 3. Renders any action buttons passed as `{children}` (e.g. `<Button>Book Consultation</Button>`).
 *
 * BEGINNER TIP:
 * A CTA is the place where you invite the visitor to take the next step (like booking a call)!
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
        "py-20 md:py-28 border-t border-[#DEDDD3] flex flex-col items-center text-center max-w-3xl mx-auto px-6",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#57564C] mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal md:font-medium tracking-tight text-[#14140F] mb-4 leading-[1.12]">
        {headline}
      </h2>
      
      {description && (
        <p className="font-editorial text-[#57564C] max-w-xl text-lg md:text-xl mb-8 leading-relaxed">
          {description}
        </p>
      )}
      
      {children && <div className="flex flex-wrap justify-center items-center gap-4">{children}</div>}
    </div>
  );
};

CTA.displayName = "CTA";
