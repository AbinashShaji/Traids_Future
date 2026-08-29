import { PrismaClient } from '@prisma/client'
import { randomBytes, scryptSync } from 'crypto'

const prisma = new PrismaClient()

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
}

async function main() {
  const adminEmail = 'admin@traidfuture.com'
  
  const existing = await prisma.admin.findUnique({ where: { email: adminEmail } })
  if (existing) {
    console.log('Admin already exists:', adminEmail)
    return
  }

  const password = 'Password123!'
  const admin = await prisma.admin.create({
    data: {
      name: 'Traid Admin',
      email: adminEmail,
      passwordHash: hashPassword(password),
    }
  })

  console.log('Created admin user:')
  console.log('Email:', admin.email)
  console.log('Password:', password)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
