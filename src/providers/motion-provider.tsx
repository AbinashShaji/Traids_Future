// This file provides settings for animations. It is currently a placeholder wrapper (a "no-op") that passes its contents along directly without modifications.
import * as React from "react";

// MotionProvider acts as a wrapper that groups animated components together.
// Inputs: "children" (nested tags inside this provider).
// Outputs: Directly renders the children inside a React fragment without adding extra HTML tags or animations.
export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};