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
 * 1. Loads Google Font (`Outfit` for geometric sans typography).
 * 2. Injects global stylesheet (`globals.css`).
 * 3. Sets default SEO metadata (page title and search engine description).
 * 4. Mounts `<RootProviders>` (device detection + popup toaster).
 * 5. Mounts `<CustomCursor>` (the interactive mouse ring).
 * 6. Renders the active page's components inside `{children}`.
 *
 * ⚠️ BEGINNER WARNING:
 * This is the very foundation of the entire app. Any mistakes here will break the whole website!
 */

import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { RootProviders } from "../providers/root-providers";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://triadsfuture.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Triads Future — Business Growth & Technology Partner",
    template: "%s | Triads Future",
  },
  description: "We partner with growing businesses to deliver sustained growth through strategy, modern technology, and practical execution.",
  openGraph: {
    title: "Triads Future — Business Growth & Technology Partner",
    description: "We partner with growing businesses to deliver sustained growth through strategy, modern technology, and practical execution.",
    url: siteUrl,
    siteName: "Triads Future",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triads Future — Business Growth & Technology Partner",
    description: "We partner with growing businesses to deliver sustained growth through strategy, modern technology, and practical execution.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${outfit.variable} ${outfit.className}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={`${outfit.className} min-h-full flex flex-col bg-white text-[#0a0a0a] selection:bg-[#e11d48] selection:text-white`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#0a0a0a] focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#e11d48] text-xs font-semibold uppercase tracking-wider"
        >
          Skip to main content
        </a>
        <RootProviders>
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
