// This file contains the GlobalLayout component. It is the master shell that wraps all webpages on the site, placing the header navigation at the top, the main page content in the middle, and the footer at the bottom.
import * as React from "react";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { PageTransition } from "./page-transition";
import { cn } from "../utils/cn";

// GlobalLayoutProps defines parameters for the master shell wrapper.
interface GlobalLayoutProps {
  children: React.ReactNode;
  className?: string;
  /** If true, adds padding to account for tablet left rail */
  withSideRail?: boolean;
}

// GlobalLayout renders navigation menus, page content, and footer layout columns.
// Inputs: "children" (nested webpage content), "className" (custom styles).
// Outputs: Renders a styled wrapper containing <Navigation>, <main> content body, and <Footer>.
export const GlobalLayout: React.FC<GlobalLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
      {/* Navigation renders the correct menu bar (top nav for computer, side nav for tablet, bottom nav for phone) */}
      <Navigation />

      {/* Main content body area */}
      <main
        className={cn(
          "flex-1 w-full flex flex-col",
          // Computer (Desktop): no top offset padding.
          "lg:pt-0",
          // Tablet: shift content right by 20 units (80 pixels) to clear the side navigation bar.
          "md:pl-20 lg:pl-0",
          // Phone (Mobile): shift content up by 36 units to clear the bottom navigation menu.
          "pb-36 md:pb-0",
          className
        )}
      >
        <PageTransition>{children}</PageTransition>
      </main>

      {/* Footer block at the bottom of the page */}
      <Footer />
    </div>
  );
};
