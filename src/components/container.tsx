/**
 * FILE: src/components/container.tsx
 *
 * WHAT THIS DOES:
 * Centers page content on the screen and prevents text/cards from stretching too wide on huge monitors.
 *
 * WHERE IT IS USED:
 * - Used inside almost every section across the entire website.
 *
 * HOW IT WORKS:
 * 1. Sets a maximum width of `1400px` (`max-w-[1400px]`).
 * 2. Centers itself horizontally with automatic margins (`mx-auto`).
 * 3. Applies responsive side margins (`px-6` on phones, `px-12` on tablets, `px-16` on desktop)
 *    so text never touches the raw edges of the screen.
 * 4. `clean={true}`: Removes maximum width and padding when full-bleed layout is needed.
 *
 * BEGINNER TIP:
 * Whenever you build a new section, wrap your inner content in `<Container>` to keep it aligned!
 */

import * as React from "react";
import { cn } from "../utils/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** If true, removes max-width and side padding for full-bleed sections */
  clean?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  clean = false,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        clean ? "w-full" : "max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Container.displayName = "Container";
