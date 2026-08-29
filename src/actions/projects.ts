"use server"

import { revalidatePath } from "next/cache"
import prisma from "../lib/db"

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function getProject(id: string) {
  return prisma.project.findUnique({
    where: { id }
  })
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug }
  })
}

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { featured: true, published: true },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const clientName = formData.get("clientName") as string
  const industry = formData.get("industry") as string
  const summary = formData.get("summary") as string
  const challenge = formData.get("challenge") as string
  const strategy = formData.get("strategy") as string
  const solution = formData.get("solution") as string
  const coverImage = formData.get("coverImage") as string
  const testimonialId = formData.get("testimonialId") as string
  const tags = (formData.get("tags") as string || "").split(",").map(t => t.trim()).filter(Boolean)
  const featured = formData.get("featured") === "on"
  const published = formData.get("published") === "on"

  const resultsRaw = formData.get("results") as string
  const results = resultsRaw ? JSON.parse(resultsRaw) : null
  
  const galleryRaw = formData.get("gallery") as string
  const gallery = galleryRaw ? JSON.parse(galleryRaw) : []

  const narrativeSections = []
  if (challenge) narrativeSections.push({ title: "The Challenge", body: challenge })
  if (strategy) narrativeSections.push({ title: "The Strategy", body: strategy })
  if (solution) narrativeSections.push({ title: "The Technical Solution", body: solution })

  const galleryImages = gallery.map((url: string) => ({
    url: url, caption: "", alt: title + " gallery image"
  }))

  await prisma.project.create({
    data: { title, slug, clientName, industry, summary, coverImage, testimonialId, tags, featured, published, results, narrativeSections, galleryImages }
  })

  revalidatePath("/dashboard/work")
  revalidatePath("/work")
  revalidatePath("/")
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const clientName = formData.get("clientName") as string
  const industry = formData.get("industry") as string
  const summary = formData.get("summary") as string
  const challenge = formData.get("challenge") as string
  const strategy = formData.get("strategy") as string
  const solution = formData.get("solution") as string
  const coverImage = formData.get("coverImage") as string
  const testimonialId = formData.get("testimonialId") as string
  const tags = (formData.get("tags") as string || "").split(",").map(t => t.trim()).filter(Boolean)
  const featured = formData.get("featured") === "on"
  const published = formData.get("published") === "on"

  const resultsRaw = formData.get("results") as string
  const results = resultsRaw ? JSON.parse(resultsRaw) : null
  
  const galleryRaw = formData.get("gallery") as string
  const gallery = galleryRaw ? JSON.parse(galleryRaw) : []

  const narrativeSections = []
  if (challenge) narrativeSections.push({ title: "The Challenge", body: challenge })
  if (strategy) narrativeSections.push({ title: "The Strategy", body: strategy })
  if (solution) narrativeSections.push({ title: "The Technical Solution", body: solution })

  const galleryImages = gallery.map((url: string) => ({
    url: url, caption: "", alt: title + " gallery image"
  }))

  await prisma.project.update({
    where: { id },
    data: { title, slug, clientName, industry, summary, coverImage, testimonialId, tags, featured, published, results, narrativeSections, galleryImages }
  })

  revalidatePath("/dashboard/work")
  revalidatePath("/work")
  revalidatePath("/")
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id }
  })

  revalidatePath("/dashboard/work")
  revalidatePath("/work")
  revalidatePath("/")
}
