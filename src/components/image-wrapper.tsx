// This file contains the ImageWrapper component. It wraps Next.js's optimized Image tags in a stylized outer box, fading the image in smoothly once it completes loading to avoid sudden shifts.
"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "../utils/cn";

// ImageWrapperProps defines custom sizing classes for the image block.
export interface ImageWrapperProps extends Omit<ImageProps, "ref"> {
  containerClassName?: string;
  animateSettle?: boolean;
}

// ImageWrapper displays a next/image Image with styled border frame guidelines.
// Inputs: "containerClassName" (styles for outer frame), "alt" (accessibility text), "src" (image URL source), and normal Image props.
// Outputs: Renders a framed <div> wrapper containing the styled <Image> component.
export const ImageWrapper: React.FC<ImageWrapperProps> = ({
  className,
  containerClassName,
  alt,
  src,
  ...props
}) => {
  // isLoaded is a React State boolean. It stays "false" until the browser finishes downloading the image, then turns "true".
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#FAF9F6] border border-[#E8E8E8] rounded-sm",
        containerClassName
      )}
    >
      <div className="w-full h-full">
        <Image
          className={cn(
            "object-cover transition-opacity duration-300",
            // If the image is fully loaded, make it fully visible (opacity-100). Otherwise, keep it hidden (opacity-0).
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          src={src}
          alt={alt || ""}
          // When the image finishes loading, trigger a state update to change isLoaded to true.
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      </div>
    </div>
  );
};

ImageWrapper.displayName = "ImageWrapper";
