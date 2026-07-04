// This file controls the main navigation menus of the website. It automatically decides whether to display a computer top-header, a tablet side-rail, or a mobile bottom-bar and top-menu depending on screen size.
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, LayoutGrid, BriefcaseBusiness, BookOpen, Calendar, Menu, X } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "./button";
import { BrandMark } from "./brand-mark";
import { desktopNav, mobileNav, tabletNav } from "../mock/navigation";

// iconMap links each menu text label to a graphical icon from the Lucide library.
const iconMap = {
  Home: House,
  Solutions: LayoutGrid,
  Work: BriefcaseBusiness,
  About: BookOpen,
  Insights: BookOpen,
  Book: Calendar,
};

// DesktopNavigation is the header menu rendered on computer screens (1024px or wider).
// Inputs: None (no props needed).
// Outputs: Renders a sticky top <header> navigation bar.
const DesktopNavigation: React.FC = () => {
  // read the current browser URL path (pathname) to highlight the active menu item.
  const pathname = usePathname();
  // State keeps track of whether the user has scrolled down. If they scroll past 20 pixels, we make the header background solid.
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent py-3 px-6 md:px-8 hidden lg:block bg-[#FAF9F6]/70 backdrop-blur-md",
        // If scrolled down, show borders and solid light background. Otherwise, keep transparent backdrop.
        isScrolled 
          ? "bg-[#FAF9F6]/92 border-[#E8E8E8] shadow-[0_1px_3px_rgba(0,0,0,0.01)]" 
          : "bg-[#FAF9F6]/70"
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Brand logo link */}
        <BrandMark className="w-[211px] xl:w-[232px]" />
        
        {/* Links list */}
        <nav className="flex items-center gap-8">
          {desktopNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-sans text-sm font-medium transition-colors duration-200",
                  // Highlight the active page link with dark text and bottom underline.
                  isActive 
                    ? "text-[#111111] border-b border-[#111111] pb-1" 
                    : "text-[#5F5F5F] hover:text-[#111111] pb-1"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        {/* Call booking trigger */}
        <Link href="/contact">
          <Button variant="primary" size="sm">
            Book a Strategy Call
          </Button>
        </Link>
      </div>
    </header>
  );
};

// TabletNavigationRail is a vertical menu panel rendered on tablet screens (768px to 1023px wide).
// Inputs: None.
// Outputs: Renders a fixed left side-bar menu (<aside>).
const TabletNavigationRail: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-20 bg-[#FAF9F6] border-r border-[#E8E8E8] py-8 flex flex-col items-center justify-between z-40 hidden md:flex lg:hidden">
      {/* Small brand logo mark */}
      <BrandMark className="w-[37px] mb-8" />
      
      {/* Icon navigation links */}
      <nav className="flex flex-col gap-8 w-full px-2">
        {tabletNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = iconMap[item.label as keyof typeof iconMap];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1.5 py-2 w-full rounded-sm transition-colors",
                // Highlight the active tab with a light gray background panel.
                isActive 
                  ? "text-[#111111] bg-[#111111]/5" 
                  : "text-[#5F5F5F] hover:text-[#111111]"
              )}
            >
              <Icon className="w-5 h-5 stroke-[1.5]" />
              <span className="text-[10px] font-medium tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
        {/* Book tab for Strategy Call */}
        <Link
          href="/contact"
          className={cn(
            "flex flex-col items-center gap-1.5 py-2 w-full rounded-sm transition-colors",
            // Highlight contact if active.
            pathname === "/contact"
              ? "text-[#111111] bg-[#111111]/5"
              : "text-[#5F5F5F] hover:text-[#111111]"
          )}
        >
          <Calendar className="w-5 h-5 stroke-[1.5]" />
          <span className="text-[10px] font-medium tracking-tight">Book</span>
        </Link>
      </nav>
      {/* Profile placeholder bulb */}
      <div className="w-6 h-6 rounded-full bg-[#111111]/5" />
    </aside>
  );
};

// MobileBottomNavigation is a thumb-reachable bottom menu rendered on mobile phone screens (less than 768px wide).
// Inputs: None.
// Outputs: Renders a fixed bottom navigation bar (<nav>).
const MobileBottomNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#FAF9F6]/96 backdrop-blur-md border-t border-[#E8E8E8] z-40 pb-safe-bottom md:hidden shadow-[0_-1px_10px_rgba(0,0,0,0.01)] rounded-t-sm">
      <div className="flex items-center justify-around px-4 py-2">
        {mobileNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = iconMap[item.label as keyof typeof iconMap];
          // Shorten the contact text on small screens.
          const label = item.href === "/contact" ? "Consult ." : item.label;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-1 px-3 transition-colors",
                // Highlight active item with dark text color.
                isActive ? "text-[#111111]" : "text-[#5F5F5F]"
              )}
              >
                <Icon className="w-5 h-5 stroke-[1.5]" />
                <span className="text-[10px] font-medium">
                {label}
                </span>
              </Link>
          );
        })}
      </div>
    </nav>
  );
};

// MobileTopHeader is a top bar with a logo and hamburger dropdown menu for phone viewports.
// Inputs: None.
// Outputs: Renders a fixed top header with a collapsing navigation panel.
const MobileTopHeader: React.FC = () => {
  const pathname = usePathname();
  // State keeps track of whether the dropdown menu panel is toggled open (true) or closed (false).
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-[#FAF9F6]/92 backdrop-blur-md border-b border-[#E8E8E8]">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Brand logo */}
        <BrandMark className="w-[211px]" />
        
        {/* Toggle button */}
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-panel"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#E8E8E8] text-[#111111] transition-colors hover:bg-[#111111]/5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#111111]"
        >
          {/* Show the X icon when open, and the hamburger Menu icon when closed */}
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Collapsible panel with grid links */}
      <div
        id="mobile-navigation-panel"
        className={cn(
          "overflow-hidden border-t border-[#E8E8E8] bg-[#FAF9F6] transition-all duration-300",
          // Toggle maximum height and opacity properties based on the isOpen state.
          isOpen ? "max-h-[340px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="px-4 py-4 grid grid-cols-2 gap-2">
          {mobileNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = iconMap[item.label as keyof typeof iconMap];
            return (
              <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-sm border px-4 py-3 text-sm font-medium transition-colors",
                // Active link gets filled black background. Inactive link has light borders.
                isActive
                    ? "border-[#111111] bg-[#111111] text-[#FAF9F6]"
                    : "border-[#E8E8E8] bg-[#FAF9F6] text-[#5F5F5F] hover:border-[#111111] hover:text-[#111111]"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

// Navigation is the universal component that returns the correct navigation sub-component layout based on CSS visibility.
// Inputs: None.
// Outputs: Renders a React fragment holding Desktop, Tablet, and Mobile nav elements.
export const Navigation: React.FC = () => {
  return (
    <>
      <DesktopNavigation />
      <TabletNavigationRail />
      <MobileTopHeader />
      <MobileBottomNavigation />
    </>
  );
};
