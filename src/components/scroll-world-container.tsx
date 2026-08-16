"use client";

import * as React from "react";
import { SlideRail, type SlideItem } from "./slide-rail";
import { useDevice } from "../providers/device-experience-manager";
import { useReducedMotion } from "framer-motion";

interface ScrollWorldContainerProps {
  slides: SlideItem[];
  children: React.ReactNode;
  className?: string;
}

export const ScrollWorldContainer: React.FC<ScrollWorldContainerProps> = ({
  slides,
  children,
  className,
}) => {
  const { isDesktop } = useDevice();
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = React.useState<string>(slides[0]?.id || "");
  const [isDesktopLocked, setIsDesktopLocked] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleResize = () => {
      const isLargeDesktop = window.innerWidth >= 1024 && !prefersReducedMotion;
      setIsDesktopLocked(isLargeDesktop);

      if (isLargeDesktop) {
        document.documentElement.classList.add("desktop-snap");
      } else {
        document.documentElement.classList.remove("desktop-snap");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      document.documentElement.classList.remove("desktop-snap");
    };
  }, [prefersReducedMotion]);

  // Track active slide with IntersectionObserver
  React.useEffect(() => {
    if (!isDesktopLocked) return;

    const observers: IntersectionObserver[] = [];

    slides.forEach((slide) => {
      const el = document.getElementById(slide.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(slide.id);
            }
          });
        },
        {
          root: null,
          threshold: 0.5,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [slides, isDesktopLocked]);

  const handleSelectSlide = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <div className={className}>
      {children}
      {isDesktopLocked && isDesktop && (
        <SlideRail
          slides={slides}
          activeId={activeId}
          onSelectSlide={handleSelectSlide}
        />
      )}
    </div>
  );
};
