"use server"

import { projects, getProjectBySlug as mockGetProjectBySlug, getFeaturedProjects as mockGetFeaturedProjects, type Project } from "../mock/projects";

export async function getProjects() {
  return projects;
}

export async function getProject(id: string) {
  return projects.find(p => p.id === id) || null;
}

export async function getProjectBySlug(slug: string) {
  return mockGetProjectBySlug(slug) || null;
}

export async function getFeaturedProjects() {
  return mockGetFeaturedProjects();
}

export async function createProject(_formData: FormData) {
  // Mock mode: no-op. Backend will be implemented in the next phase.
  console.log("[MOCK] createProject called — no backend connected.");
}

export async function updateProject(_id: string, _formData: FormData) {
  // Mock mode: no-op. Backend will be implemented in the next phase.
  console.log("[MOCK] updateProject called — no backend connected.");
}

export async function deleteProject(_id: string) {
  // Mock mode: no-op. Backend will be implemented in the next phase.
  console.log("[MOCK] deleteProject called — no backend connected.");
}
