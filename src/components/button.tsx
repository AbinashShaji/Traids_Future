/**
 * FILE: src/components/button.tsx
 *
 * WHAT THIS DOES:
 * The universal button component used for all interactive buttons and action triggers.
 *
 * WHERE IT IS USED:
 * - "Book Consultation" triggers in the header, hero sections, and CTAs.
 * - Filter buttons on the Insights page.
 * - Form submission button on the Contact page.
 *
 * HOW IT WORKS:
 * Supports 3 distinct visual variants:
 * 1. `primary` (default): Solid ink-black pill button (`bg-ink`) with a subtle lift on hover (`hover:-translate-y-0.5`).
 * 2. `outline`: Transparent pill button with crisp charcoal border (`border-ink`), inverting to solid black on hover.
 * 3. `text`: Clean text link with a signature animated underline that shrinks slightly on hover (`after:scale-x-40`).
 *
 * ⚠️ BEGINNER WARNING:
 * Changing the button styles here will update every button across the entire website!
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style: "primary" (solid black pill), "outline" (bordered pill), or "text" (underlined) */
  variant?: "primary" | "outline" | "text";
  /** Size scale: "sm" (small), "md" (medium, default), or "lg" (large) */
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-semibold tracking-[0.01em] transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14140F] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer";

    const variantStyles = {
      primary:
        "rounded-full bg-ink text-paper border border-transparent hover:-translate-y-0.5 hover:opacity-88 active:translate-y-0 shadow-sm",
      outline:
        "rounded-full bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper hover:-translate-y-0.5 active:translate-y-0",
      text:
        "rounded-none bg-transparent text-ink border-none p-0 relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-ink after:origin-left after:scale-x-100 after:transition-transform after:duration-400 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-40",
    };

    const sizeStyles = {
      sm: variant === "text" ? "text-xs py-0.5" : "text-xs px-5 py-2.5",
      md: variant === "text" ? "text-sm py-1" : "text-sm px-7 py-3.5",
      lg: variant === "text" ? "text-base py-1" : "text-base px-8 py-4",
    };

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
