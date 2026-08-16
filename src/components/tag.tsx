// Tag component for filtering and chips.
import * as React from "react";
import { cn } from "../utils/cn";

export interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Tag = React.forwardRef<HTMLButtonElement, TagProps>(
  ({ className, active = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center px-3.5 py-1.5 rounded-[2px] text-xs font-sans font-medium transition-colors duration-200 cursor-pointer border",
          active
            ? "border-[#14140F] bg-[#14140F] text-[#F0F0EB]"
            : "border-[#DEDDD3] bg-[#F0F0EB] text-[#57564C] hover:border-[#14140F] hover:text-[#14140F]",
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
