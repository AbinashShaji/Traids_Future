/**
 * FILE: src/components/global-layout.tsx
 *
 * Clean global layout shell for Triads Future following FinZave architecture:
 * - Fixed/sticky glass top navigation bar
 * - Full-width main content area
 * - Full-width footer
 */
import * as React from "react";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { cn } from "../utils/cn";

interface GlobalLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const GlobalLayout: React.FC<GlobalLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0a0a0a] relative z-0">

      {/* Top Glassmorphism Navigation */}
      <Navigation />

      {/* Main Content Viewport */}
      <main id="main-content" className={cn("flex-1 w-full flex flex-col relative z-10", className)}>
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
