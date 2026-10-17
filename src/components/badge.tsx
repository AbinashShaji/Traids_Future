/**
 * FILE: src/components/badge.tsx
 *
 * Compact uppercase pill badge following FinZave design specifications:
 * - outline: White background with 1px zinc border
 * - filled: Zinc-100 background with dark text
 * - red / cobalt: 10% red fill with 25% red border and red text
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "outline" | "filled" | "red" | "cobalt";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "outline",
  children,
  ...props
}) => {
  const variantStyles = {
    outline: "border border-[#e4e4e7] text-[#71717a] bg-white",
    filled: "border border-transparent text-[#0a0a0a] bg-[#f4f4f5]",
    red: "border border-[#e11d48]/25 text-[#e11d48] bg-[#e11d48]/10 font-semibold",
    cobalt: "border border-[#e11d48]/25 text-[#e11d48] bg-[#e11d48]/10 font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-sans font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.displayName = "Badge";
