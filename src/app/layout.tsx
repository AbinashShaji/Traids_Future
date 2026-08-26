/**
 * FILE: src/app/layout.tsx
 *
 * WHAT THIS DOES:
 * The root HTML shell that wraps every single page on the Triads Future website.
 *
 * WHERE IT IS USED:
 * - Automatically called by Next.js around every route in the `src/app/` folder.
 *
 * HOW IT WORKS:
 * 1. Loads Google Fonts (`Newsreader` for editorial serif and `Inter_Tight` for UI & body text).
 * 2. Injects global stylesheet (`globals.css`).
 * 3. Sets default SEO metadata (page title and search engine description).
 * 4. Mounts `<RootProviders>` (device detection + popup toaster).
 * 5. Mounts `<CustomCursor>` (the interactive mouse ring).
 * 6. Renders the active page's components inside `{children}`.
 *
 * ⚠️ BEGINNER WARNING:
 * This is the very foundation of the entire app. Any mistakes here will break the whole website!
 */

import type { Metadata } from "next";
import "./globals.css";
import { RootProviders } from "../providers/root-providers";
import { CustomCursor } from "../components/custom-cursor";

export const metadata: Metadata = {
  title: "Triads Future — Business Growth & Technology Partner",
  description: "We partner with growing businesses to deliver sustained growth through strategy, modern technology, and practical execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-transparent text-[var(--ink)] selection:bg-[var(--ink)] selection:text-[var(--paper)]">
        <RootProviders>
          <CustomCursor />
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
