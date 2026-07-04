// This file defines the SectionHeading component. It displays page and section headers with clean typography, supporting tags (H1-H4) and optional small uppercase subtitles.
import * as React from "react";
import { cn } from "../utils/cn";

// SectionHeadingProps defines the setup values we can pass to this component.
// "tag" decides the HTML heading level (like h1 for main page titles, or h2 for section titles).
// "subtitle" is an optional small gray label shown above the main title.
export interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  tag?: "h1" | "h2" | "h3" | "h4";
  subtitle?: string;
}

// SectionHeading displays structured titles on our web pages.
// Inputs: "tag" (default "h2"), "subtitle", "children" (heading text), "className" (custom styles).
// Outputs: Renders a wrapping <div> containing the optional subtitle span and the configured HTML heading tag (like <h1> or <h2>).
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  className,
  tag = "h2",
  subtitle,
  children,
  ...props
}) => {
  // Dynamically set the HTML tag name based on the "tag" prop (e.g. h1, h2, etc.)
  const Tag = tag;

  // Custom styling rules for each heading level.
  const tagStyles = {
    h1: "text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-[#111111] leading-[1.1]",
    h2: "text-3xl md:text-4xl font-heading font-semibold tracking-tight text-[#111111] leading-[1.2]",
    h3: "text-xl md:text-2xl font-heading font-medium tracking-tight text-[#111111] leading-[1.3]",
    h4: "text-lg font-heading font-medium text-[#111111] leading-[1.4]",
  };

  return (
    <div className="flex flex-col gap-2">
      {/* If a subtitle exists, render it as a small uppercase gray label */}
      {subtitle && (
        <span className="font-sans text-xs uppercase tracking-wider text-[#5F5F5F]">
          {subtitle}
        </span>
      )}
      {/* Renders the dynamic heading tag with selected text sizes and styles */}
      <Tag className={cn(tagStyles[tag], className)} {...props}>
        {children}
      </Tag>
    </div>
  );
};
