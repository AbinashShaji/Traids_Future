/**
 * FILE: src/components/badge.tsx
 *
 * WHAT THIS DOES:
 * Small uppercase pill label used for category tags, project types, and status indicators.
 *
 * WHERE IT IS USED:
 * - Case study cards on /work (e.g. "WEB APPLICATION", "AUTOMATION").
 * - Article cards on /insights (e.g. "BUSINESS STRATEGY").
 *
 * HOW IT WORKS:
 * 1. `variant="outline"` (default): Off-white background with a thin hairline border.
 * 2. `variant="filled"`: Warm bone background (`#E4E3DB`) with darker text.
 * 3. Formats text in tiny, tracked, uppercase letters (`text-[11px] font-semibold uppercase tracking-wider`).
 *
 * BEGINNER TIP:
 * Use `<Badge>` when you need to highlight a category or status in a compact label!
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "outline" | "filled";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "outline",
  children,
  ...props
}) => {
  const variantStyles = {
    outline: "border border-hairline text-graphite bg-paper",
    filled: "border border-transparent text-ink bg-bone",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-[2px] text-[11px] font-sans font-semibold uppercase tracking-wider",
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
