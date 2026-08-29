/**
 * FILE: src/components/brand-mark.tsx
 *
 * WHAT THIS DOES:
 * Renders the interactive company logo in the navigation header with a scroll-morph animation.
 *
 * WHERE IT IS USED:
 * - Mounted in `src/components/navigation.tsx` inside Desktop, Tablet, and Mobile headers.
 *
 * HOW IT WORKS:
 * 1. At the very top of the page (scrollY = 0), it displays the wide horizontal logo (`traids_future_header_logo.png`).
 * 2. As the visitor scrolls down 200px, Framer Motion smoothly fades and scales the full logo into the compact triangle icon (`traid_future_triangle_logo.png`).
 * 3. On narrow tablet rails or when reduced-motion is enabled, it shows the compact logo statically.
 * 4. Always wraps the logo in `<Link href="/">` so clicking it takes you back home.
 *
 * BEGINNER TIP:
 * If the logo ever needs to be replaced, check `public/brand/` for the image files!
 */
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useDevice } from "../providers/device-experience-manager";
import { cn } from "../utils/cn";

// Helper for client mount detection without cascading setState renders
const emptySubscribe = () => () => {};
function useIsMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

// BrandMarkProps defines customization classes and accessibility labels for screen readers.
interface BrandMarkProps {
  className?: string;
  imageClassName?: string;
  ariaLabel?: string;
}

// BrandMark displays the company logo inside a clickable link.
export const BrandMark: React.FC<BrandMarkProps> = ({
  className,
  imageClassName,
  ariaLabel = "Triads Future home",
}) => {
  const { isTablet } = useDevice();
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const mounted = useIsMounted();

  // On the Tablet vertical side rail (which is narrow), we display the compact logo statically.
  // We also respect prefers-reduced-motion by rendering only the compact logo statically.
  const showCompactOnly = mounted && (prefersReducedMotion || isTablet);

  // Decide the container aspect ratio:
  // - Tablet: use aspect ratio of the compact logo (281:242 ~ 1.16)
  // - Desktop/Mobile: use aspect ratio of the full logo (871:165 ~ 5.28) to prevent layout shifts.
  // During SSR/hydration, default to the desktop/mobile aspect ratio to match server-rendered output.
  const containerAspect = (mounted && isTablet) ? "aspect-[281/242]" : "aspect-[871/165]";

  // Scroll animations driven by Framer Motion:
  // Custom easing function: cubic ease-out for a smooth deceleration/settling effect
  const cubicEaseOut = (t: number) => 1 - Math.pow(1 - t, 3);
  // Custom easing function: quadratic ease-in-out for smooth opacity transitions
  const quadraticEaseInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  // - Full Logo: opacity 1 -> 0, scale 1 -> 0.65 over first 200px of scroll
  const fullOpacity = useTransform(scrollY, [0, 200], [1, 0], { ease: quadraticEaseInOut });
  const fullScale = useTransform(scrollY, [0, 200], [1, 0.65], { ease: cubicEaseOut });

  // - Compact Icon: opacity 0 -> 1, scale 0.55 -> 0.65 over first 200px of scroll
  const compactOpacity = useTransform(scrollY, [0, 200], [0, 1], { ease: quadraticEaseInOut });
  const compactScale = useTransform(scrollY, [0, 200], [0.55, 0.65], { ease: cubicEaseOut });

  if (showCompactOnly) {
    return (
      <Link href="/" aria-label={ariaLabel} className={cn("inline-flex items-center", className)}>
        <div className={cn("relative w-full", containerAspect)}>
          <Image
            src="/brand/traid_future_triangle_logo.png"
            alt="Triads Future triangle logo"
            fill
            priority
            sizes={isTablet ? "37px" : "96px"}
            className={cn("object-contain object-left logo-adaptive", imageClassName)}
          />
        </div>
      </Link>
    );
  }

  return (
    <Link href="/" aria-label={ariaLabel} className={cn("inline-flex items-center", className)}>
      <div className={cn("relative w-full", containerAspect)}>
        {/* Full Logo Lockup */}
        <motion.div
          style={{
            opacity: fullOpacity,
            scale: fullScale,
            transformOrigin: "left center",
          }}
          className="absolute inset-0"
        >
          <Image
            src="/brand/traids_future_header_logo.png"
            alt="Triads Future logo"
            fill
            priority
            sizes="(max-width: 768px) 211px, 232px"
            className={cn("object-contain object-left logo-adaptive", imageClassName)}
          />
        </motion.div>

        {/* Compact Triangle Icon */}
        <motion.div
          style={{
            opacity: compactOpacity,
            scale: compactScale,
            transformOrigin: "left center",
          }}
          className="absolute inset-0"
        >
          <Image
            src="/brand/traid_future_triangle_logo.png"
            alt="Triads Future triangle logo mark"
            fill
            priority
            sizes="(max-width: 768px) 211px, 232px"
            className={cn("object-contain object-left logo-adaptive", imageClassName)}
          />
        </motion.div>
      </div>
    </Link>
  );
};
