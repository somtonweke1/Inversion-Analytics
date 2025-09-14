import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  try {
    // Check if environment variables are set
    const hasResendKey = Boolean(process.env.RESEND_API_KEY)
    const adminEmail = process.env.ADMIN_EMAIL
    
    return NextResponse.json({
      hasResendKey,
      adminEmail,
      resendKeyPrefix: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 10) + '...' : 'Not set',
      message: hasResendKey ? 'Environment variables are configured' : 'RESEND_API_KEY is missing'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Test failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}


