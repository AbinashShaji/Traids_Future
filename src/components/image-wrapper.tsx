// ImageWrapper component with smooth fade-in and 2px radius.
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
      <div className="w-full h-full">
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
