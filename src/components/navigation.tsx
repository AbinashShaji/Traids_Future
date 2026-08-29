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
import { House, LayoutGrid, BriefcaseBusiness, BookOpen, Calendar, type LucideIcon } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "./button";
import { BrandMark } from "./brand-mark";
import { ThemeToggle } from "./theme-toggle";
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
          ? "bg-[var(--paper)]/92 backdrop-blur-md border-[var(--hairline)] shadow-[0_1px_4px_rgba(20,20,15,0.03)]"
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
                    ? "text-[var(--ink)] border-b-2 border-[var(--ink)] pb-0.5"
                    : "text-[var(--graphite)] hover:text-[var(--ink)] pb-0.5"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Strategy Call Action & Theme */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/contact">
            <Button variant="primary" size="sm">
              Book a Strategy Call
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

// TabletNavigationRail: Left vertical side rail (768px - 1023px)
const TabletNavigationRail: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-20 bg-[var(--paper)] border-r border-[var(--hairline)] py-8 flex flex-col items-center justify-between z-40 hidden md:flex lg:hidden">
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
                  ? "text-[var(--ink)] bg-[var(--ink)]/8 font-semibold"
                  : "text-[var(--graphite)] hover:text-[var(--ink)]"
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

      {/* Profile/Indicator & Theme */}
      <div className="flex flex-col items-center gap-6">
        <ThemeToggle />
        <div className="w-4 h-4 rounded-full bg-[var(--ink)]/10" />
      </div>
    </aside>
  );
};

import { LimelightNav, type NavItem } from "./ui/limelight-nav";
import { useRouter } from "next/navigation";

// MobileBottomNavigation: Thumb-reachable bottom bar (< 768px)
const MobileBottomNavigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Find active index by checking if the current path starts with the nav item's href.
  // Special case for Home ("/") to avoid it matching every path.
  const activeIndex = mobileNav.findIndex(item => {
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  });

  // Map to Limelight NavItem format
  const limelightItems: NavItem[] = mobileNav.map((item) => {
    const Icon = iconMap[item.label] || House;
    const label = item.href === "/contact" ? "Consult" : item.label;
    
    return {
      id: item.href,
      icon: <Icon />,
      label: label,
      onClick: () => router.push(item.href)
    };
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <LimelightNav 
        items={limelightItems} 
        defaultActiveIndex={activeIndex !== -1 ? activeIndex : 0}
      />
    </div>
  );
};

// MobileTopHeader: Top header without toggleable panel (< 768px)
const MobileTopHeader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-[var(--paper)]/92 backdrop-blur-md border-b border-[var(--hairline)]">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Brand logo */}
        <BrandMark className="w-[160px]" />
        <ThemeToggle />
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
