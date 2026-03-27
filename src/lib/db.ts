import { PrismaClient } from '@prisma/client'

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL is not set! Using fallback for seeding/dev.')
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

console.log('Initializing Prisma with URL:', process.env.DATABASE_URL || 'UNDEFINED')

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
