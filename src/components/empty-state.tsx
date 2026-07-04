// This file contains the EmptyState component. It is shown when there is no content to display on a page (like when a search returns zero results), providing a title, explanation, and action button.
import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "./button";

// EmptyStateProps defines configuration fields for the EmptyState component.
// "title" is the main message, "description" is the explanation, "actionLabel" is the button text, and "onAction" is the click event function.
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

// EmptyState displays a friendly placeholder when content lists are empty.
// Inputs: "title", "description", "actionLabel", "onAction", "className" (custom styles).
// Outputs: Renders a centered box with a dashed border, explanatory text, and an optional button.
export const EmptyState: React.FC<EmptyStateProps> = ({
  className,
  title,
  description,
  actionLabel,
  onAction,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 md:p-12 border border-dashed border-[#E8E8E8] rounded-sm bg-transparent max-w-md mx-auto",
        className
      )}
      {...props}
    >
      {/* Main warning/status heading */}
      <h3 className="font-heading text-lg font-semibold text-[#111111] mb-2">
        {title}
      </h3>
      
      {/* Supporting details text */}
      <p className="font-sans text-sm text-[#5F5F5F] leading-relaxed mb-6">
        {description}
      </p>
      
      {/* If both an action label and button handler are provided, show an outline button */}
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
