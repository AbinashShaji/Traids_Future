/**
 * FILE: src/components/slide-rail.tsx
 *
 * WHAT THIS DOES:
 * Renders the vertical dot/line navigation progress bar on the right side of the screen.
 *
 * WHERE IT IS USED:
 * - Rendered by `<ScrollWorldContainer>` on desktop screens (>= 1024px).
 *
 * HOW IT WORKS:
 * 1. Takes the array of slides (e.g. `[{ id: "hero", label: "Overview" }, ...]`).
 * 2. Draws a vertical connecting line with circular indicator dots.
 * 3. Highlights the dot of the currently visible slide.
 * 4. When a user clicks a dot, it smoothly scrolls the page to that exact section ID (`#hero`, `#work`, etc.).
 *
 * ⚠️ BEGINNER NOTE:
 * Hidden automatically on mobile and tablet screens (< 1024px) to preserve screen space!
 */
"use client";

import * as React from "react";
import { useDevice } from "../providers/device-experience-manager";
import { useReducedMotion } from "framer-motion";
import { cn } from "../utils/cn";

export interface SlideItem {
  id: string;
  label: string;
}

interface SlideRailProps {
  slides: SlideItem[];
  activeId: string;
  onSelectSlide: (id: string) => void;
}

function subscribeToResize(callback: () => void) {
  window.addEventListener("resize", callback, { passive: true });
  return () => window.removeEventListener("resize", callback);
}

function getWindowWidthSnapshot() {
  if (typeof window === "undefined") return 1200;
  return window.innerWidth;
}

export const SlideRail: React.FC<SlideRailProps> = ({
  slides,
  activeId,
  onSelectSlide,
}) => {
  const { isDesktop } = useDevice();
  const prefersReducedMotion = useReducedMotion();
  const windowWidth = React.useSyncExternalStore(
    subscribeToResize,
    getWindowWidthSnapshot,
    () => 1200
  );

  // Strict DOM unmount for <1024px and reduced motion
  if (!isDesktop || windowWidth < 1024 || prefersReducedMotion) {
    return null;
  }

  return (
    <nav
      aria-label="Slide navigation"
      className="fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 pointer-events-auto select-none"
    >
      <ul className="flex flex-col gap-3 list-none p-0 m-0">
        {slides.map((slide, idx) => {
          const isActive = activeId === slide.id;
          return (
            <li key={slide.id} className="relative flex items-center justify-end group">
              {/* Tooltip Label on Hover/Focus */}
              <span
                className={cn(
                  "absolute right-8 px-2.5 py-1 text-[11px] font-sans font-medium uppercase tracking-[0.14em] rounded-[2px] transition-all duration-300 pointer-events-none whitespace-nowrap",
                  isActive
                    ? "opacity-100 bg-ink text-paper shadow-[0_2px_8px_rgba(0,0,0,0.08)] translate-x-0"
                    : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 bg-bone text-graphite translate-x-1 group-hover:translate-x-0 border border-hairline"
                )}
              >
                {slide.label}
              </span>

              {/* Progress Rail Button (Refined Triad Mark line indicator) */}
              <button
                type="button"
                onClick={() => onSelectSlide(slide.id)}
                aria-label={`Jump to slide ${idx + 1}: ${slide.label}`}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "relative flex items-center justify-end p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14140F] rounded-[2px] transition-all duration-300",
                  isActive ? "opacity-100" : "opacity-40 hover:opacity-100"
                )}
              >
                <span className="flex items-center gap-[3px]">
                  <span
                    className={cn(
                      "block h-[2px] rounded-[1px] bg-ink transition-all duration-300",
                      isActive ? "w-6 opacity-100" : "w-3 opacity-40 group-hover:w-4"
                    )}
                  />
                  <span
                    className={cn(
                      "block h-[2px] rounded-[1px] bg-ink transition-all duration-300",
                      isActive ? "w-4 opacity-75" : "w-2 opacity-30"
                    )}
                  />
                  <span
                    className={cn(
                      "block h-[2px] rounded-[1px] bg-ink transition-all duration-300",
                      isActive ? "w-2 opacity-50" : "w-1 opacity-20"
                    )}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
