import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const contactRequest = await prisma.contactRequest.findUnique({
      where: { id },
      select: {
        id: true,
        companyName: true,
        contactName: true,
        contactEmail: true,
        status: true,
        createdAt: true,
      }
    })

    if (!contactRequest) {
      return NextResponse.json(
        { error: 'Contact request not found' },
        { status: 404 }
      )
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
