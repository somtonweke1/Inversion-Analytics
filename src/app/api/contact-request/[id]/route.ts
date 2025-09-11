import { NextRequest, NextResponse } from 'next/server'
import { getContactRequest } from '@/lib/storage'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // Check if contact request exists in shared storage
    const contactRequest = getContactRequest(id)
    
    if (!contactRequest) {
      // If not found, create a mock one for demo purposes
      const mockContactRequest = {
        id: id,
        companyName: 'Demo Company',
        contactName: 'Demo User',
        contactEmail: 'demo@example.com',
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      }
      
      return NextResponse.json(mockContactRequest)
    }

    return NextResponse.json(contactRequest)

  } catch (error) {
    console.error('Error fetching contact request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
