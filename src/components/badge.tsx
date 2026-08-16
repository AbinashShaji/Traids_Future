// Badge component styled with 2px radius and monochrome palette.
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
    outline: "border border-[#DEDDD3] text-[#57564C] bg-[#F0F0EB]",
    filled: "border border-transparent text-[#14140F] bg-[#E4E3DB]",
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
