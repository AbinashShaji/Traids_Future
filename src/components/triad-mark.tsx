/**
 * FILE: src/components/triad-mark.tsx
 *
 * WHAT THIS DOES:
 * Renders Triads Future's signature visual motif: 3 ascending horizontal bars (35%, 65%, 100% opacity)
 * and the 3-step Triad panel (Strategy -> Technology -> Execution).
 *
 * WHERE IT IS USED:
 * - Next to section headings and eyebrows across the site (`<TriadMark />`).
 * - In the About and Homepage philosophy cards (`<TriadPanel />`).
 *
 * HOW IT WORKS:
 * 1. `<TriadMark>` draws 3 small horizontal rectangles side-by-side with ascending darkness (35%, 65%, 100%).
 * 2. Has `aria-hidden="true"` so screen readers ignore it as a decorative icon rather than reading it out loud.
 * 3. `<TriadPanel>` renders the full 3-step commercial metaphor on a warm bone background card.
 *
 * BEGINNER TIP:
 * The 3 bars symbolize the "Triad" philosophy: Strategy + Technology + Execution!
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface TriadMarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
}

export const TriadMark: React.FC<TriadMarkProps> = ({
  className,
  size = "md",
  ...props
}) => {
  const sizeStyles = {
    sm: "gap-1 [&>span]:h-[2px] [&>span]:w-[8px] [&>span]:rounded-[1px]",
    md: "gap-1 [&>span]:h-[3px] [&>span]:w-[10px] [&>span]:rounded-[1px]",
    lg: "gap-1.5 [&>span]:h-[4px] [&>span]:w-[16px] [&>span]:rounded-[1px]",
  };

  return (
    <span
      className={cn("triad-mark inline-flex items-center select-none", sizeStyles[size], className)}
      aria-hidden="true"
      {...props}
    >
      <span className="bg-[#14140F] opacity-35" />
      <span className="bg-[#14140F] opacity-65" />
      <span className="bg-[#14140F] opacity-100" />
    </span>
  );
};

// TriadPanel represents the tripartite metaphor (Strategy -> Technology -> Execution)
export interface TriadStep {
  title: string;
  subtitle: string;
}

export const defaultTriadSteps: TriadStep[] = [
  { title: "Strategy", subtitle: "Where growth is planned" },
  { title: "Technology", subtitle: "Where growth is built" },
  { title: "Execution", subtitle: "Where growth compounds" },
];

export const TriadPanel: React.FC<{
  steps?: TriadStep[];
  className?: string;
}> = ({ steps = defaultTriadSteps, className }) => {
  const opacities = ["opacity-35", "opacity-65", "opacity-100"];
  const widths = ["w-[22%]", "w-[22%]", "w-[22%]"];

  return (
    <div className={cn("bg-[#E4E3DB] rounded-[2px] p-8 md:p-12 flex flex-col gap-7", className)}>
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-center gap-5">
          <div className={cn("h-1 rounded-[1px] bg-[#14140F]", widths[idx], opacities[idx])} />
          <div className="font-sans text-sm font-semibold text-[#14140F]">
            {step.title}
            <small className="block font-normal text-[#57564C] text-xs mt-0.5">
              {step.subtitle}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};
