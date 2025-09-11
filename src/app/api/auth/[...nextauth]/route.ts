// Temporarily disabled NextAuth to fix build
export async function GET() {
  return new Response('NextAuth disabled', { status: 501 })
}

export async function POST() {
  return new Response('NextAuth disabled', { status: 501 })
}





