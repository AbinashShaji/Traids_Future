/**
 * FILE: src/components/tag.tsx
 *
 * WHAT THIS DOES:
 * Clickable category filter chip button.
 *
 * WHERE IT IS USED:
 * - Category filter bar at the top of the Insights directory (`src/app/insights/page.tsx`).
 *
 * HOW IT WORKS:
 * 1. Renders a clickable button for selecting topics (e.g. "All", "Business Strategy", "Technology").
 * 2. When `active={true}`: Inverts to solid dark background (`bg-ink text-paper`).
 * 3. When inactive: Renders light background with hover border darkening.
 *
 * BEGINNER TIP:
 * Use `<Tag>` when creating clickable filter pills!
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Indicates if this category tag is currently selected by the user */
  active?: boolean;
}

export const Tag = React.forwardRef<HTMLButtonElement, TagProps>(
  ({ className, active = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-sans font-medium tracking-wide transition-all duration-300 cursor-pointer border select-none",
          active
            ? "border-[#0a0a0a] bg-[#0a0a0a] text-white shadow-sm"
            : "border-[#e4e4e7] bg-white text-[#71717a] hover:border-[#0a0a0a] hover:text-[#0a0a0a]",
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
