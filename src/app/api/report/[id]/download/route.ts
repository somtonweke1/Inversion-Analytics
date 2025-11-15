import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { renderToStream } from '@react-pdf/renderer'
import { ReportPDF } from '@/components/ReportPDF'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    console.log('Generating PDF for report:', id)

    // Fetch the actual report data from database
    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        contactRequest: {
          select: {
            companyName: true,
            contactName: true,
            contactEmail: true,
          }
        }
      }
    })

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    // Create mock analysis results for PDF generation
    const analysisResults = {
      projectedLifespanMonths: report.projectedLifespanMonths,
      p95SafeLifeMonths: report.p95SafeLifeMonths,
      capitalAvoidance: report.capitalAvoidance,
      keyFindings: [
        'System is performing within optimal parameters',
        'Bed life can be extended with recommended optimizations',
        'Significant cost savings available through efficiency improvements'
      ],
      capacityEstimate: 0.15,
      ebctCalculated: 15,
      removalEfficiency: 95,
      costPerMillionGallons: 250,
    }

    // Create mock form data for PDF generation
    const formData = {
      systemType: 'Fixed Bed' as const,
      vesselDiameter: 2.5,
      vesselHeight: 3.0,
      flowRate: 100,
      bedHeight: 2.0,
      vesselVolume: 15,
      bedVolume: 10,
      ebct: 6,
      toc: 5.2,
      sulfate: 45,
      chloride: 38,
      alkalinity: 120,
      hardness: 180,
      ph: 7.2,
      temperature: 15,
      pfoaConcentration: 150,
      pfosConcentration: 120,
      pfnaConcentration: 45,
      pfhxaConcentration: 30,
      pfhxsConcentration: 25,
      pfdaConcentration: 15,
      pfbsConcentration: 10,
      pfhpaConcentration: 8,
      pfundaConcentration: 5,
      pfdoaConcentration: 3,
      totalPfasConcentration: 411,
      gacType: 'Coconut Shell',
      gacDensity: 480,
      gacParticleSize: 1.5,
      gacIodineNumber: 1100,
      gacSurfaceArea: 1200,
      gacCostPerKg: 3.5,
      replacementCost: 45000,
      laborCost: 8000,
      disposalCost: 12000,
      operatingDaysPerYear: 365,
      operatingHoursPerDay: 24,
      targetRemovalEfficiency: 95,
      safetyFactor: 1.5,
    }

    // Generate PDF using React PDF renderer
    const stream = await renderToStream(
      ReportPDF({
        analysisResults,
        formData,
        contactRequest: report.contactRequest
      })
    )

    // Convert stream to buffer
    const chunks: Buffer[] = []
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk))
    }
    const buffer = Buffer.concat(chunks)

    console.log('PDF generated successfully, size:', buffer.length)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="GAC-Analysis-Report-${report.contactRequest.companyName.replace(/\s+/g, '-')}-${id}.pdf"`,
        'Cache-Control': 'no-cache',
      },
    })
    
  } catch (error) {
    console.error('Error generating report download:', error)
    return NextResponse.json(
      { error: 'Failed to generate report download' },
      { status: 500 }
    )
  }
}




