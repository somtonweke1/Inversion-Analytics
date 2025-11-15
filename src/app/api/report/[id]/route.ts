import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('Fetching report with ID:', id)

    // Fetch the report from database
    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        contactRequest: {
          select: {
            companyName: true,
            contactName: true,
            contactEmail: true,
            status: true,
          }
        }
      }
    })

    if (!report) {
      console.log('Report not found:', id)
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    console.log('Report found:', report.id)

    // Return the report data
    return NextResponse.json({
      id: report.id,
      contactRequest: report.contactRequest,
      pdfUrl: report.pdfUrl,
      capitalAvoidance: report.capitalAvoidance,
      projectedLifespanMonths: report.projectedLifespanMonths,
      p95SafeLifeMonths: report.p95SafeLifeMonths,
      generatedAt: report.generatedAt,
    })

  } catch (error) {
    console.error('Error fetching report:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch report',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
