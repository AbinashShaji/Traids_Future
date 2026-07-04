// This file defines the FormTextArea component. It is a multi-line input box (like for writing a custom message or project description) that has a floating label and red error states.
import * as React from "react";
import { cn } from "../utils/cn";

// FormTextAreaProps defines options for the textarea.
// "label" sets the text above the field.
// "error" displays validation warning messages if something is wrong.
export interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

// FormTextArea renders a multi-line textarea input element.
// Inputs: "label", "error", "id", "rows" (default 4 lines tall), "className", and textarea props.
// Outputs: Renders a wrapping <div> containing the label, textarea element, and optional error red subtext.
export const FormTextArea = React.forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ className, label, error, id, rows = 4, ...props }, ref) => {
    // Generate a unique ID to link the label and textarea for screen readers.
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    return (
      <div className="flex flex-col gap-2 w-full">
        {/* Label title tag */}
        <label
          htmlFor={textareaId}
          className="font-sans text-sm font-medium text-[#111111]"
        >
          {label}
        </label>
        
        {/* Text area input field */}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            "w-full px-4 py-3 bg-transparent border rounded-sm font-sans text-[#111111] transition-all duration-200 outline-none resize-y",
            // Style border with red outline if validation error is present. Otherwise, use normal gray border.
            error 
              ? "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-1 focus:ring-[var(--color-error)]" 
              : "border-[#E8E8E8] focus:border-[#111111] focus:ring-1 focus:ring-[#111111]",
            className
          )}
          {...props}
        />
        
        {/* If an error message is set, display it in red text under the box */}
        {error && (
          <span className="font-sans text-xs text-[var(--color-error)] mt-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

FormTextArea.displayName = "FormTextArea";
