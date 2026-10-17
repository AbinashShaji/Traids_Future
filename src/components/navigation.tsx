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
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "../utils/cn";
import { ButtonLink } from "./button-link";
import { BrandMark } from "./brand-mark";
import { desktopNav } from "../mock/navigation";

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-50 w-full h-[72px] transition-all duration-300 px-6 md:px-10 flex items-center",
        isScrolled || mobileMenuOpen
          ? "glass-panel shadow-sm bg-white/90 backdrop-blur-md border-b border-[#e4e4e7]"
          : "bg-white/80 backdrop-blur-sm border-b border-[#e4e4e7]/60"
      )}
    >
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Brand Logo - single semantic <a> tag */}
        <Link href="/" className="inline-flex items-center" aria-label="Triads Future Home">
          <BrandMark asLink={false} className="w-[180px] sm:w-[200px]" />
        </Link>

        {/* Desktop Links (>= 768px) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main Navigation">
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

        {/* Desktop Primary Action */}
        <div className="hidden md:flex items-center gap-4">
          <ButtonLink href="/contact" variant="primary" size="md">
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
        >
          {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2]" /> : <Menu className="w-6 h-6 stroke-[2]" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 right-0 bg-white border-b border-[#e4e4e7] p-6 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
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
  );
};
