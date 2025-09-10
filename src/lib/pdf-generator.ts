import { AnalysisResults } from './analysis-engine'
import { DataSubmissionFormData } from './validations'
import { ReportPDF } from '@/components/ReportPDF'
import { put } from '@vercel/blob'

export async function generateReportPDF(
  analysisResults: AnalysisResults,
  formData: DataSubmissionFormData,
  contactRequest: { companyName: string; contactName: string; contactEmail: string }
): Promise<string> {
  try {
    // Import the PDF generation function dynamically
    const { pdf } = await import('@react-pdf/renderer')
    
    // Create the PDF buffer
    const pdfDoc = pdf(ReportPDF({ analysisResults, formData, contactRequest }))
    const pdfStream = await pdfDoc.toBlob()
    const arrayBuffer = await pdfStream.arrayBuffer()
    const pdfBuffer = Buffer.from(arrayBuffer)

    // Generate unique filename
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.pdf`

    // Upload to Vercel Blob (public read)
    const { url } = await put(`reports/${reportId}`, pdfBuffer, {
      access: 'public',
      contentType: 'application/pdf',
    })

    // Return the public Blob URL
    return url
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF report')
  }
}
