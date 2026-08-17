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
 * 1. Has a crisp architectural border (`border-[#DEDDD3]`) and subtle 2px rounded corners (`rounded-[2px]`).
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
  ({ className, hoverEffect = false, variant = "paper", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "card border border-[#DEDDD3] rounded-[2px] p-6 md:p-8 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
          variant === "paper" ? "bg-[#F0F0EB] shadow-[0_4px_20px_rgba(0,0,0,0.02)]" : "bg-[#E4E3DB]",
          hoverEffect && "hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] hover:border-[#14140F]/30 cursor-pointer",
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
