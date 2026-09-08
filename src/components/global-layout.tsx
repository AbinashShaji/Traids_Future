/**
 * FILE: src/components/global-layout.tsx
 *
 * WHAT THIS DOES:
 * The outer visual frame for the entire website. It places the Navigation
 * bar at the top, the main content area in the middle, and the Footer at the bottom.
 *
 * WHERE IT IS USED:
 * - Used on every major page: Homepage, About, Solutions, Work, Insights, Contact,
 *   Privacy, and Terms.
 *
 * HOW IT WORKS:
 * 1. Automatically renders `<Navigation />` (which adapts to desktop/tablet/mobile).
 * 2. Wraps the page's contents (`{children}`) inside a `<main>` semantic element.
 * 3. Applies left padding on tablets (`md:pl-20`) to make room for the vertical side rail.
 * 4. Automatically renders `<Footer />` at the bottom.
 *
 * ⚠️ BEGINNER WARNING:
 * Because this layout wraps nearly every page on the site, any changes made here
 * will affect the visual structure of the entire website!
 */

import * as React from "react";
import Image from "next/image";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { cn } from "../utils/cn";

interface GlobalLayoutProps {
  /** The content of the specific page being rendered */
  children: React.ReactNode;
  /** Optional custom CSS classes for the main container */
  className?: string;
  /** Optional side rail flag */
  withSideRail?: boolean;
}

export const GlobalLayout: React.FC<GlobalLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--paper)] text-[var(--ink)] transition-colors duration-300 relative z-0">
      


      {/* Abstract Background Logo watermark */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-[-1]">
        <div className="relative w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] opacity-10 dark:opacity-5">
          <Image
            src="/brand/triad_future_triangle_logo.png"
            alt=""
            fill
            sizes="(max-width: 400px) 60vw, 400px"
            className="object-contain logo-adaptive"
          />
        </div>
      </div>

      {/* Navigation manages Desktop header, Tablet rail, and Mobile bars */}
      <Navigation />

      {/* Main content viewport */}
      <main
        className={cn(
          "flex-1 w-full flex flex-col relative z-10",
          "lg:pt-0",
          "md:pl-20 lg:pl-0",
          "pb-28 md:pb-0",
          className
        )}
      >
        {children}
      </main>

      {/* Footer */}
      <div className="md:pl-20 lg:pl-0 relative z-10">
        <Footer />
      </div>
    </div>
  );
};
