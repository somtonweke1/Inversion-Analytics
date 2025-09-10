import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { dataSubmissionSchema } from '@/lib/validations'
import { performAnalysis } from '@/lib/analysis-engine'
import { generateReportPDF } from '@/lib/pdf-generator'
import { sendReportReadyEmail, sendAdminNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contactRequestId, ...formData } = body

    // Validate the form data
    const validatedData = dataSubmissionSchema.parse(formData)

    // Check if contact request exists
    const contactRequest = await prisma.contactRequest.findUnique({
      where: { id: contactRequestId }
    })

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

    // Save the data submission form
    const dataSubmission = await prisma.dataSubmissionForm.create({
      data: {
        contactRequestId,
        ...validatedData,
      }
    })

    // Perform the analysis
    const analysisResults = performAnalysis(validatedData)

    // Generate the PDF report
    const pdfUrl = await generateReportPDF(analysisResults, validatedData, contactRequest)

    // Create the report record
    const report = await prisma.report.create({
      data: {
        contactRequestId,
        pdfUrl,
        projectedLifespanMonths: analysisResults.projectedLifespanMonths,
        capitalAvoidance: analysisResults.capitalAvoidance,
        p95SafeLifeMonths: analysisResults.p95SafeLifeMonths,
      }
    })

    // Update the contact request status
    await prisma.contactRequest.update({
      where: { id: contactRequestId },
      data: {
        status: 'REPORT_GENERATED',
        reportId: report.id,
      }
    })

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
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
