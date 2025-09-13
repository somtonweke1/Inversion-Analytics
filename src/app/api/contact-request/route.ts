import { NextRequest, NextResponse } from 'next/server'
import { createContactRequest } from '@/lib/storage'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Basic validation
    if (!body.companyName || !body.contactName || !body.contactEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create contact request using shared storage
    const contactRequest = createContactRequest(body)

    // Return success with the stored data
    const baseUrl = process.env.NEXTAUTH_URL || 'https://inversion-ai.vercel.app'
    return NextResponse.json({
      success: true,
      message: 'Contact request created successfully',
      id: contactRequest.id,
      dataFormUrl: `${baseUrl}/data-form/${contactRequest.id}`
    })

  } catch (error) {
    console.error('Error creating contact request:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
