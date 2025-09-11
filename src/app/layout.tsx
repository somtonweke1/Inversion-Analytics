import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Inversion Analytics - GAC System Optimization',
  description: 'Advanced GAC system analysis and optimization for water treatment facilities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}