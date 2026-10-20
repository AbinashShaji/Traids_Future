/**
 * FILE: src/components/navigation.tsx
 *
 * FinZave Global Header & Responsive Navigation System:
 * - Sticky top bar (72px) with .glass-panel frosted background
 * - Max-width 1400px container
 * - BrandMark with clean semantic anchor (no nested <a> tags)
 * - Navigation links with .fz-underline-hover sliding underline
 * - Primary pill button CTA
 * - Mobile hamburger drawer with 1px zinc partitions
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ArrowRight,
  House,
  Layers,
  BriefcaseBusiness,
  Users,
  Newspaper,
} from "lucide-react";
import { cn } from "../utils/cn";
import { ButtonLink } from "./button-link";
import { BrandMark } from "./brand-mark";
import { desktopNav } from "../mock/navigation";

export interface TabletRailItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const tabletRailNav: TabletRailItem[] = [
  { label: "Home", href: "/", icon: House },
  { label: "Solutions", href: "/solutions", icon: Layers },
  { label: "Work", href: "/work", icon: BriefcaseBusiness },
  { label: "About", href: "/about", icon: Users },
  { label: "Insights", href: "/insights", icon: Newspaper },
];

/**
 * TabletNavigationRail (768px - 1023px)
 *
 * Compact vertical icon navigation rail fixed on the left edge.
 * Features:
 * - 72px wide, matching top header height rhythm
 * - Fixed top-[72px] bottom-0 left-0, stable during scroll
 * - Pure white surface with #e4e4e7 right border
 * - Lucide icons (House, Layers, BriefcaseBusiness, Users, Newspaper)
 * - Active crimson accent indicator (#e11d48) with smooth transition
 * - Hover & focus tooltips with pointer arrows and full page titles
 * - Accessible labels and visible keyboard focus states
 * - Entrance slide & fade animation (220ms cubic-bezier(0.22, 1, 0.36, 1))
 * - Respects prefers-reduced-motion
 * - Strictly tablet-only (hidden md:flex lg:hidden)
 */
export const TabletNavigationRail: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Tablet Navigation"
      className="hidden md:flex lg:hidden fixed top-[72px] left-0 bottom-0 w-[72px] bg-white/95 backdrop-blur-md border-r border-[#e4e4e7] z-40 flex-col items-center justify-between py-6 fz-tablet-rail select-none"
    >
      {/* Top spacer balancing bottom element for vertical centering */}
      <div className="w-6 h-6" aria-hidden="true" />

      {/* Vertical Icon Navigation Links — Centered vertically like Instagram */}
      <nav className="my-auto flex flex-col items-center gap-4 sm:gap-5 w-full px-2" aria-label="Tablet navigation links">
        {tabletRailNav.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2",
                isActive
                  ? "bg-[#fafafa] text-[#e11d48] font-semibold shadow-xs"
                  : "text-[#71717a] hover:text-[#0a0a0a] hover:bg-[#f4f4f5]"
              )}
            >
              {/* Active Route Crimson Bar Indicator */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-2 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-[#e11d48] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive ? "h-6 opacity-100" : "h-0 opacity-0 pointer-events-none"
                )}
              />

              {/* Lucide Icon */}
              <Icon className="w-5 h-5 stroke-[1.75] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />

              {/* Full Title Tooltip (Hover & Keyboard Focus) */}
              <span
                role="tooltip"
                className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 z-50 px-2.5 py-1 bg-[#0a0a0a] text-white text-xs font-medium font-sans tracking-normal rounded-md shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 translate-x-1 group-hover:translate-x-0 group-focus-visible:translate-x-0 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#0a0a0a] rotate-45 pointer-events-none"
                />
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom subtle brand telemetry beacon */}
      <div 
        className="flex flex-col items-center justify-center w-6 h-6 py-2" 
        aria-hidden="true"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
      </div>
    </aside>
  );
};

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled((prev) => {
        if (!prev && scrollY > 28) return true;
        if (prev && scrollY < 12) return false;
        return prev;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on Escape key or when window resizes beyond mobile width
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-50 w-full h-[72px] transition-all duration-300 px-5 sm:px-6 md:px-8 lg:px-10 flex items-center",
          isScrolled || mobileMenuOpen
            ? "glass-panel shadow-sm bg-white/90 backdrop-blur-md border-b border-[#e4e4e7]"
            : "bg-white/80 backdrop-blur-sm border-b border-[#e4e4e7]/60"
        )}
      >
        <div className="relative w-full max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Brand Logo - single semantic <a> tag */}
          <div className="flex items-center shrink-0 z-10">
            <Link 
              href="/" 
              className="group inline-flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e11d48] rounded-md" 
              aria-label="Triads Future Home"
            >
              <BrandMark 
                asLink={false} 
                variant="full" 
                compact={isScrolled}
              />
            </Link>
          </div>

          {/* Desktop Links (>= 1024px) - Anchored to exact viewport/container horizontal center */}
          <nav 
            className="hidden lg:flex items-center gap-7 xl:gap-9 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-auto" 
            aria-label="Main Navigation"
          >
            {desktopNav.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-sans text-sm font-medium tracking-normal transition-colors duration-200 fz-underline-hover py-1",
                    isActive
                      ? "text-[#0a0a0a] font-semibold active fz-underline-hover-red"
                      : "text-[#71717a] hover:text-[#0a0a0a]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Primary Action (>= 768px, visible on Tablet & Desktop) */}
          <div className="hidden md:flex items-center gap-4 shrink-0 z-10">
            <ButtonLink 
              href="/contact" 
              variant="primary" 
              size="md"
              className="px-5 py-2.5 text-sm font-medium"
            >
              Book a Strategy Call
            </ButtonLink>
          </div>

          {/* Mobile Hamburger Toggle (< 768px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#0a0a0a] hover:bg-[#f4f4f5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2]" /> : <Menu className="w-6 h-6 stroke-[2]" />}
          </button>
        </div>

        {/* Mobile Drawer (< 768px) */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-drawer"
            className="md:hidden fixed top-[72px] left-0 right-0 bg-white/95 backdrop-blur-md border-b border-[#e4e4e7] p-6 shadow-xl flex flex-col gap-4 fz-drawer-enter z-50 max-h-[calc(100vh-72px)] overflow-y-auto"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {desktopNav.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between border-b border-[#f4f4f5] last:border-b-0",
                      isActive
                        ? "bg-[#fafafa] text-[#e11d48] font-semibold"
                        : "text-[#0a0a0a] hover:bg-[#f4f4f5]"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#e11d48]" />}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2">
              <ButtonLink 
                href="/contact" 
                variant="primary" 
                size="lg" 
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Strategy Call <ArrowRight className="w-4 h-4 ml-2" />
              </ButtonLink>
            </div>
          </div>
        )}
      </header>

      {/* Tablet-Only Left Icon Navigation Rail (768px - 1023px) */}
      <TabletNavigationRail />
    </>
  );
};
