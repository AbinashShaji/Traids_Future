/**
 * FILE: src/app/not-found.tsx
 *
 * Custom 404 screen with clean typography and line borders.
 */

import * as React from "react";
import Link from "next/link";
import { House, LayoutGrid, BriefcaseBusiness } from "lucide-react";
import { GlobalLayout } from "../components/global-layout";
import { Container } from "../components/container";

export default function NotFound() {
  return (
    <GlobalLayout>
      <section className="min-h-[calc(100svh-72px)] sm:min-h-[calc(100vh-72px)] max-h-[950px] flex flex-col justify-center py-8 sm:py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden">
        {/* Subtle Ambient Radial Glow Orb matching FinZave forensic spec */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] md:w-[800px] h-[500px] sm:h-[700px] md:h-[800px] bg-gradient-to-tr from-[#f4f4f5] to-white rounded-full blur-[100px] -z-10 opacity-60 pointer-events-none" 
          aria-hidden="true" 
        />

        <Container className="max-w-3xl text-center flex flex-col items-center gap-6 my-auto relative z-10 px-4 sm:px-6 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48]">
            Page Not Found
          </p>

          <h1 className="text-[2.25rem] min-[380px]:text-[2.75rem] min-[440px]:text-[3.25rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tighter text-[#0a0a0a] leading-[1.02]">
            <span className="block sm:inline">This page </span>
            <span className="block sm:inline">could not </span>
            <span className="block">be found</span>
          </h1>
          
          <p className="text-[#52525b] text-sm sm:text-base md:text-lg leading-relaxed max-w-md font-normal">
            The page you are looking for does not exist, was moved, or is no longer available. You can navigate back using the links below.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0a0a0a] text-white font-medium hover:bg-[#e11d48] transition-all duration-300 text-sm"
            >
              <House className="w-4 h-4 stroke-[2]" />
              <span>Return to Home</span>
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#e4e4e7] bg-white text-[#0a0a0a] font-medium hover:border-[#0a0a0a] transition-all duration-300 text-sm"
            >
              <LayoutGrid className="w-4 h-4 stroke-[2]" />
              <span>Explore Solutions</span>
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#e4e4e7] bg-white text-[#0a0a0a] font-medium hover:border-[#0a0a0a] transition-all duration-300 text-sm"
            >
              <BriefcaseBusiness className="w-4 h-4 stroke-[2]" />
              <span>See Completed Projects</span>
            </Link>
          </div>
        </Container>
      </section>
    </GlobalLayout>
  );
}
