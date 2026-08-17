/**
 * FILE: src/utils/cn.ts
 *
 * WHAT THIS DOES:
 * A small utility function named `cn` (short for "class names") that combines
 * multiple Tailwind CSS class strings together without conflicting with each other.
 *
 * WHERE IT IS USED:
 * - Used across almost every component in `src/components/` and `src/app/`.
 *
 * HOW IT WORKS:
 * 1. `clsx`: Allows you to conditionally add classes (e.g. `isActive && "font-bold"`).
 * 2. `tailwind-merge` (`twMerge`): Resolves Tailwind CSS conflicts (e.g. if you pass `px-4`
 *    and someone overrides it with `px-8`, `twMerge` ensures `px-8` wins instead of conflicting).
 *
 * BEGINNER TIP:
 * Whenever you write a component that accepts a `className` prop, wrap your classes
 * with `cn("default-classes", className)`!
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
