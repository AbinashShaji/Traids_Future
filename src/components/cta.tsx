// CTA component for final action sections.
import * as React from "react";
import { cn } from "../utils/cn";

export interface CTAProps extends React.HTMLAttributes<HTMLDivElement> {
  headline: string;
  description?: string;
  eyebrow?: string;
}

export const CTA: React.FC<CTAProps> = ({
  className,
  headline,
  description,
  eyebrow = "Next Step",
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "py-20 md:py-28 border-t border-[#DEDDD3] flex flex-col items-center text-center max-w-3xl mx-auto px-6",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#57564C] mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-[#14140F] mb-4 leading-tight">
        {headline}
      </h2>
      
      {description && (
        <p className="font-editorial text-[#57564C] max-w-xl text-lg md:text-xl mb-8 leading-relaxed">
          {description}
        </p>
      )}
      
      {children && <div className="flex flex-wrap justify-center items-center gap-4">{children}</div>}
    </div>
  );
};
