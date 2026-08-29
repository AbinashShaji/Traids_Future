/**
 * FILE: src/components/faq-item.tsx
 *
 * WHAT THIS DOES:
 * Renders a single expandable question-and-answer row (an accordion item).
 *
 * WHERE IT IS USED:
 * - Rendered in the FAQ list on the About page (`src/app/about/about-page-content.tsx`).
 * - Rendered in the FAQ list on the Contact page (`src/app/contact/contact-page-content.tsx`).
 *
 * HOW IT WORKS:
 * 1. Shows a button with the question text and a chevron arrow.
 * 2. When clicked, it calls `onToggle()` to open or close the answer.
 * 3. Uses pure CSS grid transition (`grid-rows-[1fr]` vs `grid-rows-[0fr]`) for silky-smooth animation!
 * 4. Includes `aria-expanded` so screen readers announce whether the answer is open or closed.
 *
 * BEGINNER TIP:
 * If you want to change how questions look when opened, this is the file to edit!
 */
"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";
import { type FAQ } from "@prisma/client";

export interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  faq,
  isOpen,
  onToggle,
  className,
}) => {
  return (
    <div
      className={cn(
        "border border-hairline rounded-[2px] bg-paper overflow-hidden transition-all duration-300",
        className
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left font-sans font-semibold text-ink hover:bg-bone/40 transition-colors"
      >
        <span className="text-sm md:text-base leading-snug">{faq.question}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-graphite transition-transform duration-300 shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen
            ? "grid-rows-[1fr] opacity-100 border-t border-hairline"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-6 font-editorial text-base text-graphite leading-relaxed bg-bone/30">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

FAQItem.displayName = "FAQItem";
