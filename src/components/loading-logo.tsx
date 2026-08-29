/**
 * FILE: src/components/loading-logo.tsx
 *
 * WHAT THIS DOES:
 * Renders a full-screen or container-bound glowing, pulsing triangular brand mark.
 * Used primarily as a loading state placeholder while heavy assets or images load.
 *
 * HOW IT WORKS:
 * Uses Tailwind's `animate-pulse` alongside deep shadows and opacity controls
 * to create a breathing "glow" effect that adapts to light/dark modes.
 */

"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "../utils/cn";

export const LoadingLogo: React.FC<{ className?: string; containerClassName?: string; size?: number }> = ({ className, containerClassName, size }) => {
  return (
    <div className={cn("flex items-center justify-center w-full h-full absolute inset-0 z-0", containerClassName)}>
      <div 
        className={cn("relative animate-pulse opacity-30 dark:opacity-20", className)}
        style={size ? { width: size, height: size } : undefined}
      >
        <Image
          src="/brand/traid_future_triangle_logo.png"
          alt="Loading..."
          fill
          className="object-contain logo-adaptive drop-shadow-[0_0_12px_rgba(20,20,15,0.15)] dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] transition-all duration-1000 ease-in-out"
        />
      </div>
    </div>
  );
};
