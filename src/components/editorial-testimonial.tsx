"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { type Testimonial } from "@prisma/client"
import { cn } from "../utils/cn"

export function EditorialTestimonial({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const AUTOPLAY_INTERVAL = 8000

  const handleChange = React.useCallback((index: number) => {
    if (index === active || isTransitioning) return
    setIsTransitioning(true)
    setProgress(0)
    setTimeout(() => {
      setActive(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 300)
  }, [active, isTransitioning])

  const handlePrev = React.useCallback(() => {
    const newIndex = active === 0 ? testimonials.length - 1 : active - 1
    handleChange(newIndex)
  }, [active, handleChange, testimonials.length])

  const handleNext = React.useCallback(() => {
    const newIndex = active === testimonials.length - 1 ? 0 : active + 1
    handleChange(newIndex)
  }, [active, handleChange, testimonials.length])

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      handleNext()
    }, AUTOPLAY_INTERVAL)
    
    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + (50 / AUTOPLAY_INTERVAL) * 100, 100))
    }, 50)

    return () => {
      clearInterval(timer)
      clearInterval(progressTimer)
    }
  }, [isPaused, handleNext])

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[active]

  return (
    <div 
      className="w-full max-w-4xl mx-auto py-8 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
        {/* Large index number */}
        <span
          className="text-7xl md:text-[120px] font-heading font-light leading-none text-ink/10 select-none transition-all duration-500"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 pt-2 md:pt-6">
          {/* Quote */}
          <blockquote
            className={cn(
              "text-xl md:text-[28px] font-editorial leading-relaxed text-ink tracking-tight transition-all duration-300",
              isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            )}
          >
            &ldquo;{current.review}&rdquo;
          </blockquote>

          {/* Author info with hover reveal */}
          <div
            className={cn(
              "mt-10 group cursor-default transition-all duration-300 delay-100",
              isTransitioning ? "opacity-0" : "opacity-100"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-1 ring-hairline group-hover:ring-ink/20 transition-all duration-300">
                <Image
                  src={current.photo || "/placeholder.svg"}
                  alt={current.clientName}
                  fill
                  sizes="56px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <p className="font-heading text-lg font-medium text-ink">{current.clientName}</p>
                <p className="font-sans text-sm text-graphite">
                  {current.designation}
                  <span className="mx-2 text-hairline">/</span>
                  <span className="font-semibold text-ink transition-colors duration-300">{current.company}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - horizontal line selector */}
      <div className="mt-12 md:mt-16 flex items-center justify-between border-t border-hairline pt-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button key={index} onClick={() => handleChange(index)} className="group relative py-4 outline-none" aria-label={`Go to testimonial ${index + 1}`}>
                <span
                  className={cn(
                    "block h-px transition-all duration-500 ease-out",
                    index === active
                      ? "w-12 bg-ink"
                      : "w-6 bg-ink/20 group-hover:w-8 group-hover:bg-ink/40"
                  )}
                />
              </button>
            ))}
          </div>
          <span className="font-sans text-xs text-graphite font-medium tracking-widest uppercase">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-hairline bg-paper flex items-center justify-center text-ink hover:bg-bone transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-hairline bg-paper flex items-center justify-center text-ink hover:bg-bone transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Visual Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-hairline/50 overflow-hidden">
        <motion.div 
          className="h-full bg-ink"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
        />
      </div>
    </div>
  )
}
