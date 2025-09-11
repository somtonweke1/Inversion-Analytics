import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage (same as contact-request/route.ts)
const contactRequests = new Map()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const contactRequest = contactRequests.get(id)

    if (!contactRequest) {
      return NextResponse.json(
        { error: 'Contact request not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: contactRequest.id,
      companyName: contactRequest.companyName,
      contactName: contactRequest.contactName,
      contactEmail: contactRequest.contactEmail,
      status: contactRequest.status,
      createdAt: contactRequest.createdAt,
    })

  } catch (error) {
    console.error('Error fetching contact request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
