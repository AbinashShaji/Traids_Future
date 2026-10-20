/**
 * FILE: src/components/brand-intro.tsx
 *
 * Senior Motion Engineering: First-visit cinematic brand intro sequence for Triads Future.
 *
 * Sequence:
 * 1. Draw the Triangle (0 → 820ms):
 *    Animates the actual Triads Future brand triangular logo from the SVG asset
 *    using a progressive stroke-drawing effect preserving exact geometry and proportions.
 *    As the stroke finishes, the solid brand fill resolves cleanly.
 *
 * 2. Reveal the Wordmark (850 → 1350ms):
 *    Uncovers the authentic "TRIADS FUTURE" wordmark horizontally from left to right
 *    using a precision clip-path reveal. Held until 1450ms.
 *
 * 3. Move into the Header (1450 → 1970ms):
 *    Calculates the exact sub-pixel viewport bounding box of the header logo
 *    and smoothly transitions the complete logo from center to the exact header position,
 *    matching dimensions and alignment with zero jump or duplicate-logo flash.
 *
 * 4. Reveal the Website (1450ms →):
 *    As the logo moves to the header, header navigation items cascade in one by one,
 *    and hero headline content letters reveal in parallel.
 *
 * Reliability:
 * - Session gate: sessionStorage["tf_intro_seen"] ensures play once per session.
 * - Synchronous pre-paint layout effect prevents header/hero flashes.
 * - Fail-safe timer (2500ms): guarantees user is never stuck on intro screen.
 * - Escape key support for immediate skip.
 * - prefers-reduced-motion support: skips immediately with zero flash.
 * - Hydration-safe & Next.js App Router compatible: zero script tags in JSX.
 */
"use client";

import * as React from "react";
import { BRAND_MARK_PATH, BRAND_WORDMARK_PATH } from "./brand-assets";

/* ── timing constants (ms) ──────────────────────────────────── */
const _T_DRAW_TRI = 820;   // Triangle stroke drawing
const _T_WORD_IN  = 850;   // Wordmark horizontal uncover starts
const _T_WORD_DUR = 500;   // Wordmark horizontal uncover duration (850 + 500 = 1350ms)
const T_HANDOFF   = 1450;  // Start flying to header
const T_FLIGHT    = 520;   // Flight duration to header (1450 + 520 = 1970ms)
const T_COMPLETE  = 1970;  // Finish intro and unmount overlay
const T_SAFETY    = 2500;  // Fail-safe hard timeout

export const SESSION_KEY     = "tf_intro_seen";
export const PLAYING_CLASS   = "tf-intro-playing";
export const REVEALING_CLASS = "tf-intro-revealing";

type Phase = "playing" | "handoff" | "done";

// Safe isomorphic layout effect for Next.js SSR
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/* ── external store helper for SSR-safe client detection ─────── */
const emptySubscribe = (callback: () => void) => {
  if (typeof window !== "undefined") {
    window.addEventListener("tf-intro-complete", callback);
    return () => window.removeEventListener("tf-intro-complete", callback);
  }
  return () => {};
};

export function isIntroNeeded(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return false;
    }
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    return false;
  }
}

/* ── component ──────────────────────────────────────────────── */

export const BrandIntro: React.FC = () => {
  const shouldPlay = React.useSyncExternalStore(
    emptySubscribe,
    isIntroNeeded,
    () => false
  );

  const [phase, setPhase] = React.useState<Phase>("playing");
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [flightTransform, setFlightTransform] = React.useState<string>("");

  const finishIntro = React.useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* best-effort in private browsing */
    }
    if (typeof document !== "undefined") {
      document.body.classList.remove(PLAYING_CLASS);
      document.body.classList.remove(REVEALING_CLASS);
      window.dispatchEvent(new CustomEvent("tf-intro-complete"));
    }
    setPhase("done");
  }, []);

  // Synchronously hide header & hero before browser paint on initial client mount
  useIsomorphicLayoutEffect(() => {
    if (isIntroNeeded()) {
      document.body.classList.add(PLAYING_CLASS);
    }
    return () => {
      document.body.classList.remove(PLAYING_CLASS);
      document.body.classList.remove(REVEALING_CLASS);
    };
  }, []);

  React.useEffect(() => {
    if (!shouldPlay || phase === "done") return;

    document.body.classList.add(PLAYING_CLASS);

    // 1. At T_HANDOFF: calculate exact header coordinates and begin flight
    const handoffTimer = setTimeout(() => {
      const target = document.getElementById("header-brand-mark");
      const stage = stageRef.current;

      if (target && stage) {
        const targetRect = target.getBoundingClientRect();
        const stageRect = stage.getBoundingClientRect();

        const scale = targetRect.width / stageRect.width;
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;
        const stageCenterX = stageRect.left + stageRect.width / 2;
        const stageCenterY = stageRect.top + stageRect.height / 2;

        const deltaX = targetCenterX - stageCenterX;
        const deltaY = targetCenterY - stageCenterY;

        setFlightTransform(
          `translate3d(${deltaX.toFixed(2)}px, ${deltaY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
        );
      } else {
        // Precise responsive fallback if element not yet measured
        const isDesktop = window.innerWidth >= 1024;
        const deltaY = -(window.innerHeight / 2 - 36);
        const deltaX = -(window.innerWidth / 2 - (isDesktop ? 120 : 95));
        setFlightTransform(`translate3d(${deltaX}px, ${deltaY}px, 0) scale(0.32)`);
      }

      setPhase("handoff");
      document.body.classList.add(REVEALING_CLASS);
      window.dispatchEvent(new CustomEvent("tf-intro-start-hero"));
    }, T_HANDOFF);

    // 2. At T_COMPLETE: logo arrives at header position; unmount intro
    const completeTimer = setTimeout(() => {
      finishIntro();
    }, T_COMPLETE);

    // 3. Hard safety timer: guarantees user is never stuck
    const safetyTimer = setTimeout(() => {
      finishIntro();
    }, T_SAFETY);

    // 4. Escape key skip support
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finishIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(handoffTimer);
      clearTimeout(completeTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove(PLAYING_CLASS);
      document.body.classList.remove(REVEALING_CLASS);
    };
  }, [shouldPlay, phase, finishIntro]);

  // If repeat visit, reduced motion, or sequence is finished, render nothing
  if (!shouldPlay || phase === "done") {
    return null;
  }

  const isHandoff = phase === "handoff";

  return (
    <div
      aria-hidden="true"
      id="tf-brand-intro"
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          99999,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        backgroundColor: "#ffffff",
        opacity:         isHandoff ? 0 : 1,
        transition:      isHandoff ? `opacity ${T_FLIGHT - 40}ms cubic-bezier(0.16, 1, 0.3, 1)` : "none",
        pointerEvents:   "none",
      }}
    >
      {/* Centered logo stage — flies to header position on handoff */}
      <div
        ref={stageRef}
        style={{
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          gap:             "clamp(20px, 3vw, 36px)",
          transform:       isHandoff && flightTransform ? flightTransform : "translate3d(0, 0, 0) scale(1)",
          transformOrigin: "center center",
          transition:      isHandoff ? `transform ${T_FLIGHT}ms cubic-bezier(0.2, 0.8, 0.2, 1)` : "none",
          willChange:      "transform",
          maxWidth:        "92vw",
        }}
      >
        {/* Step 1: Actual Triads Future triangle logo with progressive stroke-drawing effect */}
        <div
          style={{
            position:   "relative",
            display:    "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 281 242"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
            style={{
              width:  "clamp(75px, 11vw, 130px)",
              height: "auto",
              display: "block",
            }}
          >
            <path
              d={BRAND_MARK_PATH}
              className="tf-intro-triangle-path"
            />
          </svg>
        </div>

        {/* Step 2: "TRIADS FUTURE" wordmark with horizontal uncover reveal */}
        <div
          className="tf-intro-wordmark-wrap"
          style={{
            display:    "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="736 497 2026 530"
            preserveAspectRatio="xMinYMid meet"
            focusable="false"
            style={{
              height:      "clamp(68px, 10vw, 118px)",
              width:       "auto",
              aspectRatio: "2026 / 530",
              display:     "block",
            }}
          >
            <path fill="#0a0a0a" d={BRAND_WORDMARK_PATH} />
          </svg>
        </div>
      </div>
    </div>
  );
};

BrandIntro.displayName = "BrandIntro";
