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
      <span className="bg-ink opacity-35" />
      <span className="bg-ink opacity-65" />
      <span className="bg-ink opacity-100" />
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

  return (
    <div
      className={cn(
        "fz-triad-panel relative border-t border-b border-[#e4e4e7] py-8 md:py-10 bg-transparent",
        className
      )}
    >
      <div className="flex flex-col gap-7 w-full h-full">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-5">
            <div
              className="fz-triad-bar-track h-1.5 w-[22%] rounded-full bg-[#e4e4e7] overflow-hidden relative shrink-0"
              aria-hidden="true"
            >
              <div
                className={cn(
                  "h-full w-full rounded-full origin-left fz-triad-bar-fill",
                  `fz-triad-bar-fill-${idx}`,
                  idx === 2 ? "bg-[#e11d48]" : cn("bg-[#0a0a0a]", opacities[idx])
                )}
              />
            </div>
            <div className="font-sans text-sm font-semibold text-[#0a0a0a]">
              <span className={idx === 2 ? "text-[#e11d48] font-bold" : ""}>
                {step.title}
              </span>
              <small className="block font-normal text-[#71717a] text-xs mt-0.5">
                {step.subtitle}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
