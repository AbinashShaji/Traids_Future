/**
 * FILE: src/providers/device-experience-manager.tsx
 *
 * WHAT THIS DOES:
 * Detects the visitor's screen width and tells the whole app whether
 * the user is on a Desktop monitor (>=1024px), Tablet (768-1023px), or Mobile phone (<768px).
 *
 * WHERE IT IS USED:
 * - Mounted in `src/providers/root-providers.tsx`.
 * - Read by components using the `useDevice()` hook (e.g. Navigation, Reveal, SlideRail).
 *
 * HOW IT WORKS:
 * 1. Listens to browser window resize events (`window.addEventListener("resize", ...)`).
 * 2. Compares `window.innerWidth` against 1024px and 768px breakpoints.
 * 3. Provides `isDesktop`, `isTablet`, and `isMobile` booleans via React Context.
 *
 * ⚠️ BEGINNER NOTE:
 * The 1024px breakpoint is the exact dividing line for the desktop scroll-world!
 */
"use client";

import * as React from "react";

// DeviceType lists the types of devices we care about.
type DeviceType = "desktop" | "tablet" | "mobile";

// DeviceContextValue holds information about the active device.
interface DeviceContextValue {
  device: DeviceType;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

// DeviceContext acts as a shared global storage (called Context) that makes device info available to any part of our website without passing it manually.
const DeviceContext = React.createContext<DeviceContextValue>({
  device: "desktop",
  isDesktop: true,
  isTablet: false,
  isMobile: false,
});

// useDevice is a custom hook (a shortcut function) that any webpage component can use to read the current device information.
export const useDevice = () => React.useContext(DeviceContext);

// DeviceExperienceManager is a wrapper component. It listens to screen size adjustments and shares the active device category down to all its child components.
// Inputs: "children" (the web pages and elements nested inside this wrapper).
// Outputs: Renders the child components unchanged but injects current device context parameters.
export const DeviceExperienceManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // We keep track of the current device size using React State. The default is "desktop".
  const [device, setDevice] = React.useState<DeviceType>("desktop");

  // React Effect runs once when this manager starts up. It binds a screen resize listener.
  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      // If the screen width is 1024 pixels or wider, it's a computer monitor.
      if (w >= 1024) setDevice("desktop");
      // If the screen width is between 768 pixels and 1023 pixels, it's a tablet screen.
      else if (w >= 768) setDevice("tablet");
      // Otherwise, it's a small screen, like a mobile phone.
      else setDevice("mobile");
    };

    update();
    // Watch for browser resizing and recalculate the screen type.
    window.addEventListener("resize", update);
    
    // Clean up the resize watcher when this manager is removed.
    return () => window.removeEventListener("resize", update);
  }, []);

  // Here, we build a helper object filled with true/false answers based on the current active device category.
  const value: DeviceContextValue = {
    device,
    isDesktop: device === "desktop",
    isTablet: device === "tablet",
    isMobile: device === "mobile",
  };

  // We wrap the website's children inside a Context Provider, passing our calculated device information.
  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};
