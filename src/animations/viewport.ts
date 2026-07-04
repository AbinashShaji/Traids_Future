// This file is used to determine if the website should show animations based on the size of the visitor's screen (phone vs computer) and their system preferences (like if they turned off animations to prevent motion sickness).
"use client";

import * as React from "react";
import { useReducedMotion, type Variants, type ViewportOptions } from "framer-motion";
import { revealEase } from "./presets";

// A Breakpoint represents the categories of device screen sizes: "mobile" (phones), "tablet", or "desktop" (computers).
export type RevealBreakpoint = "mobile" | "tablet" | "desktop";

// RevealMotionProps stores the rules for how a single animation triggers, such as when it starts, how it animates, and what visual preset it uses.
export interface RevealMotionProps {
  initial: "hidden" | false;
  whileInView?: "visible";
  viewport?: ViewportOptions;
  variants?: Variants;
}

// ResponsiveRevealMotion stores information about the screen, motion settings, and specific animation rules for different container types.
export interface ResponsiveRevealMotion {
  breakpoint: RevealBreakpoint;
  reducedMotion: boolean;
  motionEnabled: boolean;
  sectionMotion: RevealMotionProps;
  containerMotion: RevealMotionProps;
  itemMotion: RevealMotionProps;
}

// These options control when an animation starts as you scroll down the page.
// "once: true" means the animation only plays the first time you scroll to it.
// "amount: 0.28" means the animation starts when 28% of the element is visible on the screen.
const revealViewport: ViewportOptions = {
  once: true,
  amount: 0.28,
  margin: "0px 0px -12% 0px",
};

// getBreakpoint is a helper function that takes the screen width in pixels and returns whether it is a "mobile", "tablet", or "desktop" size.
function getBreakpoint(width: number): RevealBreakpoint {
  // If the screen is narrower than 768 pixels, it is a phone (mobile) screen.
  if (width < 768) {
    return "mobile";
  }

  // If the screen is between 768 and 1023 pixels, it is a tablet screen.
  if (width < 1024) {
    return "tablet";
  }

  // If the screen is 1024 pixels or wider, it is a computer (desktop) screen.
  return "desktop";
}

// getMotionScale returns how far elements should slide up and how long the animation should take depending on the device category.
function getMotionScale(breakpoint: RevealBreakpoint) {
  // If we are on a tablet, we make the animation travel a shorter distance and happen slightly faster.
  if (breakpoint === "tablet") {
    return {
      distance: 14,
      duration: 0.5,
      stagger: 0.08,
      itemDuration: 0.42,
      delayChildren: 0.01,
    };
  }

  // On standard desktop computers, we use the default animation distance and timing.
  return {
    distance: 20,
    duration: 0.6,
    stagger: 0.1,
    itemDuration: 0.5,
    delayChildren: 0.02,
  };
}

// createFadeUpVariants builds the rules that tell an element to start invisible and offset down, then fade in and slide up to its natural position.
function createFadeUpVariants(distance: number, duration: number, delayStep = 0): Variants {
  return {
    hidden: {
      opacity: 0,
      y: distance,
    },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: revealEase,
        delay: custom * delayStep, // Adds a delay step if this is part of a list.
      },
    }),
  };
}

// createStaggerVariants builds the rules for list containers to stagger the animations of their child elements (like items in a list fading in one after another).
function createStaggerVariants(stagger: number, delayChildren: number): Variants {
  return {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger, // Delay between animating each child.
        delayChildren, // Start delay before the first child starts animating.
      },
    },
  };
}

// useViewportReveal is a custom hook (a function that hooks into React's life cycle) to listen to screen size changes and build configuration rules for scroll reveals.
export function useViewportReveal(): ResponsiveRevealMotion {
  // Check if the user's operating system has requested reduced motion to avoid motion sickness.
  const reducedMotion = useReducedMotion() === true;
  
  // Set up React state to keep track of the current screen breakpoint size.
  const [breakpoint, setBreakpoint] = React.useState<RevealBreakpoint>("desktop");

  // Run this effect block when the component loads to listen to browser window resize events.
  React.useEffect(() => {
    const updateBreakpoint = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    updateBreakpoint();
    // Listen for resize events to dynamically adjust the breakpoint state when screen size changes.
    window.addEventListener("resize", updateBreakpoint, { passive: true });

    // Clean up our window listener when the component is unloaded from memory.
    return () => {
      window.removeEventListener("resize", updateBreakpoint);
    };
  }, []);

  // Animations are disabled if the user prefers reduced motion or if they are browsing from a mobile phone.
  const motionEnabled = !reducedMotion && breakpoint !== "mobile";

  // Log status details to the console for tracking.
  console.log('REVEAL CHECK:', { reducedMotion, breakpoint, motionEnabled });

  // Get the travel scale values based on the calculated screen category.
  const scale = getMotionScale(breakpoint);

  // Return the configured motion object, caching it so it only updates when the inputs change.
  return React.useMemo(() => {
    // If animations are disabled, return simple objects that prevent elements from hiding or moving.
    if (!motionEnabled) {
      return {
        breakpoint,
        reducedMotion,
        motionEnabled: false,
        sectionMotion: { initial: false },
        containerMotion: { initial: false },
        itemMotion: { initial: false },
      };
    }

    // Build variants for sections, containers, and inner items.
    const sectionVariants = createFadeUpVariants(scale.distance, scale.duration, 0.08);
    const containerVariants = createStaggerVariants(scale.stagger, scale.delayChildren);
    const itemVariants = createFadeUpVariants(scale.distance, scale.itemDuration);

    return {
      breakpoint,
      reducedMotion,
      motionEnabled: true,
      sectionMotion: {
        initial: "hidden",
        whileInView: "visible",
        viewport: revealViewport,
        variants: sectionVariants,
      },
      containerMotion: {
        initial: "hidden",
        whileInView: "visible",
        viewport: revealViewport,
        variants: containerVariants,
      },
      itemMotion: {
        initial: "hidden",
        whileInView: "visible",
        viewport: revealViewport,
        variants: itemVariants,
      },
    };
  }, [breakpoint, motionEnabled, reducedMotion, scale.delayChildren, scale.distance, scale.duration, scale.itemDuration, scale.stagger]);
}