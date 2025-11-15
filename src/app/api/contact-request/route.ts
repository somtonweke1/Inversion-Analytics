import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/contact-request - Request received')

    const body = await request.json()
    console.log('Request body:', JSON.stringify(body))

    // Basic validation
    if (!body.companyName || !body.contactName || !body.contactEmail) {
      console.log('Validation failed - missing fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('Creating contact request in database...')

    // Create contact request in database
    const contactRequest = await prisma.contactRequest.create({
      data: {
        companyName: body.companyName,
        contactName: body.contactName,
        contactEmail: body.contactEmail,
        status: 'PENDING',
      }
    })

    console.log('Contact request created:', contactRequest.id)

    // Return success with the stored data
    const baseUrl = process.env.NEXTAUTH_URL || 'https://inversion.works'
    const response = {
      success: true,
      message: 'Contact request created successfully',
      id: contactRequest.id,
      dataFormUrl: `${baseUrl}/data-form/${contactRequest.id}`
    }

    console.log('Returning success response:', response)
    return NextResponse.json(response)

  } catch (error) {
    console.error('Error creating contact request:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack')

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}
