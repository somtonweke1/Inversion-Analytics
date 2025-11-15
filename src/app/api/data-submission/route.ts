import { NextRequest, NextResponse } from 'next/server'
import { dataSubmissionSchema } from '@/lib/validations'
import { performAnalysis } from '@/lib/analysis-engine'
import { generateReportPDF } from '@/lib/pdf-generator'
import { sendReportReadyEmail, sendAdminNotification } from '@/lib/email'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  console.log('=== DATA SUBMISSION API CALLED ===')

  try {
    const body = await request.json()
    console.log('Body received:', JSON.stringify(body).substring(0, 200))

    const { contactRequestId, formData } = body
    console.log('Contact Request ID:', contactRequestId)
    console.log('Form Data keys:', Object.keys(formData || {}))

    if (!contactRequestId) {
      return NextResponse.json(
        { error: 'Missing contactRequestId' },
        { status: 400 }
      )
    }

    if (!formData) {
      return NextResponse.json(
        { error: 'Missing formData' },
        { status: 400 }
      )
    }

    // Validate the form data
    console.log('Validating form data...')
    const validatedData = dataSubmissionSchema.parse(formData)
    console.log('Validation passed')

    // Get contact request from database
    console.log('Fetching contact request from database...')
    let contactRequest = await prisma.contactRequest.findUnique({
      where: { id: contactRequestId }
    })

    if (!contactRequest) {
      console.log('Contact request not found, creating demo one...')
      contactRequest = await prisma.contactRequest.create({
        data: {
          id: contactRequestId,
          companyName: 'Demo Company',
          contactName: 'Demo User',
          contactEmail: `demo_${Date.now()}@example.com`,
          status: 'PENDING',
        }
      })
    }

    console.log('Contact request found:', contactRequest.companyName)

    // Check if data submission already exists
    console.log('Checking for existing submission...')
    const existingSubmission = await prisma.dataSubmissionForm.findUnique({
      where: { contactRequestId }
    })

    if (existingSubmission) {
      console.log('Updating existing submission...')
      await prisma.dataSubmissionForm.update({
        where: { contactRequestId },
        data: validatedData
      })
    } else {
      console.log('Creating new submission...')
      await prisma.dataSubmissionForm.create({
        data: {
          contactRequestId,
          ...validatedData
        }
      })
    }

    console.log('Running analysis...')
    const analysisResults = performAnalysis(validatedData)
    console.log('Analysis complete:', analysisResults.projectedLifespanMonths, 'months')

    console.log('Generating PDF...')
    const pdfUrl = await generateReportPDF(analysisResults, validatedData, contactRequest)
    console.log('PDF generated:', pdfUrl)

    // Check if report exists
    console.log('Checking for existing report...')
    const existingReport = await prisma.report.findUnique({
      where: { contactRequestId }
    })

    let report
    if (existingReport) {
      console.log('Updating existing report...')
      report = await prisma.report.update({
        where: { contactRequestId },
        data: {
          pdfUrl,
          projectedLifespanMonths: analysisResults.projectedLifespanMonths,
          capitalAvoidance: analysisResults.capitalAvoidance,
          p95SafeLifeMonths: analysisResults.p95SafeLifeMonths,
          generatedAt: new Date(),
        }
      })
    } else {
      console.log('Creating new report...')
      report = await prisma.report.create({
        data: {
          contactRequestId,
          pdfUrl,
          projectedLifespanMonths: analysisResults.projectedLifespanMonths,
          capitalAvoidance: analysisResults.capitalAvoidance,
          p95SafeLifeMonths: analysisResults.p95SafeLifeMonths,
        }
      })
    }

    console.log('Updating contact request status...')
    await prisma.contactRequest.update({
      where: { id: contactRequestId },
      data: {
        status: 'REPORT_GENERATED',
        reportId: report.id
      }
    })

    // Try to send emails but don't fail if they error
    try {
      console.log('Sending notification emails...')
      const reportUrl = `${process.env.NEXTAUTH_URL || 'https://inversion.works'}/report/${report.id}`

      await sendReportReadyEmail({
        contactName: contactRequest.contactName,
        contactEmail: contactRequest.contactEmail,
        companyName: contactRequest.companyName,
        reportUrl,
        projectedLifespanMonths: analysisResults.projectedLifespanMonths,
        capitalAvoidance: analysisResults.capitalAvoidance,
        p95SafeLifeMonths: analysisResults.p95SafeLifeMonths,
      })

      await sendAdminNotification({
        companyName: contactRequest.companyName,
        contactName: contactRequest.contactName,
        contactEmail: contactRequest.contactEmail,
        reportUrl,
        projectedLifespanMonths: analysisResults.projectedLifespanMonths,
      })
    } catch (emailError) {
      console.error('Error sending emails (non-fatal):', emailError)
    }

    console.log('=== SUCCESS ===')
    return NextResponse.json({
      success: true,
      message: 'Analysis completed successfully',
      reportId: report.id,
      pdfUrl: report.pdfUrl
    })

  } catch (error) {
    console.error('=== ERROR ===')
    console.error('Error processing data submission:', error)
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('Error message:', error instanceof Error ? error.message : String(error))

    if (error instanceof Error) {
      console.error('Error stack:', error.stack)
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.constructor.name : 'Unknown'
      },
      { status: 500 }
    )
  }
}
