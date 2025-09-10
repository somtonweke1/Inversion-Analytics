import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
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
    const totalCapitalAvoidance = reports.reduce((sum, report) => sum + report.capitalAvoidance, 0)

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

    const stats = {
      totalRequests,
      completedReports,
      pendingRequests,
      totalCapitalAvoidance,
    }

    return NextResponse.json({
      stats,
      recentReports: recentReports.map(report => ({
        id: report.id,
        companyName: report.contactRequest.companyName,
        contactName: report.contactRequest.contactName,
        projectedLifespanMonths: report.projectedLifespanMonths,
        capitalAvoidance: report.capitalAvoidance,
        generatedAt: report.generatedAt,
        pdfUrl: report.pdfUrl,
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


