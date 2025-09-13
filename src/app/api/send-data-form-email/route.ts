import { NextRequest, NextResponse } from 'next/server'
import { sendDataFormEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { dataFormUrl, companyName } = body

    if (!dataFormUrl || !companyName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // For demo purposes, use a demo email
    // In production, you'd get this from the contact form or session
    const result = await sendDataFormEmail({
      contactName: 'Demo User',
      contactEmail: 'demo@example.com',
      companyName,
      dataFormUrl,
    })

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      emailId: result.id
    })

  } catch (error) {
    console.error('Error sending data form email:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
