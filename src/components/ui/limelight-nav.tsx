/**
 * FILE: src/components/ui/limelight-nav.tsx
 *
 * WHAT THIS DOES:
 * Renders the floating "pill" navigation bar seen at the bottom of the screen on mobile devices.
 * Features a smooth sliding "limelight" indicator that glides to the active tab.
 *
 * HOW IT WORKS:
 * 1. Takes an array of `NavItem` objects (icon, label, onClick).
 * 2. Renders a fixed/sticky container (usually bottom-0 on mobile).
 * 3. Uses a React `useLayoutEffect` to calculate the exact X-coordinate of the active item 
 *    and smoothly translates the absolute positioned "limelight" div to that position.
 */

"use client";

import React, { useState, useRef, useEffect, useLayoutEffect, cloneElement } from 'react';

export type NavItem = {
  id: string | number;
  icon: React.ReactElement<{ className?: string }>;
  label?: string;
  onClick?: () => void;
};

type LimelightNavProps = {
  items: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

/**
 * An adaptive-width navigation bar with a "limelight" effect that highlights the active item.
 */
export const LimelightNav = ({
  items,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveIndex(defaultActiveIndex);
  }, [defaultActiveIndex]);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) {
    return null; 
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative flex items-center h-[calc(60px+env(safe-area-inset-bottom))] pb-safe-bottom w-full justify-around bg-[var(--paper)]/96 backdrop-blur-md border-t border-[var(--hairline)] shadow-[0_-4px_24px_rgba(20,20,15,0.04)] ${className || ''}`}>
      {items.map(({ id, icon, label, onClick }, index) => (
          <a
            key={id}
            ref={el => {
              if (navItemRefs.current) {
                navItemRefs.current[index] = el;
              }
            }}
            className={`relative z-20 flex flex-col h-full cursor-pointer items-center justify-center pt-2 pb-1 px-4 w-full ${iconContainerClassName || ''}`}
            onClick={() => handleItemClick(index, onClick)}
            aria-label={label}
          >
            {cloneElement(icon, {
              className: `w-5 h-5 stroke-[1.5] transition-colors duration-200 ease-in-out ${
                activeIndex === index ? 'text-[var(--ink)]' : 'text-[var(--graphite)] opacity-75'
              } ${icon.props.className || ''} ${iconClassName || ''}`,
            })}
            <span className={`text-[10px] font-sans mt-1 transition-colors duration-200 ${
              activeIndex === index ? 'font-semibold text-[var(--ink)]' : 'font-medium text-[var(--graphite)] opacity-75'
            }`}>
              {label}
            </span>
          </a>
      ))}

      <div 
        ref={limelightRef}
        className={`absolute top-0 z-10 w-11 h-[3px] rounded-full bg-[var(--ink)] shadow-[0_2px_8px_var(--ink)] ${
          isReady ? 'transition-[left] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]' : ''
        } ${limelightClassName || ''}`}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-40%] top-[3px] w-[180%] h-12 [clip-path:polygon(10%_100%,30%_0,70%_0,90%_100%)] bg-gradient-to-b from-[var(--ink)]/15 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};
