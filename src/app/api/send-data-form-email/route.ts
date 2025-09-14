import { NextRequest, NextResponse } from 'next/server'
import { sendDataFormEmail } from '@/lib/email'
import { sendDataFormEmailViaSendGrid } from '@/lib/email-sendgrid'
import { getContactRequest } from '@/lib/storage'

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

    // Extract contactRequestId from dataFormUrl
    const contactRequestId = dataFormUrl.split('/').pop()
    if (!contactRequestId) {
      return NextResponse.json(
        { error: 'Invalid dataFormUrl' },
        { status: 400 }
      )
    }

    const contactRequest = getContactRequest(contactRequestId)
    
    if (!contactRequest) {
      return NextResponse.json(
        { error: 'Contact request not found' },
        { status: 404 }
      )
    }

    // Try Resend first, then fallback to SendGrid
    let result = await sendDataFormEmail({
      contactName: contactRequest.contactName,
      contactEmail: contactRequest.contactEmail,
      companyName: contactRequest.companyName,
      dataFormUrl,
    })

    // If Resend fails due to domain restrictions, try SendGrid
    if (!result.success && result.error?.includes('domain')) {
      console.log('[email] Resend failed, trying SendGrid...')
      const sendGridResult = await sendDataFormEmailViaSendGrid({
        contactName: contactRequest.contactName,
        contactEmail: contactRequest.contactEmail,
        companyName: contactRequest.companyName,
        dataFormUrl,
      })
      result = {
        success: sendGridResult.success,
        id: sendGridResult.id,
        error: sendGridResult.error,
        warning: sendGridResult.warning,
        deliveryMethod: 'fallback' as const
      }
    }
    
    return NextResponse.json({
      success: result.success,
      message: result.success ? 'Email sent successfully' : 'Email sending failed',
      emailId: result.id || 'error-skip',
      warning: result.warning,
      deliveryMethod: result.deliveryMethod || 'unknown'
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
