/**
 * FILE: src/components/skeleton.tsx
 *
 * WHAT THIS DOES:
 * Renders a pulsing gray placeholder box while dynamic page content is loading.
 *
 * WHERE IT IS USED:
 * - Used as the Suspense loading fallback on `/contact/page.tsx`.
 *
 * HOW IT WORKS:
 * Uses Tailwind's `animate-pulse` and the hairline background token (`bg-[#DEDDD3]/60`)
 * to show a gentle breathing animation until the real JavaScript components load.
 *
 * BEGINNER TIP:
 * Skeletons improve user experience because users see page structure immediately rather than a blank white screen!
 */

import * as React from "react";
import { cn } from "../utils/cn";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-[2px] bg-[#DEDDD3]/60 w-full", className)}
      {...props}
    />
  );
};

Skeleton.displayName = "Skeleton";
