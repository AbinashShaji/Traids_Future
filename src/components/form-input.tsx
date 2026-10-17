/**
 * FILE: src/components/form-input.tsx
 *
 * WHAT THIS DOES:
 * A single-line text input field (with label, placeholder, and error message).
 *
 * WHERE IT IS USED:
 * - Consultation booking form on the Contact page (`src/app/contact/contact-page-content.tsx`).
 *
 * HOW IT WORKS:
 * 1. Automatically connects the `<label>` to the `<input>` using React's `useId()` for accessibility.
 * 2. If an `error` string is passed from Zod validation (e.g. "Name must be at least 2 characters"):
 *    - Paints the input border in crimson red (`border-[#B3261E]`).
 *    - Sets `aria-invalid="true"` for screen readers.
 *    - Renders the red error message beneath the input (`aria-describedby`).
 * 3. Uses `React.forwardRef` so React Hook Form can register and watch its value.
 *
 * BEGINNER TIP:
 * `aria-describedby` links the input to its error message so blind or low-vision users
 * using screen readers know exactly what needs to be fixed!
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The field label shown above the input (e.g. "Full Name") */
  label: string;
  /** Error message text displayed in red if validation fails */
  error?: string;
  /** Optional helpful hint text shown below the input */
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
          className="font-sans text-xs font-semibold uppercase tracking-widest text-[#71717a]"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3.5 bg-white border rounded-xl font-sans text-base md:text-sm text-[#0a0a0a] placeholder:text-[#a1a1aa] transition-all duration-200 focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]",
            error
              ? "border-[#e11d48] focus:border-[#e11d48] focus:ring-[#e11d48]"
              : "border-[#e4e4e7]",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {helperText && !error && (
          <span id={`${inputId}-helper`} className="font-sans text-xs text-graphite">
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
