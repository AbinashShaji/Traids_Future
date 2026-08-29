// @ts-nocheck
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting project migration...')

  const projects = await prisma.project.findMany()
  console.log(`Found ${projects.length} projects to migrate.`)

  for (const project of projects) {
    const narrativeSections = []

    if (project.challenge) {
      narrativeSections.push({
        title: "The Challenge",
        body: project.challenge
      })
    }

    if (project.strategy) {
      narrativeSections.push({
        title: "The Strategy",
        body: project.strategy
      })
    }

    if (project.solution) {
      narrativeSections.push({
        title: "The Technical Solution",
        body: project.solution
      })
    }

    const galleryImages = (project.gallery || []).map((url) => ({
      url: url,
      caption: "",
      alt: project.title + " gallery image"
    }))

    await prisma.project.update({
      where: { id: project.id },
      data: {
        narrativeSections,
        galleryImages
      }
    })

    console.log(`Migrated project: ${project.title}`)
  }

  console.log('Migration completed successfully.')
}

main()
  .catch((e) => {
    console.error('Migration failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
