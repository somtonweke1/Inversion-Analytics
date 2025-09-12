import { NextRequest, NextResponse } from 'next/server'
import { dataSubmissionSchema } from '@/lib/validations'
import { performAnalysis } from '@/lib/analysis-engine'
import { generateReportPDF } from '@/lib/pdf-generator'
import { sendReportReadyEmail, sendAdminNotification } from '@/lib/email'
import { getContactRequest, reports, contactRequests } from '@/lib/storage'

export async function POST(request: NextRequest) {
  // Set a timeout to prevent Vercel's 5-minute limit
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), 4 * 60 * 1000) // 4 minutes
  })

  try {
    const body = await request.json()
    const { contactRequestId, ...formData } = body

    // Validate the form data
    const validatedData = dataSubmissionSchema.parse(formData)

    // Check if contact request exists
    const contactRequest = getContactRequest(contactRequestId)

    if (!contactRequest) {
      return NextResponse.json(
        { error: 'Contact request not found' },
        { status: 404 }
      )
    }

    // Check if data has already been submitted
    if (contactRequest.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Data has already been submitted for this request' },
        { status: 400 }
      )
    }

    // Save the data submission form using shared storage
    // const dataSubmission = createDataSubmission(contactRequestId, validatedData)

    // Perform the analysis (with timeout protection)
    const analysisPromise = Promise.resolve(performAnalysis(validatedData))
    const analysisResults = await Promise.race([analysisPromise, timeoutPromise]) as any // eslint-disable-line @typescript-eslint/no-explicit-any

    // Generate the PDF report (with timeout protection)
    const pdfPromise = generateReportPDF(analysisResults, validatedData, contactRequest)
    const pdfUrl = await Promise.race([pdfPromise, timeoutPromise]) as string

    // Create the report record
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const report = {
      id: reportId,
      contactRequestId,
      pdfUrl,
      projectedLifespanMonths: analysisResults.projectedLifespanMonths,
      capitalAvoidance: analysisResults.capitalAvoidance,
      p95SafeLifeMonths: analysisResults.p95SafeLifeMonths,
      createdAt: new Date().toISOString()
    }
    reports.set(reportId, report)

    // Update the contact request status
    contactRequest.status = 'REPORT_GENERATED'
    contactRequest.reportId = reportId
    contactRequests.set(contactRequestId, contactRequest)

    // Send notification emails
    try {
      const reportUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/report/${report.id}`
      
      // Send email to user
      await sendReportReadyEmail({
        contactName: contactRequest.contactName,
        contactEmail: contactRequest.contactEmail,
        companyName: contactRequest.companyName,
        reportUrl,
        projectedLifespanMonths: analysisResults.projectedLifespanMonths,
        capitalAvoidance: analysisResults.capitalAvoidance,
        p95SafeLifeMonths: analysisResults.p95SafeLifeMonths,
      })

      // Send notification to admin
      await sendAdminNotification({
        companyName: contactRequest.companyName,
        contactName: contactRequest.contactName,
        contactEmail: contactRequest.contactEmail,
        reportUrl,
        projectedLifespanMonths: analysisResults.projectedLifespanMonths,
      })
    } catch (emailError) {
      console.error('Error sending notification emails:', emailError)
      // Continue even if emails fail - the analysis was completed successfully
    }

    return NextResponse.json({
      success: true,
      message: 'Analysis completed successfully',
      reportId: report.id,
      pdfUrl: report.pdfUrl
    })

  } catch (error) {
    console.error('Error processing data submission:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
      },
      { status: 500 }
    )
  }
}
