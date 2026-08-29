/**
 * FILE: src/components/footer.tsx
 *
 * WHAT THIS DOES:
 * Renders the global footer at the bottom of every page on the website.
 *
 * WHERE IT IS USED:
 * - Mounted at the bottom of `src/components/global-layout.tsx`.
 *
 * HOW IT WORKS:
 * 1. Displays company brand mark, tagline, and mission statement.
 * 2. Displays site directory links from `footerNav` (Home, Solutions, Work, About, Insights, Contact, FAQ).
 * 3. Reads centralized contact information (office address, email, phone, social URLs) from `src/mock/settings.ts`.
 * 4. Displays dynamic copyright year (`new Date().getFullYear()`) and legal links from `legalNav` (/privacy, /terms).
 *
 * BEGINNER TIP:
 * To change company phone/email/address, edit `src/mock/settings.ts` — do not hardcode text here!
 */

import * as React from "react";
import Link from "next/link";
import { Container } from "./container";
import { Divider } from "./divider";
import { footerNav, legalNav } from "../mock/navigation";
import { settings } from "../mock/settings";
import { TriadMark } from "./triad-mark";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-transparent border-t border-hairline pt-16 pb-24 md:pb-16 mt-auto snap-end">
      <Container>
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 md:gap-8 mb-12">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <TriadMark size="sm" />
              <span className="font-heading font-bold text-lg tracking-tight text-ink">
                {settings.siteName}
              </span>
            </div>
            <p className="font-editorial text-base text-graphite max-w-sm leading-relaxed">
              {settings.tagline}. We help growing businesses scale through practical strategy, clean technology, and compounding execution.
            </p>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col gap-4">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-ink">
              Navigation
            </span>
            <ul className="flex flex-col gap-2.5 font-sans text-sm text-graphite">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-ink transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact#faq" className="hover:text-ink transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Details */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-ink">
              Contact
            </span>
            <p className="font-sans text-sm text-graphite leading-relaxed">
              Office: {settings.address}<br />
              Email: {settings.email}<br />
              Phone: {settings.phone}
            </p>
            <div className="flex gap-5 mt-2 font-sans text-sm text-graphite">
              {settings.socials.linkedin && (
                <a 
                  href={settings.socials.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-ink transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  LinkedIn
                </a>
              )}
              {settings.socials.twitter && (
                <a 
                  href={settings.socials.twitter} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-ink transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Separator rule */}
        <Divider className="mb-8" />

        {/* Copyright and Legal policies */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-graphite">
          <span>
            &copy; {currentYear} {settings.siteName}. All rights reserved.
          </span>
          <div className="flex gap-6">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-ink transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
