import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Business Cards - Digital Business Card Creator',
  description: 'Create and share professional digital business cards with QR codes, analytics, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
