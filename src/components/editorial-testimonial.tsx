"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { type Testimonial } from "@/mock/testimonials"
import { cn } from "../utils/cn"

export function EditorialTestimonial({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0)

  const handleChange = React.useCallback((index: number) => {
    setActive(index)
  }, [])

  const handlePrev = React.useCallback(() => {
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }, [testimonials.length])

  const handleNext = React.useCallback(() => {
    setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }, [testimonials.length])

  if (!testimonials || testimonials.length === 0) return null

  const current = testimonials[active]

  return (
    <div className="w-full max-w-4xl mx-auto py-8 relative">
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
        {/* Large index number */}
        <span
          className="text-7xl md:text-[120px] font-heading font-light leading-none text-ink/10 select-none"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 pt-2 md:pt-6">
          {/* Quote */}
          <blockquote className="text-2xl md:text-3xl font-sans font-medium leading-relaxed text-ink tracking-tight">
            &ldquo;{current.review}&rdquo;
          </blockquote>

          {/* Author info */}
          <div className="mt-10 group cursor-default">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#e4e4e7]">
                <Image
                  src={current.photo || "/placeholder.svg"}
                  alt={current.clientName}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-sans text-lg font-bold text-[#0a0a0a]">{current.clientName}</p>
                <p className="font-sans text-sm text-[#71717a]">
                  {current.clientRole}
                  <span className="mx-2 text-[#e4e4e7]">/</span>
                  <span className="font-semibold text-[#0a0a0a]">{current.company}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - horizontal line selector */}
      <div className="mt-12 md:mt-16 flex items-center justify-between border-t border-[#e4e4e7] pt-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleChange(index)}
                className="group relative py-4 outline-none cursor-pointer"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <span
                  className={cn(
                    "block h-1 rounded-full transition-all duration-300",
                    index === active ? "w-12 bg-[#e11d48]" : "w-6 bg-[#0a0a0a]/15 hover:bg-[#0a0a0a]/30"
                  )}
                />
              </button>
            ))}
          </div>
          <span className="font-sans text-xs text-[#71717a] font-semibold tracking-widest uppercase">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-[#e4e4e7] bg-white flex items-center justify-center text-[#0a0a0a] hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white transition-all cursor-pointer shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-[#e4e4e7] bg-white flex items-center justify-center text-[#0a0a0a] hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white transition-all cursor-pointer shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
