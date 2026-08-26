/**
 * FILE: src/components/section-heading.tsx
 *
 * WHAT THIS DOES:
 * Standardizes major section titles and subtitles across the entire website.
 *
 * WHERE IT IS USED:
 * - Used at the top of every section on Home, About, Solutions, Work, Insights, Contact, Privacy, and Terms.
 *
 * HOW IT WORKS:
 * 1. Takes a `subtitle` (e.g. "Capabilities" or "Manifesto") and styles it as an uppercase, tracked eyebrow in Inter font.
 * 2. If `withTriadMark={true}`, it adds the 3-bar triad mark next to the subtitle.
 * 3. Takes a `tag` prop (`h1`, `h2`, `h3`, `h4`) and renders the title using the Canela display heading font.
 *
 * ⚠️ BEGINNER NOTE:
 * This component guarantees that every headline across the website shares the exact same
 * font sizes, letter spacing (`tracking`), and line height!
 */

import * as React from "react";
import { cn } from "../utils/cn";
import { TriadMark } from "./triad-mark";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** The semantic HTML heading tag (defaults to "h2") */
  tag?: "h1" | "h2" | "h3" | "h4";
  /** Small uppercase subtitle text placed above the main headline */
  subtitle?: string;
  /** Whether to show the 3-bar triad mark next to the subtitle */
  withTriadMark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  className,
  tag = "h2",
  subtitle,
  withTriadMark = false,
  children,
  ...props
}) => {
  const Tag = tag;

  const tagStyles = {
    h1: "text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-heading font-normal md:font-medium tracking-[-0.02em] text-ink leading-[1.08]",
    h2: "text-3xl sm:text-4xl md:text-5xl font-heading font-normal md:font-medium tracking-[-0.015em] text-ink leading-[1.12]",
    h3: "text-2xl md:text-3xl font-heading font-medium tracking-[-0.01em] text-ink leading-[1.2]",
    h4: "text-lg md:text-xl font-heading font-medium text-ink leading-[1.3]",
  };

  return (
    <div className="flex flex-col gap-3">
      {subtitle && (
        <div className="flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-graphite">
          {withTriadMark && <TriadMark size="sm" />}
          <span>{subtitle}</span>
        </div>
      )}
      <Tag className={cn(tagStyles[tag], className)} {...props}>
        {children}
      </Tag>
    </div>
  );
};

SectionHeading.displayName = "SectionHeading";
