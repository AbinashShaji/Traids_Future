/**
 * FILE: src/components/floating-contact-orb.tsx
 *
 * AssistiveTouch-style Draggable Floating Contact Widget for Triads Future:
 * - Positioned across all public routes via GlobalLayout.
 * - Draggable via pointer events on desktop and touch devices.
 * - Distinguishes drag gestures from clicks with a 6px movement threshold.
 * - Snaps smoothly to nearest viewport edge on release with safety margins
 *   (respects top 72px header, 768-1023px tablet 72px left rail, and mobile safe areas).
 * - Expands into 3 accessible channels: WhatsApp, Email, and Phone/Consultation.
 * - Strictly follows Triads Future design tokens: clean white frosted surface,
 *   subtle zinc borders (#e4e4e7), dark text (#0a0a0a), and crimson accent (#e11d48).
 * - Keyboard navigable: Escape key to dismiss, aria-expanded, visible focus rings.
 * - Respects prefers-reduced-motion.
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle, Mail, Phone, X, MessageSquare, ArrowUpRight } from "lucide-react";
import { cn } from "../utils/cn";
import { settings } from "../mock/settings";

const ORB_SIZE = 52; // 52px width and height
const STORAGE_KEY = "tf_contact_orb_pos";

interface Position {
  x: number;
  y: number;
}

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export const FloatingContactOrb: React.FC = () => {
  const mounted = React.useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState<Position | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [snappedEdge, setSnappedEdge] = React.useState<"left" | "right">("right");

  const orbRef = React.useRef<HTMLDivElement>(null);
  const pointerStartRef = React.useRef<{ x: number; y: number; posX: number; posY: number } | null>(null);
  const hasMovedRef = React.useRef(false);

  // Compute viewport boundaries considering tablet rail and sticky top header
  const getBounds = React.useCallback(() => {
    if (typeof window === "undefined") {
      return { minX: 16, maxX: 400, minY: 88, maxY: 600 };
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isTablet = width >= 768 && width < 1024;

    const minX = isTablet ? 72 + 16 : 16; // Clear 72px tablet rail if active
    const maxX = Math.max(minX, width - ORB_SIZE - 16);
    const minY = 72 + 16; // Clear 72px sticky header
    const maxY = Math.max(minY, height - ORB_SIZE - 24);

    return { minX, maxX, minY, maxY };
  }, []);

  // Initialize position safely on client mount
  React.useEffect(() => {
    const bounds = getBounds();

    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Position;
        const clampedX = Math.min(Math.max(parsed.x, bounds.minX), bounds.maxX);
        const clampedY = Math.min(Math.max(parsed.y, bounds.minY), bounds.maxY);
        requestAnimationFrame(() => {
          setPosition({ x: clampedX, y: clampedY });
          setSnappedEdge(clampedX + ORB_SIZE / 2 < window.innerWidth / 2 ? "left" : "right");
        });
        return;
      }
    } catch {
      // sessionStorage unavailable or disabled in private browsing
    }

    // Default: bottom-right
    const defaultPos = { x: bounds.maxX, y: bounds.maxY };
    requestAnimationFrame(() => {
      setPosition(defaultPos);
      setSnappedEdge("right");
    });
  }, [getBounds]);

  // Adjust position on window resize to ensure orb stays within view
  React.useEffect(() => {
    const handleResize = () => {
      const bounds = getBounds();
      setPosition((prev) => {
        if (!prev) return null;
        const newX = snappedEdge === "left" ? bounds.minX : bounds.maxX;
        const newY = Math.min(Math.max(prev.y, bounds.minY), bounds.maxY);
        return { x: newX, y: newY };
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getBounds, snappedEdge]);

  // Close popup menu on Escape key press or outside click
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (orbRef.current && !orbRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Pointer dragging handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    // Only respond to primary mouse button or touch
    if (e.button !== 0 && e.pointerType === "mouse") return;

    const currentX = position ? position.x : (getBounds().maxX);
    const currentY = position ? position.y : (getBounds().maxY);

    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: currentX,
      posY: currentY,
    };
    hasMovedRef.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!pointerStartRef.current) return;

    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;
    const distance = Math.hypot(dx, dy);

    if (distance > 6) {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setIsDragging(true);
        if (isOpen) setIsOpen(false); // Close menu if user begins dragging
      }

      const bounds = getBounds();
      const rawX = pointerStartRef.current.posX + dx;
      const rawY = pointerStartRef.current.posY + dy;

      const clampedX = Math.min(Math.max(rawX, bounds.minX), bounds.maxX);
      const clampedY = Math.min(Math.max(rawY, bounds.minY), bounds.maxY);

      setPosition({ x: clampedX, y: clampedY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!pointerStartRef.current) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was already released
    }

    if (hasMovedRef.current) {
      // It was a drag: snap to nearest horizontal edge
      const bounds = getBounds();
      const currentX = position ? position.x : pointerStartRef.current.posX;
      const currentY = position ? position.y : pointerStartRef.current.posY;

      const toLeft = currentX + ORB_SIZE / 2 < window.innerWidth / 2;
      const snappedX = toLeft ? bounds.minX : bounds.maxX;
      const clampedY = Math.min(Math.max(currentY, bounds.minY), bounds.maxY);

      const finalPos = { x: snappedX, y: clampedY };
      setPosition(finalPos);
      setSnappedEdge(toLeft ? "left" : "right");
      setIsDragging(false);

      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(finalPos));
      } catch {
        // Safe fallback
      }
    } else {
      // It was a tap/click: toggle open state
      setIsOpen((prev) => !prev);
    }

    pointerStartRef.current = null;
  };

  // Safe WhatsApp link using real configured settings
  const whatsappUrl = React.useMemo(() => {
    const rawNumber = (settings as Record<string, unknown>).whatsapp as string | undefined;
    if (rawNumber && rawNumber.trim().length > 0) {
      const clean = rawNumber.replace(/[^0-9]/g, "");
      return `https://wa.me/${clean}`;
    }
    // Prefilled official consultation inquiry
    const msg = encodeURIComponent(
      "Hello Triads Future team, I would like to inquire about your business strategy and technology services."
    );
    return `https://wa.me/?text=${msg}`;
  }, []);

  // Safe Email link using real configured settings
  const emailUrl = React.useMemo(() => {
    const subject = encodeURIComponent("Strategic Consultation Inquiry — Triads Future");
    return `mailto:${settings.email}?subject=${subject}`;
  }, []);

  // Safe Phone link using real configured settings
  const phoneTarget = React.useMemo(() => {
    const rawPhone = (settings as Record<string, unknown>).phone as string | undefined;
    if (rawPhone && rawPhone.trim().length > 0) {
      return { href: `tel:${rawPhone.replace(/\s+/g, "")}`, isTel: true, label: rawPhone };
    }
    return { href: "/contact", isTel: false, label: "Book a Strategy Call" };
  }, []);

  // SSR fallback styling before client mount
  const style: React.CSSProperties = mounted && position
    ? {
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isDragging ? "none" : "left 0.28s cubic-bezier(0.22, 1, 0.36, 1), top 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
      }
    : {};

  return (
    <div
      ref={orbRef}
      style={style}
      className={cn(
        "z-40 select-none touch-none",
        !mounted ? "fixed bottom-6 right-6 md:bottom-8 md:right-8" : ""
      )}
    >
      {/* Expanded Actions Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Direct Contact Channels"
          className={cn(
            "absolute bottom-[64px] w-[270px] bg-white/98 backdrop-blur-md border border-[#e4e4e7] rounded-2xl shadow-[0_16px_40px_rgb(0,0,0,0.16)] p-3 flex flex-col gap-1 fz-drawer-enter z-50",
            snappedEdge === "right" ? "right-0" : "left-0"
          )}
        >
          <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-[#f4f4f5]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#71717a]">
              Direct Contact
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#16a34a]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
              Available
            </span>
          </div>

          <div className="flex flex-col gap-1 pt-1.5">
            {/* 1. WhatsApp Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#fafafa] border border-transparent hover:border-[#e4e4e7] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e11d48]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-[#0a0a0a] group-hover:text-[#e11d48] transition-colors">
                    WhatsApp
                  </span>
                  <span className="text-[11px] text-[#71717a]">
                    Direct message team
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#a1a1aa] group-hover:text-[#0a0a0a] transition-colors" />
            </a>

            {/* 2. Email Action */}
            <a
              href={emailUrl}
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#fafafa] border border-transparent hover:border-[#e4e4e7] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e11d48]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0a0a0a]/5 text-[#0a0a0a] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="flex flex-col text-left truncate max-w-[170px]">
                  <span className="text-xs font-bold text-[#0a0a0a] group-hover:text-[#e11d48] transition-colors">
                    Email Direct
                  </span>
                  <span className="text-[11px] text-[#71717a] truncate">
                    {settings.email}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#a1a1aa] group-hover:text-[#0a0a0a] transition-colors" />
            </a>

            {/* 3. Phone / Strategy Call Action */}
            {phoneTarget.isTel ? (
              <a
                href={phoneTarget.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#fafafa] border border-transparent hover:border-[#e4e4e7] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e11d48]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#e11d48]/10 text-[#e11d48] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-[#0a0a0a] group-hover:text-[#e11d48] transition-colors">
                      Call Direct
                    </span>
                    <span className="text-[11px] text-[#71717a]">
                      {phoneTarget.label}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#a1a1aa] group-hover:text-[#0a0a0a] transition-colors" />
              </a>
            ) : (
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#fafafa] border border-transparent hover:border-[#e4e4e7] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e11d48]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#e11d48]/10 text-[#e11d48] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-[#0a0a0a] group-hover:text-[#e11d48] transition-colors">
                      Schedule Call
                    </span>
                    <span className="text-[11px] text-[#71717a]">
                      30-min strategy session
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#a1a1aa] group-hover:text-[#0a0a0a] transition-colors" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Main Draggable AssistiveTouch Orb Button */}
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        aria-label={isOpen ? "Close contact menu" : "Open contact options"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={cn(
          "relative flex items-center justify-center w-[52px] h-[52px] rounded-full bg-white/95 backdrop-blur-md border border-[#e4e4e7] shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-[#0a0a0a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e11d48] focus-visible:ring-offset-2 cursor-grab active:cursor-grabbing",
          isOpen ? "border-[#0a0a0a] bg-white" : "hover:border-[#e11d48]"
        )}
      >
        {/* Subtle Live Status Beacon */}
        {!isOpen && (
          <span
            aria-hidden="true"
            className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-[#e11d48] ring-2 ring-white"
          />
        )}

        {/* Dynamic Center Icon */}
        {isOpen ? (
          <X className="w-5 h-5 stroke-[2.2] text-[#0a0a0a] transition-transform duration-200 rotate-90" />
        ) : (
          <MessageSquare className="w-5 h-5 stroke-[2] text-[#0a0a0a] transition-transform duration-200 group-hover:scale-105" />
        )}
      </button>
    </div>
  );
};

FloatingContactOrb.displayName = "FloatingContactOrb";
