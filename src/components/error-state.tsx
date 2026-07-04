// This file defines the ErrorState component. It is a backup layout shown if a webpage crashes or fails to fetch data, giving the user a readable message and a button to retry.
import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "./button";

// ErrorStateProps configures parameters for handling errors.
// "reset" is an optional function that reloads the failed page content.
export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  error?: Error | string;
  reset?: () => void;
}

// ErrorState renders a friendly message when crashes occur.
// Inputs: "title" (default "Something went wrong"), "error" (details of what failed), "reset" (retry function).
// Outputs: Renders a structured warning box with a retry action button.
export const ErrorState: React.FC<ErrorStateProps> = ({
  className,
  title = "Something went wrong",
  error,
  reset,
  ...props
}) => {
  // Resolve the error object to get a simple text description.
  const errorMessage = 
    typeof error === "string" 
      ? error 
      : error instanceof Error 
        ? error.message 
        : "An unexpected error occurred. Please try again.";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 md:p-12 border border-[#E8E8E8] rounded-sm bg-transparent max-w-md mx-auto my-12",
        className
      )}
      {...props}
    >
      {/* Error message title */}
      <h3 className="font-heading text-lg font-semibold text-[#111111] mb-2">
        {title}
      </h3>
      
      {/* Resolved description of what failed */}
      <p className="font-sans text-sm text-[#5F5F5F] leading-relaxed mb-6">
        {errorMessage}
      </p>
      
      {/* If a reset function is provided, show a "Try Again" button */}
      {reset && (
        <Button variant="outline" size="sm" onClick={reset}>
          Try Again
        </Button>
      )}
    </div>
  );
};
