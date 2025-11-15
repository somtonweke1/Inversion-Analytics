import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) { // eslint-disable-line @typescript-eslint/no-unused-vars
  try {
    // Get total requests
    const totalRequests = await prisma.contactRequest.count()

    // Get completed reports
    const completedReports = await prisma.report.count()

    // Get pending requests
    const pendingRequests = await prisma.contactRequest.count({
      where: { status: 'PENDING' }
    })

    // Get total capital avoidance
    const reports = await prisma.report.findMany({
      select: { capitalAvoidance: true }
    })
    const totalCapitalAvoidance = reports.reduce((sum: number, report: any) => sum + report.capitalAvoidance, 0) // eslint-disable-line @typescript-eslint/no-explicit-any

    // Get recent reports
    const recentReports = await prisma.report.findMany({
      take: 10,
      orderBy: { generatedAt: 'desc' },
      include: {
        contactRequest: {
          select: {
            companyName: true,
            contactName: true,
          }
        }
      }
    })

    // Get project locations for map
    const projectLocations = await prisma.contactRequest.findMany({
      where: {
        AND: [
          { latitude: { not: null } },
          { longitude: { not: null } }
        ]
      },
      select: {
        id: true,
        companyName: true,
        city: true,
        state: true,
        latitude: true,
        longitude: true,
        status: true,
        report: {
          select: {
            projectedLifespanMonths: true,
            capitalAvoidance: true
          }
        }
      }
    })

    const stats = {
      totalRequests,
      completedReports,
      pendingRequests,
      totalCapitalAvoidance,
    }

    return NextResponse.json({
      stats,
      recentReports: recentReports.map((report: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
        id: report.id,
        companyName: report.contactRequest.companyName,
        contactName: report.contactRequest.contactName,
        projectedLifespanMonths: report.projectedLifespanMonths,
        capitalAvoidance: report.capitalAvoidance,
        generatedAt: report.generatedAt,
        pdfUrl: report.pdfUrl,
      })),
      projectLocations: projectLocations.map((project: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
        id: project.id,
        companyName: project.companyName,
        city: project.city,
        state: project.state,
        latitude: project.latitude!,
        longitude: project.longitude!,
        status: project.status,
        projectedLifespanMonths: project.report?.projectedLifespanMonths,
        capitalAvoidance: project.report?.capitalAvoidance
      }))
    })

  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}





