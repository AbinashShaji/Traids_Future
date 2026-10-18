"use server"

import { faqs } from "../mock/faq";

export async function getFAQs() {
  return faqs;
}

export async function getFAQ(id: string) {
  return faqs.find(f => f.id === id) || null;
}

export async function createFAQ(_formData: FormData) {
  // Mock mode: no-op. Backend will be implemented in the next phase.
  console.log("[MOCK] createFAQ called — no backend connected.");
}

export async function updateFAQ(_id: string, _formData: FormData) {
  // Mock mode: no-op. Backend will be implemented in the next phase.
  console.log("[MOCK] updateFAQ called — no backend connected.");
}

export async function deleteFAQ(_id: string) {
  // Mock mode: no-op. Backend will be implemented in the next phase.
  console.log("[MOCK] deleteFAQ called — no backend connected.");
}
