// This file contains the Skeleton component. It draws a pulsing placeholder block that acts as a placeholder while the real website content (like images or text) is loading from the network.
import * as React from "react";
import { cn } from "../utils/cn";

// SkeletonProps defines customization options for the placeholder block.
export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

// Skeleton component renders a pulsing box.
// Inputs: "className" (custom styles to adjust box size/shape).
// Outputs: Renders a pulsing <div> element representing a placeholder.
export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-[#E8E8E8]/60 w-full", className)}
      {...props}
    />
  );
};
