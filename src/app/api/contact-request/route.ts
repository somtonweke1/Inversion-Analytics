import { NextRequest, NextResponse } from 'next/server'

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

    // Generate unique ID
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Return success immediately
    return NextResponse.json({
      success: true,
      message: 'Contact request created successfully',
      id: contactId,
      dataFormUrl: `https://axiom-mvp.vercel.app/data-form/${contactId}`
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
