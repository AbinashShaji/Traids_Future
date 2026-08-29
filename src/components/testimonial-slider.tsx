"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { ImageWrapper } from "./image-wrapper";
import { type Testimonial } from "@/mock/testimonials";

const AUTOPLAY_INTERVAL = 8000;

export const TestimonialSlider: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = React.useCallback((newDirection: number) => {
    setDirection(newDirection);
    setProgress(0);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      paginate(1);
    }, AUTOPLAY_INTERVAL);
    
    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + (50 / AUTOPLAY_INTERVAL) * 100, 100));
    }, 50);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [isPaused, paginate]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div 
      className="max-w-4xl mx-auto w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative bg-paper shadow-[0_8px_40px_rgba(20,20,15,0.04)] rounded-[2px] border border-hairline overflow-hidden">
        
        {/* Main Content Area */}
        <div className="relative z-10 w-full overflow-hidden p-6 md:p-10 lg:p-12">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 250, damping: 25 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="w-full cursor-grab active:cursor-grabbing"
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 md:gap-12 items-center lg:items-start">
                
                {/* Left: The Person (High Priority) */}
                <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start shrink-0 text-center lg:text-left">
                  <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-[2px] overflow-hidden relative border border-hairline shadow-sm mb-6">
                    <ImageWrapper
                      src={testimonials[currentIndex].photo || ""}
                      alt={testimonials[currentIndex].clientName}
                      fill
                      sizes="(max-width: 1024px) 160px, 192px"
                      containerClassName="w-full h-full border-none"
                    />
                  </div>
                  <cite className="font-heading text-xl lg:text-2xl font-medium text-ink not-italic block mb-2">
                    {testimonials[currentIndex].clientName}
                  </cite>
                  <span className="font-sans text-base text-graphite block">
                    {testimonials[currentIndex].clientRole}
                  </span>
                  <span className="font-sans text-base font-semibold text-ink block mt-1">
                    {testimonials[currentIndex].company}
                  </span>
                </div>

                {/* Right: The Testimonial */}
                <div className="w-full lg:w-2/3 flex flex-col justify-center mt-4 lg:mt-0 relative">
                  <Quote className="absolute -top-8 -left-8 w-24 h-24 text-bone/60 rotate-180 -z-10 pointer-events-none" />
                  
                  <div className="flex gap-1 mb-8 justify-center lg:justify-start">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-6 h-6 fill-ink text-ink" />
                    ))}
                  </div>

                  <blockquote className="font-editorial italic text-xl md:text-2xl lg:text-[26px] leading-relaxed text-ink text-center lg:text-left">
                    &ldquo;{testimonials[currentIndex].review}&rdquo;
                  </blockquote>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation & Progress Bar Row */}
        <div className="bg-bone/40 border-t border-hairline px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-graphite">
              Client Voice
            </span>
            <span className="text-hairline">|</span>
            <span className="font-sans text-xs font-medium text-ink">
              {currentIndex + 1} / {testimonials.length}
            </span>
          </div>
          
          {testimonials.length > 1 && (
            <div className="flex gap-2">
              <button
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-full border border-hairline bg-paper flex items-center justify-center text-ink hover:bg-bone transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-full border border-hairline bg-paper flex items-center justify-center text-ink hover:bg-bone transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="h-1 bg-ink/10 w-full relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-ink"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
