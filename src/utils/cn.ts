// This file contains a helper tool (called "cn") that lets us mix and merge style classes together without causing conflicts.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// cn combines styling classes cleanly. It takes multiple class strings, resolves duplicates, and outputs a single finalized string of styling classes.
// Inputs: "inputs" (various class names we want to combine).
// Outputs: A single clean string of style classes.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
