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
import { Newsreader, Inter_Tight } from "next/font/google";
import "./globals.css";
import { RootProviders } from "../providers/root-providers";
import { CustomCursor } from "../components/custom-cursor";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  weight: ["400", "500"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

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
      className={`${newsreader.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F0F0EB] text-[#14140F] selection:bg-[#14140F] selection:text-[#F0F0EB]">
        <RootProviders>
          <CustomCursor />
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
