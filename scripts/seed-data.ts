// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { PrismaClient } from '@prisma/client'
import { projects } from '../src/mock/projects'
import { articles } from '../src/mock/articles'
import { testimonials } from '../src/mock/testimonials'
import { faqs } from '../src/mock/faq'

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing existing data...')
  await prisma.project.deleteMany({})
  await prisma.blogPost.deleteMany({})
  await prisma.testimonial.deleteMany({})
  await prisma.fAQ.deleteMany({})

  console.log('Seeding Projects...')
  for (const p of projects) {
    await prisma.project.create({
      data: {
        id: p.id,
        slug: p.slug,
        title: p.title,
        clientName: p.client,
        industry: p.industry,
        summary: p.summary,
        challenge: p.challenge,
        strategy: p.strategy,
        solution: p.solution,
        results: p.results as any,
        coverImage: p.coverImage,
        gallery: p.gallery,
        tags: p.tags,
        featured: p.featured,
        testimonialId: p.testimonialId,
        published: true, // Mock data is assumed published
      }
    })
  }

  console.log('Seeding Insights (BlogPosts)...')
  for (const a of articles) {
    await prisma.blogPost.create({
      data: {
        id: a.id,
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        category: a.category,
        featuredImage: a.coverImage,
        tags: a.tags,
        readingTime: a.readingTime,
        authorName: a.author,
        authorRole: a.authorRole,
        published: true,
        publishedAt: a.publishedAt ? new Date(a.publishedAt) : new Date(),
        featured: a.featured,
      }
    })
  }

  console.log('Seeding Testimonials...')
  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: {
        id: t.id,
        clientName: t.clientName,
        designation: t.clientRole,
        company: t.company,
        review: t.review,
        photo: t.photo,
        featured: t.featured,
        published: true,
      }
    })
  }

  console.log('Seeding FAQs...')
  for (const f of faqs) {
    await prisma.fAQ.create({
      data: {
        id: f.id,
        question: f.question,
        answer: f.answer,
        category: f.category,
        displayOrder: f.displayOrder,
        published: true,
      }
    })
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
