// Root layout configuring the 3-role typographic system and global providers
import type { Metadata } from "next";
import { Archivo, Newsreader, Inter_Tight } from "next/font/google";
import "./globals.css";
import { RootProviders } from "../providers/root-providers";
import { CustomCursor } from "../components/custom-cursor";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

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
      className={`${archivo.variable} ${newsreader.variable} ${interTight.variable} h-full antialiased`}
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
