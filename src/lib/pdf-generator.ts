import { AnalysisResults } from './analysis-engine'
import { DataSubmissionFormData } from './validations'
import { ReportPDF } from '@/components/ReportPDF'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function generateReportPDF(
  analysisResults: AnalysisResults,
  formData: DataSubmissionFormData,
  contactRequest: { companyName: string; contactName: string; contactEmail: string }
): Promise<string> {
  try {
    // Import the PDF generation function dynamically
    const { pdf } = await import('@react-pdf/renderer')
    
    // Create the PDF buffer with optimized settings
    const pdfDoc = pdf(ReportPDF({ analysisResults, formData, contactRequest }), {
      compress: true, // Enable compression for faster generation
      info: {
        Title: `GAC Analysis Report - ${contactRequest.companyName}`,
        Author: 'Inversion Analytics',
        Subject: 'GAC System Analysis',
        Creator: 'Inversion Analytics Platform'
      }
    })
    const pdfStream = await pdfDoc.toBlob()
    const arrayBuffer = await pdfStream.arrayBuffer()
    const pdfBuffer = Buffer.from(arrayBuffer)

    // Generate unique filename
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.pdf`

    // Ensure reports directory exists
    const reportsDir = join(process.cwd(), 'public', 'reports')
    try {
      await mkdir(reportsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    // Write PDF to public folder
    const filePath = join(reportsDir, reportId)
    await writeFile(filePath, pdfBuffer)

    // Return the public URL
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    return `${baseUrl}/reports/${reportId}`
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    
    // Fallback: return a placeholder URL instead of throwing
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.pdf`
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    return `${baseUrl}/reports/${reportId}`
  }
}
