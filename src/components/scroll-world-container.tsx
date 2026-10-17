/**
 * FILE: src/components/scroll-world-container.tsx
 *
 * WHAT THIS DOES:
 * Section container wrapper for multi-slide pages.
 */
"use client";

import * as React from "react";

export interface SlideItem {
  id: string;
  label: string;
}

interface ScrollWorldContainerProps {
  slides?: SlideItem[];
  children: React.ReactNode;
  className?: string;
}

export const ScrollWorldContainer: React.FC<ScrollWorldContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};
