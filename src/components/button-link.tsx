/**
 * FILE: src/components/button-link.tsx
 *
 * Semantic navigation button rendering as Next.js <Link> (avoids <a><button> nesting)
 * strictly following FinZave design specifications:
 * - primary: Solid Obsidian black pill (hover Crimson Red #e11d48, lift -2px, shadow)
 * - secondary: Solid white pill with 1px zinc border
 * - outline: Transparent pill with 1px zinc border
 * - text: Ghost link with .fz-underline-hover sliding underline
 */

import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { cn } from "../utils/cn";

export interface ButtonLinkProps
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  variant?: "primary" | "secondary" | "outline" | "text" | "cobalt";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-medium tracking-[0.01em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-2 select-none cursor-pointer active:translate-y-0";

  const variantStyles = {
    primary:
      "rounded-full bg-[#0a0a0a] text-white border border-[#0a0a0a] hover:bg-[#e11d48] hover:border-[#e11d48] hover:-translate-y-0.5 shadow-xl shadow-black/5 active:scale-[0.98]",
    secondary:
      "rounded-full bg-white text-[#0a0a0a] border border-[#e4e4e7] hover:bg-[#f4f4f5] hover:border-[#d4d4d8] hover:-translate-y-0.5 shadow-sm",
    outline:
      "rounded-full bg-transparent text-[#0a0a0a] border border-[#e4e4e7] hover:bg-[#f4f4f5] hover:border-[#d4d4d8] hover:-translate-y-0.5",
    text:
      "rounded-none bg-transparent text-[#0a0a0a] border-none p-0 relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-full after:h-[2px] after:bg-[#e11d48] after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left focus-visible:after:scale-x-100 focus-visible:after:origin-left hover:text-[#e11d48] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-4",
    cobalt:
      "rounded-full bg-[#0a0a0a] text-white border border-[#0a0a0a] hover:bg-[#e11d48] hover:border-[#e11d48] hover:-translate-y-0.5 shadow-xl shadow-black/5 active:scale-[0.98]",
  };

  const sizeStyles = {
    sm: variant === "text" ? "text-xs py-0.5" : "text-xs px-5 py-2.5",
    md: variant === "text" ? "text-sm py-1" : "text-sm px-7 py-3.5",
    lg: variant === "text" ? "text-base py-1" : "text-base px-9 py-4 font-semibold",
  };

  return (
    <Link
      href={href}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
};

ButtonLink.displayName = "ButtonLink";
