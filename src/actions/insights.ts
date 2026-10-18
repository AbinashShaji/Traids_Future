"use server"

import { articles } from "../mock/articles";

export async function getInsights() {
  return articles;
}

export async function getInsight(id: string) {
  return articles.find(a => a.id === id) || null;
}

export async function getInsightBySlug(slug: string) {
  return articles.find(a => a.slug === slug) || null;
}

export async function getRelatedInsights(category: string, excludeSlug: string) {
  return articles
    .filter(a => a.category === category && a.slug !== excludeSlug)
    .slice(0, 2);
}

export async function getFeaturedArticle() {
  return articles.find(a => a.featured) || null;
}

export async function createInsight(_formData: FormData) {
  // Mock mode: no-op. Backend will be implemented in the next phase.
  console.log("[MOCK] createInsight called — no backend connected.");
}

export async function updateInsight(_id: string, _formData: FormData) {
  // Mock mode: no-op. Backend will be implemented in the next phase.
  console.log("[MOCK] updateInsight called — no backend connected.");
}

export async function deleteInsight(_id: string) {
  // Mock mode: no-op. Backend will be implemented in the next phase.
  console.log("[MOCK] deleteInsight called — no backend connected.");
}
