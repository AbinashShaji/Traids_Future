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
    h1: "text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-sans font-bold tracking-tighter text-[#0a0a0a] leading-[1.04]",
    h2: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tighter text-[#0a0a0a] leading-[1.08]",
    h3: "text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-[#0a0a0a] leading-[1.15]",
    h4: "text-xl md:text-2xl font-sans font-semibold tracking-tight text-[#0a0a0a] leading-[1.25]",
  };

  return (
    <div className="flex flex-col gap-3">
      {subtitle && (
        <div className="flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-widest text-[#71717a]">
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
