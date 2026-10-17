/**
 * FILE: src/components/button.tsx
 *
 * Universal button primitive strictly following FinZave design specifications:
 * - primary: Solid Obsidian black pill (hover Crimson Red #e11d48, lift -2px, shadow)
 * - secondary: Solid white pill with 1px zinc border
 * - outline: Transparent pill with 1px zinc border
 * - text: Ghost link with .fz-underline-hover sliding underline
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text" | "cobalt";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-medium tracking-[0.01em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer active:translate-y-0";

    const variantStyles = {
      primary:
        "rounded-full bg-[#0a0a0a] text-white border border-[#0a0a0a] hover:bg-[#e11d48] hover:border-[#e11d48] hover:-translate-y-0.5 shadow-xl shadow-black/5 active:scale-[0.98]",
      secondary:
        "rounded-full bg-white text-[#0a0a0a] border border-[#e4e4e7] hover:bg-[#f4f4f5] hover:border-[#d4d4d8] hover:-translate-y-0.5 shadow-sm",
      outline:
        "rounded-full bg-transparent text-[#0a0a0a] border border-[#e4e4e7] hover:bg-[#f4f4f5] hover:border-[#d4d4d8] hover:-translate-y-0.5",
      text:
        "rounded-none bg-transparent text-[#0a0a0a] border-none p-0 relative after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0a0a0a] hover:text-[#e11d48] hover:after:bg-[#e11d48] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-all after:duration-300",
      cobalt:
        "rounded-full bg-[#0a0a0a] text-white border border-[#0a0a0a] hover:bg-[#e11d48] hover:border-[#e11d48] hover:-translate-y-0.5 shadow-xl shadow-black/5 active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: variant === "text" ? "text-xs py-0.5" : "text-xs px-5 py-2.5",
      md: variant === "text" ? "text-sm py-1" : "text-sm px-7 py-3.5",
      lg: variant === "text" ? "text-base py-1" : "text-base px-9 py-4 font-semibold",
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
