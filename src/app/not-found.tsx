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
      <section className="min-h-[calc(100vh-72px)] flex flex-col justify-center py-12 sm:py-16 md:py-20 bg-white">
        <Container className="max-w-2xl text-center flex flex-col items-center gap-6 my-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48]">
            Page Not Found
          </p>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#0a0a0a]">
            This page could not be found
          </h1>
          
          <p className="text-[#71717a] text-lg leading-relaxed max-w-md font-normal">
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
