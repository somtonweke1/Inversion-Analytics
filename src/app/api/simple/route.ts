import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Simple API is working!' })
}

export async function POST() {
  return NextResponse.json({
    success: true,
    message: 'Simple POST API working!',
    id: 'contact_12345',
    dataFormUrl: 'https://inversion.works/data-form/contact_12345'
  })
}
