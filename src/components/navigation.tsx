/**
 * FILE: src/components/navigation.tsx
 *
 * WHAT THIS DOES:
 * Controls the entire menu navigation experience across Desktop, Tablet, and Mobile screens.
 *
 * WHERE IT IS USED:
 * - Mounted in `src/components/global-layout.tsx` so it appears on all pages.
 *
 * HOW IT WORKS:
 * Renders 3 responsive versions of navigation based on screen width:
 * 1. DesktopNavigation (>= 1024px): A floating glass header with logo, page links, and a "Book Consultation" button.
 * 2. TabletNavigationRail (768px - 1023px): A fixed left-hand vertical bar with icons and text labels.
 * 3. Mobile Navigation (< 768px): A top header bar with a slide-out hamburger drawer, plus a thumb-reachable bottom bar.
 *
 * ⚠️ BEGINNER NOTE:
 * Uses `usePathname()` to check which page the user is currently on and highlights the active link!
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, LayoutGrid, BriefcaseBusiness, BookOpen, Calendar, Menu, X, type LucideIcon } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "./button";
import { BrandMark } from "./brand-mark";
import { desktopNav, mobileNav, tabletNav } from "../mock/navigation";

const iconMap: Record<string, LucideIcon> = {
  Home: House,
  Solutions: LayoutGrid,
  Work: BriefcaseBusiness,
  About: BookOpen,
  Insights: BookOpen,
  Book: Calendar,
};

// DesktopNavigation: Sticky top header (>= 1024px)
const DesktopNavigation: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b py-3 px-6 md:px-8 hidden lg:block",
        isScrolled
          ? "bg-[#F0F0EB]/92 backdrop-blur-md border-[#DEDDD3] shadow-[0_1px_4px_rgba(20,20,15,0.03)]"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-[1360px] mx-auto flex items-center justify-between">
        {/* Brand logo lockup */}
        <BrandMark className="w-[211px] xl:w-[232px]" />

        {/* Navigation links */}
        <nav className="flex items-center gap-8" aria-label="Main Navigation">
          {desktopNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-sans text-xs font-semibold tracking-wider uppercase transition-colors duration-200",
                  isActive
                    ? "text-[#14140F] border-b-2 border-[#14140F] pb-0.5"
                    : "text-[#57564C] hover:text-[#14140F] pb-0.5"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Strategy Call Action */}
        <Link href="/contact">
          <Button variant="primary" size="sm">
            Book a Strategy Call
          </Button>
        </Link>
      </div>
    </header>
  );
};

// TabletNavigationRail: Left vertical side rail (768px - 1023px)
const TabletNavigationRail: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-20 bg-[#F0F0EB] border-r border-[#DEDDD3] py-8 flex flex-col items-center justify-between z-40 hidden md:flex lg:hidden">
      {/* Compact Brand Logo */}
      <BrandMark className="w-[37px] mb-8" />

      {/* Icon Navigation */}
      <nav className="flex flex-col gap-7 w-full px-2" aria-label="Tablet Navigation">
        {tabletNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = iconMap[item.label] || House;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1.5 py-2 w-full rounded-[2px] transition-colors",
                isActive
                  ? "text-[#14140F] bg-[#14140F]/8 font-semibold"
                  : "text-[#57564C] hover:text-[#14140F]"
              )}
            >
              <Icon className="w-5 h-5 stroke-[1.5]" />
              <span className="text-[10px] font-sans font-medium tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Profile/Indicator bulb */}
      <div className="w-4 h-4 rounded-full bg-[#14140F]/10" />
    </aside>
  );
};

// MobileBottomNavigation: Thumb-reachable bottom bar (< 768px)
const MobileBottomNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#F0F0EB]/96 backdrop-blur-md border-t border-[#DEDDD3] z-40 pb-safe-bottom md:hidden shadow-[0_-1px_10px_rgba(20,20,15,0.02)]">
      <div className="flex items-center justify-around px-4 py-2">
        {mobileNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = iconMap[item.label] || House;
          const label = item.href === "/contact" ? "Consult" : item.label;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-1 px-3 transition-colors",
                isActive ? "text-[#14140F] font-semibold" : "text-[#57564C]"
              )}
            >
              <Icon className="w-5 h-5 stroke-[1.5]" />
              <span className="text-[10px] font-sans font-medium">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

// MobileTopHeader: Top header with toggleable panel (< 768px)
const MobileTopHeader: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-[#F0F0EB]/92 backdrop-blur-md border-b border-[#DEDDD3]">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Brand logo */}
        <BrandMark className="w-[211px]" />

        {/* Menu toggle button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-panel"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#DEDDD3] text-[#14140F] transition-colors hover:bg-[#14140F]/5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#14140F]"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Collapsible panel */}
      <div
        id="mobile-navigation-panel"
        className={cn(
          "overflow-hidden border-t border-[#DEDDD3] bg-[#F0F0EB] transition-all duration-300",
          isOpen ? "max-h-[340px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="px-4 py-4 grid grid-cols-2 gap-2" aria-label="Mobile Navigation Panel">
          {mobileNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = iconMap[item.label] || House;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-[2px] border px-4 py-3 text-sm font-medium transition-colors font-sans",
                  isActive
                    ? "border-[#14140F] bg-[#14140F] text-[#F0F0EB]"
                    : "border-[#DEDDD3] bg-[#F0F0EB] text-[#57564C] hover:border-[#14140F] hover:text-[#14140F]"
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
