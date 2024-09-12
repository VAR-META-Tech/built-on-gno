'use client'
import { Footer, Header } from '@/layouts'
import '@/styles/global.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Noto_Sans } from 'next/font/google'

const noto = Noto_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-noto',
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: 1000 * 5 },
  },
})
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <head>
        <title>Built On Gno</title>
        <meta name="description" content="Built On Gno Ecosystem" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="application-name" content="BuiltOnGno" />
        <meta name="apple-mobile-web-app-title" content="BuiltOnGno" />
      </head>
      <body
        className={`${noto.variable} relative min-h-screen overflow-x-hidden bg-light`}
      >
        <ThemeProvider attribute="class" defaultTheme='light'>
          <QueryClientProvider client={queryClient}>
            <>
              <Header />
              <div className='pt-20 pb-28 bg-light dark:bg-primary h-[100vh]'>
                {children}
              </div>
              <Footer />
            </>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
