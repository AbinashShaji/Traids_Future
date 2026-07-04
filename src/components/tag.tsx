// This file defines the interactive Tag component. Tags are clickable, pill-shaped buttons typically used to filter lists (like selecting blog categories).
import * as React from "react";
import { cn } from "../utils/cn";

// TagProps defines customization options for the Tag.
// "active" indicates if this tag is currently selected by the visitor.
export interface TagProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

// Tag displays a clickable category label.
// Inputs: "active" (default false), "children" (the text category name), and usual button attributes.
// Outputs: Renders a styled interactive <button> element.
export const Tag = React.forwardRef<HTMLButtonElement, TagProps>(
  ({ className, active = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-sans font-medium border transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#111111]",
          // If the tag is active, style it with a dark background and white text. Otherwise, show a light border with gray text that turns dark on hover.
          active
            ? "border-[#111111] bg-[#111111] text-[#FAF9F6]"
            : "border-[#E8E8E8] bg-transparent text-[#5F5F5F] hover:border-[#111111] hover:text-[#111111]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Tag.displayName = "Tag";
