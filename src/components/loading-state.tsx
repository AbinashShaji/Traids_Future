// This file defines the LoadingState component. It generates structured skeleton placeholder shapes depending on what page part is loading (a card, a whole page, or a section).
import * as React from "react";
import { Skeleton } from "./skeleton";
import { cn } from "../utils/cn";

// LoadingStateProps determines what layout mockup shape to output.
export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "section" | "card" | "page";
}

// LoadingState displays temporary wireframes matching card, section, or page boundaries.
// Inputs: "variant" (default "section"), "className", and standard HTML attributes.
// Outputs: Renders a mockup grid of pulsing skeleton rectangles.
export const LoadingState: React.FC<LoadingStateProps> = ({
  className,
  variant = "section",
  ...props
}) => {
  // If we are loading a Card, draw a card frame outlining title, subtitle, paragraph, and button wireframes.
  if (variant === "card") {
    return (
      <div className={cn("border border-[#E8E8E8] rounded-sm p-6 flex flex-col gap-4", className)} {...props}>
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-1/2 mt-2" />
      </div>
    );
  }

  // If we are loading a full Page, draw a banner area and a large content container skeleton blocks.
  if (variant === "page") {
    return (
      <div className={cn("min-h-[60vh] flex flex-col gap-12 py-12 px-6 max-w-4xl mx-auto", className)} {...props}>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <div className="flex flex-col gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    );
  }

  // Default fallback layout representing a text block section with heading and text description lines.
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)} {...props}>
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
};
