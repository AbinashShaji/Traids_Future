/**
 * FILE: src/components/brand-mark.tsx
 *
 * Renders the Triads Future company logo.
 * Features:
 * - Full logo state at the top: standalone triangle + divider + TRIADS FUTURE wordmark (including final "E" on mobile)
 * - Scroll-responsive compact state: wordmark collapses smoothly, standalone triangle traces into place
 * - Zero residual divider or artifacts in compact state
 * - Premium crimson (#e11d48) hover & focus transitions
 * - Full accessibility and prefers-reduced-motion support
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "../utils/cn";
import {
  BRAND_MARK_PATH,
  BRAND_WORDMARK_PATH,
  TRIANGLE_STROKE_TRACE_PATH,
} from "./brand-assets";

interface BrandMarkProps {
  className?: string;
  imageClassName?: string;
  ariaLabel?: string;
  asLink?: boolean;
  inverted?: boolean;
  variant?: "auto" | "full" | "mark";
  compact?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  className,
  imageClassName,
  ariaLabel = "Triads Future home",
  asLink = false,
  inverted = false,
  variant = "auto",
  compact = false,
}) => {
  const showMarkOnly = variant === "mark";

  // Base and hover/focus text colors driving fill="currentColor" & stroke="currentColor"
  const colorClasses = inverted
    ? "text-white group-hover:text-[#e11d48] hover:text-[#e11d48] group-focus-visible:text-[#e11d48] focus-visible:text-[#e11d48]"
    : "text-[#191917] group-hover:text-[#e11d48] hover:text-[#e11d48] group-focus-visible:text-[#e11d48] focus-visible:text-[#e11d48]";

  const transitionClasses = "transition-colors duration-300 ease-in-out motion-reduce:transition-none";

  // Standalone triangle mark element (used in both standalone mode and as the anchored symbol)
  const triangleElement = (
    <div className="relative w-[34px] sm:w-[38px] aspect-[281/242] shrink-0 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 281 242"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
        className={cn(
          "w-full h-full fill-current pointer-events-none select-none",
          transitionClasses,
          colorClasses,
          imageClassName
        )}
      >
        {/* Base Solid Triangle Artwork */}
        <path
          fill="currentColor"
          d={BRAND_MARK_PATH}
        />

        {/* Geometric Stroke-Draw Trace Overlay (Animates along perimeter on scroll transition - no vertical divider) */}
        <path
          d={TRIANGLE_STROKE_TRACE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 725,
            strokeDashoffset: compact ? 0 : 725,
            opacity: compact ? 0.85 : 0,
            transition:
              "stroke-dashoffset 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 350ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className="motion-reduce:transition-none"
        />
      </svg>
    </div>
  );

  const content = showMarkOnly ? (
    triangleElement
  ) : (
    <div
      className={cn(
        "relative flex items-center overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        compact
          ? "w-[34px] sm:w-[38px]"
          : "w-[185px] sm:w-[195px] md:w-[200px] lg:w-[205px]"
      )}
    >
      {/* 1. Anchored Triangle Symbol (Never jumps, shifts, or rotates) */}
      {triangleElement}

      {/* 2. Collapsible Wordmark (divider line + TRIADS FUTURE wordmark - completely hidden in compact state) */}
      <div
        className={cn(
          "shrink-0 flex items-center h-[34px] sm:h-[38px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          compact
            ? "max-w-0 opacity-0 pointer-events-none invisible ml-0"
            : "max-w-[155px] sm:max-w-[170px] opacity-100 translate-x-0 ml-2.5 sm:ml-3 visible"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="736 497 2026 530"
          preserveAspectRatio="xMinYMid meet"
          aria-hidden="true"
          focusable="false"
          className={cn(
            "h-full w-auto fill-current pointer-events-none select-none",
            transitionClasses,
            colorClasses,
            imageClassName
          )}
          style={{ aspectRatio: "2026 / 530" }}
        >
          <path fill="currentColor" d={BRAND_WORDMARK_PATH} />
        </svg>
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        aria-label={ariaLabel}
        className={cn(
          "group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e11d48] rounded-md transition-colors motion-reduce:transition-none",
          className
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={cn("group inline-flex items-center", className)}>
      {content}
    </div>
  );
};
