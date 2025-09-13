import { NextResponse } from 'next/server'
import { getEmailStatus, getEmailInstructions } from '@/lib/email-setup'

export async function GET() {
  try {
    const status = getEmailStatus()
    const instructions = getEmailInstructions()
    
    return NextResponse.json({
      success: true,
      emailStatus: status,
      setupInstructions: instructions,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasResendKey: Boolean(process.env.RESEND_API_KEY),
        hasCustomDomain: Boolean(process.env.FROM_EMAIL),
        fromEmail: process.env.FROM_EMAIL || 'onboarding@resend.dev'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get email status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
