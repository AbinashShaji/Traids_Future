// This file contains the CTA (Call to Action) component. It displays a prominent section with a headline, description, and action buttons to encourage visitors to book a call or contact the company.
import * as React from "react";
import { cn } from "../utils/cn";

// CTAProps defines the content details for this block.
// "headline" is the big title, and "description" is the supporting subtext.
export interface CTAProps extends React.HTMLAttributes<HTMLDivElement> {
  headline: string;
  description?: string;
}

// CTA renders a centered text layout with action items.
// Inputs: "headline", "description", "children" (nested action buttons), "className" (custom styles).
// Outputs: Renders a structured <div> block centered on the page.
export const CTA: React.FC<CTAProps> = ({
  className,
  headline,
  description,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "py-16 md:py-24 border-t border-[#E8E8E8] flex flex-col items-center text-center max-w-3xl mx-auto px-4",
        className
      )}
      {...props}
    >
      {/* Big bold headline */}
      <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight text-[#111111] mb-4">
        {headline}
      </h2>
      
      {/* If description subtext exists, render a paragraph under the headline */}
      {description && (
        <p className="font-sans text-[#5F5F5F] max-w-xl text-base md:text-lg mb-8 leading-relaxed">
          {description}
        </p>
      )}
      
      {/* If any buttons or child links are nested, render them in a centered flex layout */}
      {children && <div className="flex flex-wrap justify-center gap-4">{children}</div>}
    </div>
  );
};
