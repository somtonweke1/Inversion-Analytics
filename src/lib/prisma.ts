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
      findUnique: async ({ where }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const id = where.id || where.contactEmail
        return data.contactRequests.get(id) || null
      },
      create: async ({ data: newData }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const id = newData.id || `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const record = { ...newData, id, status: newData.status || 'PENDING', createdAt: new Date() }
        data.contactRequests.set(id, record)
        if (newData.contactEmail) {
          data.contactRequests.set(newData.contactEmail, record)
        }
        return record
      },
      update: async ({ where, data: updateData }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
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
      findUnique: async ({ where }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const id = where.id || where.contactRequestId
        // Search by contactRequestId
        for (const [key, value] of data.dataSubmissions.entries()) {
          if (key === id || (value as any).contactRequestId === id) { // eslint-disable-line @typescript-eslint/no-explicit-any
            return value
          }
        }
        return null
      },
      create: async ({ data: newData }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const id = newData.id || `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const record = { id, ...newData, createdAt: new Date() }
        data.dataSubmissions.set(id, record)
        // Also store by contactRequestId for easy lookup
        if (newData.contactRequestId) {
          data.dataSubmissions.set(newData.contactRequestId, record)
        }
        return record
      },
      update: async ({ where, data: updateData }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const id = where.id || where.contactRequestId
        let existing = null

        // Find the existing record
        for (const [key, value] of data.dataSubmissions.entries()) {
          if (key === id || (value as any).contactRequestId === id) { // eslint-disable-line @typescript-eslint/no-explicit-any
            existing = value
            break
          }
        }

        if (existing) {
          const updated = { ...existing, ...updateData, updatedAt: new Date() }
          data.dataSubmissions.set((existing as any).id, updated) // eslint-disable-line @typescript-eslint/no-explicit-any
          if ((existing as any).contactRequestId) { // eslint-disable-line @typescript-eslint/no-explicit-any
            data.dataSubmissions.set((existing as any).contactRequestId, updated) // eslint-disable-line @typescript-eslint/no-explicit-any
          }
          return updated
        }
        return null
      }
    },
    report: {
      findUnique: async ({ where, include }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const id = where.id || where.contactRequestId
        // Search by id or contactRequestId
        let report: any = null // eslint-disable-line @typescript-eslint/no-explicit-any
        for (const [key, value] of data.reports.entries()) {
          if (key === id || (value as any).contactRequestId === id) { // eslint-disable-line @typescript-eslint/no-explicit-any
            report = value
            break
          }
        }

        if (!report) return null

        // Handle include parameter for related data
        if (include?.contactRequest) {
          const contactRequest = data.contactRequests.get((report as any).contactRequestId) // eslint-disable-line @typescript-eslint/no-explicit-any
          return {
            ...report,
            contactRequest: contactRequest || null
          }
        }

        return report
      },
      create: async ({ data: newData }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const id = newData.id || `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const record = { id, ...newData, createdAt: new Date(), generatedAt: new Date() }
        data.reports.set(id, record)
        // Also store by contactRequestId for easy lookup
        if (newData.contactRequestId) {
          data.reports.set(newData.contactRequestId, record)
        }
        return record
      },
      update: async ({ where, data: updateData }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const id = where.id || where.contactRequestId
        let existing = null

        // Find the existing record
        for (const [key, value] of data.reports.entries()) {
          if (key === id || (value as any).contactRequestId === id) { // eslint-disable-line @typescript-eslint/no-explicit-any
            existing = value
            break
          }
        }

        if (existing) {
          const updated = { ...existing, ...updateData, updatedAt: new Date() }
          data.reports.set((existing as any).id, updated) // eslint-disable-line @typescript-eslint/no-explicit-any
          if ((existing as any).contactRequestId) { // eslint-disable-line @typescript-eslint/no-explicit-any
            data.reports.set((existing as any).contactRequestId, updated) // eslint-disable-line @typescript-eslint/no-explicit-any
          }
          return updated
        }
        return null
      }
    }
  }
}

// Create a wrapper that catches database connection errors
const createPrismaWrapper = (prismaClient: any, inMemoryDB: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  return new Proxy(prismaClient, {
    get(target, prop) {
      const original = target[prop]
      if (typeof original === 'object' && original !== null) {
        return new Proxy(original, {
          get(modelTarget, modelProp) {
            const modelMethod = modelTarget[modelProp]
            if (typeof modelMethod === 'function') {
              return async (...args: any[]) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                try {
                  return await modelMethod.apply(modelTarget, args)
                } catch (error) {
                  console.warn(`Database operation failed, falling back to in-memory: ${String(error)}`)
                  // Fall back to in-memory database
                  if (inMemoryDB[prop] && inMemoryDB[prop][modelProp]) {
                    return await inMemoryDB[prop][modelProp](...args)
                  }
                  throw error
                }
              }
            }
            return modelMethod
          }
        })
      }
      return original
    }
  })
}

// Use in-memory DB for immediate testing, fallback to Prisma if available
let prisma: any // eslint-disable-line @typescript-eslint/no-explicit-any

const inMemoryDB = createInMemoryDB()

// Try to use real Prisma client if DATABASE_URL is set
if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost')) {
  try {
    const prismaClient = globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })

    // Cache the client
    globalForPrisma.prisma = prismaClient

    // Wrap with error handling that falls back to in-memory
    prisma = createPrismaWrapper(prismaClient, inMemoryDB)
    console.log('Using Prisma Client with database (with in-memory fallback)')
  } catch (error) {
    console.warn('Prisma client initialization failed, using in-memory database:', error)
    prisma = inMemoryDB
  }
} else {
  console.log('Using in-memory database')
  prisma = inMemoryDB
}

export { prisma }

