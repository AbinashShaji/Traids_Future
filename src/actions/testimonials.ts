"use server"

import { testimonials, getTestimonialById, getFeaturedTestimonials as mockGetFeaturedTestimonials, type Testimonial } from "../mock/testimonials";

export async function getTestimonials() {
  return testimonials;
}

export async function getTestimonial(id: string) {
  return getTestimonialById(id) || null;
}

export async function getFeaturedTestimonials() {
  return mockGetFeaturedTestimonials();
}

export async function createTestimonial(_formData: FormData) {
  // Mock mode: no-op. Backend will be implemented in the next phase.
  console.log("[MOCK] createTestimonial called — no backend connected.");
}

export async function updateTestimonial(_id: string, _formData: FormData) {
  // Mock mode: no-op. Backend will be implemented in the next phase.
  console.log("[MOCK] updateTestimonial called — no backend connected.");
}

export async function deleteTestimonial(_id: string) {
  // Mock mode: no-op. Backend will be implemented in the next phase.
  console.log("[MOCK] deleteTestimonial called — no backend connected.");
}
