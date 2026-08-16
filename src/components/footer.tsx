// Footer component matching Design System v2 tokens and typography.
import * as React from "react";
import Link from "next/link";
import { Container } from "./container";
import { Divider } from "./divider";
import { footerNav } from "../mock/navigation";
import { TriadMark } from "./triad-mark";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#F0F0EB] border-t border-[#DEDDD3] pt-16 pb-24 md:pb-16 mt-auto">
      <Container>
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-12">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <TriadMark size="sm" />
              <span className="font-heading font-bold text-lg tracking-tight text-[#14140F]">
                Triads Future
              </span>
            </div>
            <p className="font-editorial text-base text-[#57564C] max-w-sm leading-relaxed">
              Business Growth & Technology Partner. We help growing businesses scale through practical strategy, clean technology, and compounding execution.
            </p>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col gap-4">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[#14140F]">
              Navigation
            </span>
            <ul className="flex flex-col gap-2.5 font-sans text-sm text-[#57564C]">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#14140F] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact#faq" className="hover:text-[#14140F] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Details */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[#14140F]">
              Contact
            </span>
            <p className="font-sans text-sm text-[#57564C] leading-relaxed">
              Office: 123 Editorial Boulevard, Suite 500<br />
              Email: partners@triadsfuture.com<br />
              Phone: +1 (555) 234-5678
            </p>
            <div className="flex gap-5 mt-2 font-sans text-sm text-[#57564C]">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#14140F] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-[#14140F] after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                LinkedIn
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#14140F] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-[#14140F] after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Separator rule */}
        <Divider className="mb-8" />

        {/* Copyright and Legal policies */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-[#57564C]">
          <span>
            &copy; {currentYear} Triads Future. All rights reserved.
          </span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#14140F] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#14140F] transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
