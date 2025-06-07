import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from '@/providers/query-client'

const roboto = Roboto({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Apoia Dev',
  description: 'Apoia Dev é uma plataforma de apoio a desenvolvedores'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <SessionProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
          <Toaster richColors duration={3000} />
        </SessionProvider>
      </body>
    </html>
  )
}
