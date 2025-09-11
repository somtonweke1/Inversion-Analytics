import { NextRequest, NextResponse } from 'next/server'
import { sendDataFormEmail } from '@/lib/email'
import { z } from 'zod'

const contactRequestSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  contactEmail: z.string().email('Valid email is required'),
  phoneNumber: z.string().optional(),
  message: z.string().optional(),
})

// Simple in-memory storage for immediate testing
const contactRequests = new Map()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactRequestSchema.parse(body)

    // Generate unique ID
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Check if contact already exists (simple check)
    if (contactRequests.has(validatedData.contactEmail)) {
      return NextResponse.json(
        { error: 'A request with this email already exists' },
        { status: 400 }
      )
    }

    // Create new contact request
    const contactRequest = {
      id: contactId,
      companyName: validatedData.companyName,
      contactName: validatedData.contactName,
      contactEmail: validatedData.contactEmail,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    }

    // Store in memory
    contactRequests.set(validatedData.contactEmail, contactRequest)
    contactRequests.set(contactId, contactRequest)

    // Send email with unique link
    try {
      const dataFormUrl = `${process.env.NEXTAUTH_URL || 'https://axiom-mvp.vercel.app'}/data-form/${contactId}`
      await sendDataFormEmail({
        contactName: validatedData.contactName,
        contactEmail: validatedData.contactEmail,
        companyName: validatedData.companyName,
        dataFormUrl,
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Continue even if email fails - the contact request was created successfully
    }

    return NextResponse.json({
      success: true,
      message: 'Contact request created successfully',
      id: contactId,
      dataFormUrl: `${process.env.NEXTAUTH_URL || 'https://axiom-mvp.vercel.app'}/data-form/${contactId}`
    })

  } catch (error) {
    console.error('Error creating contact request:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
