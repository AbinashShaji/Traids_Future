"use server"

import { revalidatePath } from "next/cache"
import prisma from "../lib/db"

export async function getFAQs() {
  return prisma.fAQ.findMany({
    orderBy: { displayOrder: 'asc' }
  })
}

export async function getFAQ(id: string) {
  return prisma.fAQ.findUnique({
    where: { id }
  })
}

export async function createFAQ(formData: FormData) {
  const question = formData.get("question") as string
  const answer = formData.get("answer") as string
  const category = formData.get("category") as string
  const displayOrder = parseInt(formData.get("displayOrder") as string || "0")
  const published = formData.get("published") === "on"

  await prisma.fAQ.create({
    data: { question, answer, category, displayOrder, published }
  })

  revalidatePath("/dashboard/faq")
  revalidatePath("/about")
  revalidatePath("/contact")
}

export async function updateFAQ(id: string, formData: FormData) {
  const question = formData.get("question") as string
  const answer = formData.get("answer") as string
  const category = formData.get("category") as string
  const displayOrder = parseInt(formData.get("displayOrder") as string || "0")
  const published = formData.get("published") === "on"

  await prisma.fAQ.update({
    where: { id },
    data: { question, answer, category, displayOrder, published }
  })

  revalidatePath("/dashboard/faq")
  revalidatePath("/about")
  revalidatePath("/contact")
}

export async function deleteFAQ(id: string) {
  await prisma.fAQ.delete({
    where: { id }
  })

  revalidatePath("/dashboard/faq")
  revalidatePath("/about")
  revalidatePath("/contact")
}
