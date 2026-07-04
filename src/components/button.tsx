// This file defines the custom Button component. Buttons allow visitors to take actions like submitting forms, opening pages, or starting booking flows.
import * as React from "react";
import { cn } from "../utils/cn";

// ButtonProps defines all customization options for the button.
// "variant" dictates the style (solid dark, outlined, or plain text with hover effect).
// "size" changes padding and font sizes (small, medium, or large).
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
}

// Button is a reusable HTML button styled according to our branding system.
// Inputs: "variant" (default "primary"), "size" (default "md"), "children" (text/icons inside), and typical button props.
// Outputs: Renders a styled <button> element.
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    // Base styles applied to all buttons regardless of their variant or size.
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-medium rounded-sm transition duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] disabled:pointer-events-none disabled:opacity-50";

    // Styling themes corresponding to "primary", "outline", and "text" variants.
    const variantStyles = {
      primary: "bg-[#111111] text-[#FAF9F6] hover:bg-[#222222] hover:-translate-y-px active:translate-y-0",
      outline: "border border-[#111111] text-[#111111] bg-transparent hover:bg-[#111111]/5 hover:-translate-y-px active:translate-y-0",
      text: "relative bg-transparent text-[#111111] p-0 rounded-none after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-[#111111] after:transition-transform after:duration-300 hover:after:scale-x-100",
    };

    // Padding and font-size multipliers for "sm", "md", and "lg" sizes.
    // Ternaries ensure that text buttons don't have block padding.
    const sizeStyles = {
      sm: variant === "text" ? "text-sm py-0.5" : "text-sm px-4 py-2",
      md: variant === "text" ? "text-base py-1" : "text-base px-6 py-3",
      lg: variant === "text" ? "text-lg py-1" : "text-lg px-8 py-4",
    };

    // Render the final styled button element.
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
