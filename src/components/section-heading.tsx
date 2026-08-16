// SectionHeading component displaying structured titles using Archivo display typography and Triad Mark eyebrows.
import * as React from "react";
import { cn } from "../utils/cn";
import { TriadMark } from "./triad-mark";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  tag?: "h1" | "h2" | "h3" | "h4";
  subtitle?: string;
  withTriadMark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  className,
  tag = "h2",
  subtitle,
  withTriadMark = false,
  children,
  ...props
}) => {
  const Tag = tag;

  const tagStyles = {
    h1: "text-4xl md:text-6xl lg:text-[64px] font-heading font-bold tracking-tight text-[#14140F] leading-[1.05]",
    h2: "text-3xl md:text-4xl lg:text-[40px] font-heading font-bold tracking-tight text-[#14140F] leading-[1.15]",
    h3: "text-xl md:text-2xl font-heading font-bold tracking-tight text-[#14140F] leading-[1.25]",
    h4: "text-lg md:text-xl font-heading font-semibold text-[#14140F] leading-[1.3]",
  };

  return (
    <div className="flex flex-col gap-3">
      {subtitle && (
        <div className="flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#57564C]">
          {withTriadMark && <TriadMark size="sm" />}
          <span>{subtitle}</span>
        </div>
      )}
      <Tag className={cn(tagStyles[tag], className)} {...props}>
        {children}
      </Tag>
    </div>
  );
};
