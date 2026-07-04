// This file defines the Divider component. It renders a subtle separator line (horizontal or vertical) to help separate different sections on a page.
import * as React from "react";
import { cn } from "../utils/cn";

// DividerProps defines customization parameters.
// "vertical" decides if the line goes straight up-and-down rather than left-to-right.
export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  vertical?: boolean;
}

// Divider renders a thin line on the screen.
// Inputs: "vertical" (defaults to false), "className" (custom styles).
// Outputs: Renders a styled <hr> separator line element.
export const Divider: React.FC<DividerProps> = ({ className, vertical = false, ...props }) => {
  return (
    <hr
      className={cn(
        // If vertical is true, make it tall and thin. Otherwise, make it wide and flat.
        vertical 
          ? "h-full w-[1px] bg-[#E8E8E8] border-none" 
          : "w-full h-[1px] bg-[#E8E8E8] border-none",
        className
      )}
      {...props}
    />
  );
};
