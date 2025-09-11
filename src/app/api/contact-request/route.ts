import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendDataFormEmail } from '@/lib/email'
import { z } from 'zod'

const contactRequestSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  contactEmail: z.string().email('Valid email is required'),
  phoneNumber: z.string().optional(),
  message: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactRequestSchema.parse(body)

    // Check if contact already exists
    const existingContact = await prisma.contactRequest.findUnique({
      where: { contactEmail: validatedData.contactEmail }
    })

    if (existingContact) {
      return NextResponse.json(
        { error: 'A request with this email already exists' },
        { status: 400 }
      )
    }

    // Create new contact request
    const contactRequest = await prisma.contactRequest.create({
      data: {
        companyName: validatedData.companyName,
        contactName: validatedData.contactName,
        contactEmail: validatedData.contactEmail,
      }
    })

    // Send email with unique link
    try {
      const dataFormUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/data-form/${contactRequest.id}`
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
      id: contactRequest.id
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
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
