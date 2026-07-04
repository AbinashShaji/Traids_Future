// This file contains the SectionWrapper component. It wraps major pieces of the website in standard spaces (padding margins) and semantic HTML tags.
import * as React from "react";
import { cn } from "../utils/cn";

// SectionWrapperProps defines settings for wrapping our page sections.
// "padded" adds horizontal margins on the left and right sides so elements don't touch screen edges.
export interface SectionWrapperProps {
  /** Adds viewport-triggered entrance animation - kept for API compatibility, unused */
  animate?: boolean;
  /** Custom animation delay index for stagger effects - kept for API compatibility, unused */
  delay?: number;
  /** Inner max-width container padding */
  padded?: boolean;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

// SectionWrapper surrounds visual content blocks with editorial vertical padding.
// Inputs: "padded" (default true), "className" (custom styles), "id" (anchor identifier), "children" (nested content).
// Outputs: Renders a semantic <section> HTML tag.
export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  className,
  padded = true,
  id,
  children,
}) => {
  return (
    <section
      id={id}
      // Apply clean spacing on mobile (py-16) and larger screens (py-24), adding side padding if "padded" is true.
      className={cn("w-full py-16 md:py-24", padded && "px-6 md:px-12 lg:px-16", className)}
    >
      {children}
    </section>
  );
};
