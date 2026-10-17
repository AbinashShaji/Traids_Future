"use client";

import * as React from "react";
import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { settings } from "../mock/settings";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0a0a] text-white mt-24 pt-16 pb-8 border-t border-[#18181b]">
      <div className="max-w-[1400px] mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* 1. Brand Column (Spans 2 columns) */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <BrandMark asLink variant="full" inverted className="w-[180px] sm:w-[200px]" ariaLabel="Triads Future home" />
            <p className="text-sm text-[#a1a1aa] max-w-[45ch] leading-relaxed">
              We partner with ambitious companies to build high-performance web systems, automate critical operations, and drive measurable customer acquisition.
            </p>
          </div>

          {/* 2. Navigation Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#a1a1aa]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-white transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-white transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Solutions / Capabilities Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-[#a1a1aa]">
              <li>
                <Link href="/solutions#custom-web-applications" className="hover:text-white transition-colors">
                  Custom Web Applications
                </Link>
              </li>
              <li>
                <Link href="/solutions#process-automation" className="hover:text-white transition-colors">
                  Process Automation
                </Link>
              </li>
              <li>
                <Link href="/solutions#brand-architecture" className="hover:text-white transition-colors">
                  Brand Architecture
                </Link>
              </li>
              <li>
                <Link href="/solutions#high-performance-websites" className="hover:text-white transition-colors">
                  High-Performance Websites
                </Link>
              </li>
              <li>
                <Link href="/solutions#growth-infrastructure" className="hover:text-white transition-colors">
                  Growth Infrastructure
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Company Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-[#a1a1aa]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about#faq" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-Footer Bar */}
      <div className="max-w-[1400px] mx-auto px-6 border-t border-[#27272a] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#71717a]">
        <div>&copy; {currentYear} {settings.siteName}. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <Link href="/about#faq" className="hover:text-white transition-colors">
            FAQ
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

