/**
 * FILE: src/components/form-textarea.tsx
 *
 * WHAT THIS DOES:
 * A multi-line text input field (for messages, project briefs, and long text).
 *
 * WHERE IT IS USED:
 * - Consultation booking form on the Contact page (`src/app/contact/contact-page-content.tsx`).
 *
 * HOW IT WORKS:
 * 1. Automatically links the `<label>` to the `<textarea>` using `useId()`.
 * 2. Allows vertical resizing (`resize-y`) so visitors can expand the box if needed.
 * 3. Shows red borders and error messages when validation fails.
 * 4. Integrates with React Hook Form via `React.forwardRef`.
 *
 * BEGINNER TIP:
 * Use `<FormTextarea>` when you expect the user to write more than a single sentence!
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** The field label shown above the textarea (e.g. "Project Details") */
  label: string;
  /** Error message text displayed in red if validation fails */
  error?: string;
  /** Optional helpful hint text shown below the textarea */
  helperText?: string;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, error, helperText, id, rows = 4, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    return (
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor={textareaId}
          className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-graphite"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            "w-full px-4 py-3.5 bg-paper border rounded-[2px] font-sans text-sm text-ink placeholder:text-graphite/60 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus:border-ink focus:ring-1 focus:ring-[#14140F] resize-y",
            error
              ? "border-[#B3261E] focus:border-[#B3261E] focus:ring-[#B3261E]"
              : "border-hairline",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {helperText && !error && (
          <span id={`${textareaId}-helper`} className="font-sans text-xs text-graphite">
            {helperText}
          </span>
        )}
        {error && (
          <span id={`${textareaId}-error`} className="font-sans text-xs font-medium text-[#B3261E]">
            {error}
          </span>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
