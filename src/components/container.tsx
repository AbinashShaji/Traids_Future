// This file contains the Container component. It is a layout guide that centers page content and sets maximum widths so the text doesn't stretch too wide on huge computer monitors.
import * as React from "react";
import { cn } from "../utils/cn";

// ContainerProps defines options for the container.
// "clean" makes the container stretch full-width without padding margins.
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  clean?: boolean;
}

// Container centers page layout columns on screen.
// Inputs: "clean" (defaults to false), "children" (nested content to center), and standard div attributes.
// Outputs: Renders a styled centering <div> tag.
export const Container: React.FC<ContainerProps> = ({
  className,
  clean = false,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        // If clean is true, take up the entire width. Otherwise, restrict maximum width to 1400px, center it, and add side paddings.
        clean ? "w-full" : "max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
