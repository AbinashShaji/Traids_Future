/**
 * FILE: src/components/brand-mark.tsx
 *
 * Renders the Triads Future company logo.
 * Supports rendering as a plain <div> (for when wrapped by a parent <Link>)
 * or as a self-contained <Link href="/"> to prevent invalid nested interactive elements.
 */
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../utils/cn";

interface BrandMarkProps {
  className?: string;
  imageClassName?: string;
  ariaLabel?: string;
  asLink?: boolean;
  inverted?: boolean;
  variant?: "auto" | "full" | "mark";
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  className,
  imageClassName,
  ariaLabel = "Triads Future home",
  asLink = false,
  inverted = false,
  variant = "auto",
}) => {
  const showMarkOnly = variant === "mark";
  const filterClass = inverted ? "brightness-0 invert" : "";

  const content = showMarkOnly ? (
    <div className="relative w-8 h-8 sm:w-9 sm:h-9 max-h-[38px] max-w-[38px] aspect-square flex items-center justify-center group">
      <Image
        src="/brand/triad_future_triangle_logo.png"
        alt="Triads Future logo mark"
        fill
        priority
        sizes="36px"
        className={cn(
          "object-contain object-center transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(225,29,72,0.65)] group-hover:scale-105",
          filterClass,
          imageClassName
        )}
      />
    </div>
  ) : (
    <div className="relative w-full aspect-[5/1] max-h-[40px] flex items-center group">
      <Image
        src="/brand/triads_future_header_logo.webp"
        alt="Triads Future logo"
        fill
        priority
        sizes="(max-width: 768px) 180px, 220px"
        className={cn(
          "object-cover object-center transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(225,29,72,0.65)]",
          filterClass,
          imageClassName
        )}
      />
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" aria-label={ariaLabel} className={cn("inline-flex items-center", className)}>
        {content}
      </Link>
    );
  }

  return (
    <div className={cn("inline-flex items-center", className)}>
      {content}
    </div>
  );
};
