/**
 * FILE: src/components/faq-item.tsx
 *
 * Single expandable FAQ row with clean line-border architecture.
 * Clean, minimal, zero card boxes.
 */
"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";
import { type FAQ } from "@/mock/faq";

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
        "border-b border-[#e4e4e7] bg-transparent transition-all duration-300",
        className
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full py-5 flex items-center justify-between gap-4 text-left font-sans font-semibold transition-colors focus:outline-none"
      >
        <span className={cn("text-base md:text-lg leading-snug transition-colors", isOpen ? "text-[#e11d48]" : "text-[#0a0a0a] hover:text-[#e11d48]")}>
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 transition-transform duration-300 shrink-0",
            isOpen ? "rotate-180 text-[#e11d48]" : "text-[#71717a]"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-6 font-sans text-sm sm:text-base text-[#71717a] leading-relaxed">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

FAQItem.displayName = "FAQItem";
