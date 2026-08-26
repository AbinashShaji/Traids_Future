/**
 * FILE: src/components/divider.tsx
 *
 * WHAT THIS DOES:
 * Renders a subtle 1px horizontal separation line (a hairline border).
 *
 * WHERE IT IS USED:
 * - Separates sections in the Footer, legal pages, and long-form articles.
 *
 * HOW IT WORKS:
 * 1. Default: Draws a clean 1px line with the hairline token color (`bg-hairline`).
 * 2. `withTriadMark={true}`: Breaks the line in the center and places the 3-bar triad mark in the middle!
 *
 * BEGINNER TIP:
 * Use `<Divider />` instead of a raw `<hr />` to ensure separation lines match the design system!
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  withTriadMark?: boolean;
}

export const Divider: React.FC<DividerProps> = ({
  className,
  withTriadMark = false,
  ...props
}) => {
  if (withTriadMark) {
    return (
      <div className={cn("w-full flex items-center justify-center my-8 gap-3", className)}>
        <div className="flex-1 h-[1px] bg-hairline" />
        <span className="triad-mark inline-flex items-center gap-1 opacity-70">
          <span className="w-2 h-[2px] bg-ink opacity-35" />
          <span className="w-2 h-[2px] bg-ink opacity-65" />
          <span className="w-2 h-[2px] bg-ink opacity-100" />
        </span>
        <div className="flex-1 h-[1px] bg-hairline" />
      </div>
    );
  }

  return (
    <hr
      className={cn("w-full border-0 h-[1px] bg-hairline", className)}
      {...props}
    />
  );
};

Divider.displayName = "Divider";
