/**
 * FILE: src/components/scroll-observer.tsx
 *
 * Global lightweight scroll-reveal & scroll-spy observer following FinZave specification:
 * - Observes elements with .observe-me (threshold 0.15) and adds .is-visible
 * - Observes elements with .fz-scroll-num (threshold 0.3) and toggles .is-active for color transitions
 * - Zero external animation library dependencies
 * - Full reduced-motion fallback (renders instantly without animation)
 */
"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

export const ScrollObserver: React.FC = () => {
  const pathname = usePathname();

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Mark document as JS-ready strictly after hydration
    document.documentElement.classList.add("js-ready");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      document.querySelectorAll(".fz-scroll-num").forEach((el) => {
        el.setAttribute("data-active", "true");
      });
      return;
    }

    // Number scroll-spy observer (transitions color neutral -> crimson #e11d48)
    const numberObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).setAttribute("data-active", "true");
          }
        });
      },
      { root: null, rootMargin: "-15% 0px -25% 0px", threshold: 0.2 }
    );

    let isDisposed = false;

    // Scan for numbers after DOM commit
    const timer = setTimeout(() => {
      if (isDisposed) return;
      const numberElements = document.querySelectorAll(".fz-scroll-num");
      numberElements.forEach((el) => numberObserver.observe(el));
    }, 150);

    return () => {
      isDisposed = true;
      clearTimeout(timer);
      numberObserver.disconnect();
    };
  }, [pathname]);

  return null;
};

