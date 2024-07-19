'use client'
import '@/styles/global.css'
import { Header } from '@repo/ui'
import { Footer } from '@repo/ui/src/layouts'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Karla } from 'next/font/google'

const karla = Karla({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-karla',
})

const queryClient = new QueryClient()
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body
        className={`${karla.variable} relative min-h-screen overflow-x-hidden bg-gray-100`}
      >
        <QueryClientProvider client={queryClient}>
          <>
            <Header />
            {children}
            <Footer />
          </>
        </QueryClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
