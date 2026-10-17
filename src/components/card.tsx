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
          "card relative overflow-hidden rounded-3xl p-6 md:p-8",
          // FinZave Architectural Base
          "bg-white",
          "border border-[#e4e4e7] shadow-sm",
          "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          // Hover State
          hoverEffect && [
            "cursor-pointer group",
            "hover:-translate-y-1",
            "hover:border-[#0a0a0a] hover:shadow-md",
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
