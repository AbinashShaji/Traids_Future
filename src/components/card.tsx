// Card component implementing Design System v2 2px corner radius, hairline borders, and 4px hover lift with shadow bloom.
import * as React from "react";
import { cn } from "../utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
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
