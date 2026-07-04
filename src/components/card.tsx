// This file defines the Card component. Cards are clean rectangular boxes used to group related content, like list details, pricing features, or customer testimonials.
import * as React from "react";
import { cn } from "../utils/cn";

// CardProps defines options for styling this card component.
// "hoverEffect" decides if the card should slightly lift and darken its border when the visitor's cursor hovers over it.
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

// Card is a styled container element.
// Inputs: "hoverEffect" (default false), "children" (nested content/HTML inside the box), and usual HTML attributes.
// Outputs: Renders a styled <div> container.
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-transparent border border-[#E8E8E8] rounded-sm p-6 transition-all duration-300 ease-out",
          // If hoverEffect is true, enable hover transitions (slight scale up and color changes).
          hoverEffect && "hover:border-[#111111] hover:bg-[#111111]/[0.01] hover:scale-[1.015] hover:-translate-y-px",
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
