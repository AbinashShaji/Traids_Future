/**
 * FILE: src/components/image-wrapper.tsx
 *
 * WHAT THIS DOES:
 * Wraps Next.js images in a warm bone container.
 *
 * WHERE IT IS USED:
 * - Case study cover images on /work.
 * - Article thumbnails on /insights.
 * - Team photos on /about.
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
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#f4f4f5] border border-[#e4e4e7] rounded-3xl flex items-center justify-center",
        containerClassName
      )}
    >
      <div className="w-full h-full relative z-10">
        <Image
          className={cn(
            "object-cover",
            className
          )}
          src={src}
          alt={alt || ""}
          {...props}
        />
      </div>
    </div>
  );
};

ImageWrapper.displayName = "ImageWrapper";
