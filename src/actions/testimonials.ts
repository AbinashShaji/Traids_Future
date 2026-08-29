"use server"

import { revalidatePath } from "next/cache"
import prisma from "../lib/db"

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function getTestimonial(id: string) {
  return prisma.testimonial.findUnique({
    where: { id }
  })
}

export async function getFeaturedTestimonials() {
  return prisma.testimonial.findMany({
    where: { featured: true, published: true },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createTestimonial(formData: FormData) {
  const clientName = formData.get("clientName") as string
  const designation = formData.get("designation") as string
  const company = formData.get("company") as string
  const review = formData.get("review") as string
  const photo = formData.get("photo") as string
  const rating = parseInt(formData.get("rating") as string || "5")
  const featured = formData.get("featured") === "on"
  const published = formData.get("published") === "on"

  await prisma.testimonial.create({
    data: { clientName, designation, company, review, photo, rating, featured, published }
  })

  revalidatePath("/dashboard/testimonials")
  revalidatePath("/")
  revalidatePath("/work")
}

export async function updateTestimonial(id: string, formData: FormData) {
  const clientName = formData.get("clientName") as string
  const designation = formData.get("designation") as string
  const company = formData.get("company") as string
  const review = formData.get("review") as string
  const photo = formData.get("photo") as string
  const rating = parseInt(formData.get("rating") as string || "5")
  const featured = formData.get("featured") === "on"
  const published = formData.get("published") === "on"

  await prisma.testimonial.update({
    where: { id },
    data: { clientName, designation, company, review, photo, rating, featured, published }
  })

  revalidatePath("/dashboard/testimonials")
  revalidatePath("/")
  revalidatePath("/work")
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({
    where: { id }
  })

  revalidatePath("/dashboard/testimonials")
  revalidatePath("/")
  revalidatePath("/work")
}
