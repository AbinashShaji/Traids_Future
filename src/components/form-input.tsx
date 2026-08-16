// FormInput component styled with 2px radius, hairline borders, and signal error states.
import * as React from "react";
import { cn } from "../utils/cn";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor={inputId}
          className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-[#57564C]"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3.5 bg-[#F0F0EB] border rounded-[2px] font-sans text-sm text-[#14140F] placeholder:text-[#57564C]/60 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus:border-[#14140F] focus:ring-1 focus:ring-[#14140F]",
            error
              ? "border-[#B3261E] focus:border-[#B3261E] focus:ring-[#B3261E]"
              : "border-[#DEDDD3]",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {helperText && !error && (
          <span id={`${inputId}-helper`} className="font-sans text-xs text-[#57564C]">
            {helperText}
          </span>
        )}
        {error && (
          <span id={`${inputId}-error`} className="font-sans text-xs font-medium text-[#B3261E]">
            {error}
          </span>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
