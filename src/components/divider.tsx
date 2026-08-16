// Divider component rendering hairline section rules.
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
        <div className="flex-1 h-[1px] bg-[#DEDDD3]" />
        <span className="triad-mark inline-flex items-center gap-1 opacity-70">
          <span className="w-2 h-[2px] bg-[#14140F] opacity-35" />
          <span className="w-2 h-[2px] bg-[#14140F] opacity-65" />
          <span className="w-2 h-[2px] bg-[#14140F] opacity-100" />
        </span>
        <div className="flex-1 h-[1px] bg-[#DEDDD3]" />
      </div>
    );
  }

  return (
    <hr
      className={cn("w-full border-0 h-[1px] bg-[#DEDDD3]", className)}
      {...props}
    />
  );
};
