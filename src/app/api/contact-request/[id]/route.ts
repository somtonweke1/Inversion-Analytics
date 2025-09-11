import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // Return a mock contact request for any valid ID
    return NextResponse.json({
      id: id,
      companyName: 'Demo Company',
      contactName: 'Demo User',
      contactEmail: 'demo@example.com',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Error fetching contact request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
