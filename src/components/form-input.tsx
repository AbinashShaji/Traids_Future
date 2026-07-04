// This file defines the FormInput component. It is a single-line text input field (like for entering a name or email address) equipped with a floating label and error validation warnings.
import * as React from "react";
import { cn } from "../utils/cn";

// FormInputProps configures label labels and error alerts.
// "label" is the text shown above the input.
// "error" is an optional validation message (like "Please enter a valid email").
export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

// FormInput displays a styled text input box.
// Inputs: "label", "error", "id", "className", and standard input attributes.
// Outputs: Renders a wrapping <div> containing the label, input field, and optional error subtext.
export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    // Generate a unique ID if none is supplied to link the label and input for screen readers.
    const generatedId = React.useId();
    const inputId = id || generatedId;
    
    return (
      <div className="flex flex-col gap-2 w-full">
        {/* Label description line */}
        <label
          htmlFor={inputId}
          className="font-sans text-sm font-medium text-[#111111]"
        >
          {label}
        </label>
        
        {/* Interactive input box */}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 bg-transparent border rounded-sm font-sans text-[#111111] transition-all duration-200 outline-none",
            // If there is a validation error, style the borders red. Otherwise, use standard light borders.
            error 
              ? "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-1 focus:ring-[var(--color-error)]" 
              : "border-[#E8E8E8] focus:border-[#111111] focus:ring-1 focus:ring-[#111111]",
            className
          )}
          {...props}
        />
        
        {/* If a validation error message is present, show it as red subtext */}
        {error && (
          <span className="font-sans text-xs text-[var(--color-error)] mt-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
