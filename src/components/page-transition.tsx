// This file defines the PageTransition wrapper component. It is a container that envelopes our webpage layouts to ensure clean height filling and stretch alignment during navigation.
"use client";

import * as React from "react";

// PageTransitionProps outlines the content wrapped inside the page container.
interface PageTransitionProps {
  children: React.ReactNode;
}

// PageTransition sets up a solid layout container for web pages.
// Inputs: "children" (the page elements nested inside this wrapper).
// Outputs: Renders a container <div> that takes up all available vertical space.
export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col flex-1">
      {children}
    </div>
  );
};
