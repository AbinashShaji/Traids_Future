// This file contains the Badge component. A badge is a small tag (like a sticker or label) used to display tags, status categories, or category labels on our pages.
import * as React from "react";
import { cn } from "../utils/cn";

// BadgeProps defines what custom settings (props) we can pass to this component.
// "variant" specifies if the label is filled in dark or outline-only.
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "outline" | "filled";
}

// The Badge component renders a small styled text block.
// Inputs: "variant" (defaults to "outline"), "className" (custom styles), "children" (the text content to show inside the badge).
// Outputs: Renders a styled <span> text tag.
export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "outline",
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-sans font-medium transition-colors",
        // If variant is "outline", show a border with gray text. Otherwise, show a solid dark background with light text.
        variant === "outline" 
          ? "border border-[#E8E8E8] text-[#5F5F5F] bg-transparent" 
          : "bg-[#111111] text-[#FAF9F6]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
