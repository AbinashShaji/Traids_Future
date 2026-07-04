// This file acts as the primary container setup (Root Providers) for the website. It nests multiple context containers around our website to enable global features like screen width detection and popup messages.
"use client";

import * as React from "react";
import { MotionProvider } from "./motion-provider";
import { DeviceExperienceManager } from "./device-experience-manager";
import { Toaster } from "sonner";

// RootProviders wraps the entire website with essential settings.
// Inputs: "children" (the entire application's page nodes).
// Outputs: Renders the nested contexts and displays toaster notifications styled to match our design.
export const RootProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // First, we set up device width listening.
    <DeviceExperienceManager>
      {/* Next, we include the animation setup. */}
      <MotionProvider>
        {/* Render our pages inside. */}
        {children}
        {/* Mount a notification popup tool (Toaster) at the bottom-right corner. */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#FAF9F6",
              color: "#111111",
              border: "1px solid #E8E8E8",
              borderRadius: "2px",
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: "14px",
            },
          }}
        />
      </MotionProvider>
    </DeviceExperienceManager>
  );
};
