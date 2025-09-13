import { NextRequest, NextResponse } from 'next/server'
import { sendDataFormEmail } from '@/lib/email'
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

    const result = await sendDataFormEmail({
      contactName: contactRequest.contactName,
      contactEmail: contactRequest.contactEmail,
      companyName: contactRequest.companyName,
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
