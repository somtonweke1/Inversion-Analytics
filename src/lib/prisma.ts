import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create a simple in-memory database for immediate testing
const createInMemoryDB = () => {
  const data = {
    contactRequests: new Map(),
    dataSubmissions: new Map(),
    reports: new Map()
  }
  
  return {
    contactRequest: {
      findUnique: async ({ where }: any) => {
        const id = where.id || where.contactEmail
        return data.contactRequests.get(id) || null
      },
      create: async ({ data: newData }: any) => {
        const id = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const record = { id, ...newData, status: 'PENDING', createdAt: new Date() }
        data.contactRequests.set(id, record)
        data.contactRequests.set(newData.contactEmail, record)
        return record
      },
      update: async ({ where, data: updateData }: any) => {
        const id = where.id
        const existing = data.contactRequests.get(id)
        if (existing) {
          const updated = { ...existing, ...updateData }
          data.contactRequests.set(id, updated)
          data.contactRequests.set(existing.contactEmail, updated)
          return updated
        }
        return null
      }
    },
    dataSubmissionForm: {
      create: async ({ data: newData }: any) => {
        const id = `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const record = { id, ...newData, createdAt: new Date() }
        data.dataSubmissions.set(id, record)
        return record
      }
    },
    report: {
      create: async ({ data: newData }: any) => {
        const id = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const record = { id, ...newData, createdAt: new Date() }
        data.reports.set(id, record)
        return record
      }
    }
  }
}

// Use in-memory DB for immediate testing, fallback to Prisma if available
let prisma: any
try {
  prisma = globalForPrisma.prisma ?? new PrismaClient()
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
} catch (error) {
  console.warn('Prisma client failed, using in-memory database:', error)
  prisma = createInMemoryDB()
}

export { prisma }

