/**
 * FILE: src/providers/root-providers.tsx
 *
 * WHAT THIS DOES:
 * Wraps the entire website in global background tools and managers.
 *
 * WHERE IT IS USED:
 * - Mounted in `src/app/layout.tsx` around all page contents (`{children}`).
 *
 * HOW IT WORKS:
 * 1. <DeviceExperienceManager>: Detects if the visitor is on a phone, tablet, or laptop.
 * 2. <Toaster>: A popup notification tool (Sonner) that displays subtle alerts
 *    in the bottom-right corner when actions happen (like booking a call).
 *
 * ⚠️ BEGINNER NOTE:
 * Providers act like "invisible atmosphere" — they make information available
 * to all child components without having to pass props through every single layer!
 */
"use client";

import * as React from "react";
import { DeviceExperienceManager } from "./device-experience-manager";
import { Toaster } from "sonner";

export const RootProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DeviceExperienceManager>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#F0F0EB",
            color: "#14140F",
            border: "1px solid #DEDDD3",
            borderRadius: "2px",
            fontFamily: "var(--font-ui, sans-serif)",
            fontSize: "14px",
          },
        }}
      />
    </DeviceExperienceManager>
  );
};
