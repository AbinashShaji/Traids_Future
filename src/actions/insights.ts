"use server"

import { revalidatePath } from "next/cache"
import prisma from "../lib/db"

export async function getInsights() {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getInsight(id: string) {
  return prisma.blogPost.findUnique({
    where: { id }
  })
}

export async function getInsightBySlug(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug }
  })
}

export async function getRelatedInsights(category: string, excludeSlug: string) {
  return prisma.blogPost.findMany({
    where: { 
      published: true, 
      category, 
      slug: { not: excludeSlug } 
    },
    take: 2,
    orderBy: { createdAt: 'desc' }
  })
}

export async function getFeaturedArticle() {
  return prisma.blogPost.findFirst({
    where: { featured: true, published: true },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createInsight(formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string
  const featuredImage = formData.get("featuredImage") as string
  const authorName = formData.get("authorName") as string
  const authorRole = formData.get("authorRole") as string
  const readingTime = parseInt(formData.get("readingTime") as string || "5")
  const tags = (formData.get("tags") as string || "").split(",").map(t => t.trim()).filter(Boolean)
  const featured = formData.get("featured") === "on"
  const published = formData.get("published") === "on"

  await prisma.blogPost.create({
    data: { title, slug, excerpt, content, category, featuredImage, authorName, authorRole, readingTime, tags, featured, published }
  })

  revalidatePath("/dashboard/insights")
  revalidatePath("/insights")
  revalidatePath("/")
}

export async function updateInsight(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string
  const featuredImage = formData.get("featuredImage") as string
  const authorName = formData.get("authorName") as string
  const authorRole = formData.get("authorRole") as string
  const readingTime = parseInt(formData.get("readingTime") as string || "5")
  const tags = (formData.get("tags") as string || "").split(",").map(t => t.trim()).filter(Boolean)
  const featured = formData.get("featured") === "on"
  const published = formData.get("published") === "on"

  await prisma.blogPost.update({
    where: { id },
    data: { title, slug, excerpt, content, category, featuredImage, authorName, authorRole, readingTime, tags, featured, published }
  })

  revalidatePath("/dashboard/insights")
  revalidatePath("/insights")
  revalidatePath("/")
}

export async function deleteInsight(id: string) {
  await prisma.blogPost.delete({
    where: { id }
  })

  revalidatePath("/dashboard/insights")
  revalidatePath("/insights")
  revalidatePath("/")
}
