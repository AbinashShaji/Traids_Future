/**
 * FILE: src/components/card.tsx
 *
 * WHAT THIS DOES:
 * Standard container box used for services, case studies, insights, and testimonials.
 *
 * WHERE IT IS USED:
 * - Selected work and testimonials on the Homepage.
 * - Solution service cards on /solutions.
 * - Article cards on /insights.
 *
 * HOW IT WORKS:
 * 1. Has a crisp architectural border (`border-hairline`) and subtle 2px rounded corners (`rounded-[2px]`).
 * 2. `variant="paper"` (default): Uses the off-white `#F0F0EB` paper background.
 * 3. `variant="bone"`: Uses the slightly darker `#E4E3DB` bone background for visual contrast.
 * 4. `hoverEffect={true}`: Lifts the card up 4px (`hover:-translate-y-1`) with a soft shadow bloom when hovered.
 *
 * BEGINNER TIP:
 * If you want a card to react when the user hovers their mouse over it, pass `hoverEffect={true}`!
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Enables a gentle 4px lift and shadow bloom when hovered */
  hoverEffect?: boolean;
  /** Background tone: "paper" (#F0F0EB) or "bone" (#E4E3DB) */
  variant?: "paper" | "bone";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "card relative overflow-hidden rounded-[2px] p-6 md:p-8",
          // Premium Base
          "bg-gradient-to-br from-paper to-bone/40",
          "border border-hairline shadow-[0_8px_30px_rgba(0,0,0,0.03)]",
          "ring-1 ring-inset ring-ink/10",
          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          // Hover State
          hoverEffect && [
            "cursor-pointer group",
            "hover:-translate-y-1",
            "hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]",
            "hover:border-ink/15 hover:ring-ink/20",
            "hover:from-paper hover:to-bone/60"
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
