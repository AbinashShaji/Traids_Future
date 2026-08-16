// Master layout shell wrapping pages with responsive navigation, main container, and footer.
import * as React from "react";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { PageTransition } from "./page-transition";
import { cn } from "../utils/cn";

interface GlobalLayoutProps {
  children: React.ReactNode;
  className?: string;
  withSideRail?: boolean;
}

export const GlobalLayout: React.FC<GlobalLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F0F0EB] text-[#14140F]">
      {/* Navigation manages Desktop header, Tablet rail, and Mobile bars */}
      <Navigation />

      {/* Main content viewport */}
      <main
        className={cn(
          "flex-1 w-full flex flex-col",
          "lg:pt-0",
          "md:pl-20 lg:pl-0",
          "pb-28 md:pb-0",
          className
        )}
      >
        <PageTransition>{children}</PageTransition>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
