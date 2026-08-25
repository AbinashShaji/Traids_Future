/**
 * FILE: src/components/image-wrapper.tsx
 *
 * WHAT THIS DOES:
 * Wraps Next.js images in a warm bone container and smoothly fades them in once downloaded.
 *
 * WHERE IT IS USED:
 * - Case study cover images on /work.
 * - Article thumbnails on /insights.
 * - Team photos on /about.
 *
 * HOW IT WORKS:
 * 1. While the image is downloading over the internet, it shows a warm bone placeholder (`bg-[#E4E3DB]`).
 * 2. When the browser finishes loading the photo (`onLoad={() => setIsLoaded(true)}`),
 *    it smoothly transitions opacity from 0% to 100% over 300 milliseconds.
 * 3. Enforces the 2px corner radius (`rounded-[2px]`) and hairline border (`border-[#DEDDD3]`).
 *
 * BEGINNER TIP:
 * This prevents images from jarringly jumping or popping onto the screen when loading!
 */
"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "../utils/cn";

export interface ImageWrapperProps extends Omit<ImageProps, "ref"> {
  containerClassName?: string;
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({
  className,
  containerClassName,
  alt,
  src,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#E4E3DB] border border-[#DEDDD3] rounded-[2px]",
        containerClassName
      )}
    >
      <div className="w-full h-full relative">
        <Image
          className={cn(
            "object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          src={src}
          alt={alt || ""}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      </div>
    </div>
  );
};

ImageWrapper.displayName = "ImageWrapper";
