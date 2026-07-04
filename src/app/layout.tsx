// This file defines the RootLayout component. It is the topmost structural wrapper of the website, importing fonts, setting up SEO metadata, and wrapping the app in global context providers.
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { RootProviders } from "../providers/root-providers";

// Load Google Fonts (Inter for normal text, Outfit for big headlines) and assign them to CSS variables.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// Metadata stores SEO details like the tab title and page summary used by Google search.
export const metadata: Metadata = {
  title: "Triads Future — Business Growth & Technology Partner",
  description: "We help businesses grow through simple strategy, modern technology, and practical execution.",
};

// RootLayout is the HTML scaffolding component that wraps every page.
// Inputs: "children" (the current page content to display inside this layout).
// Outputs: Renders the absolute outer <html> and <body> tags, loading global fonts and providers.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF9F6] text-[#111111]">
        {/* RootProviders sets up client-side states (like toast alerts and device sizing context) */}
        <RootProviders>
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
