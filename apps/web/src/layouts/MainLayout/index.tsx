'use client'

import { AppContextProvider } from '@/context/app.context'
import { FCC } from '@var-meta/ui'
import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { useTheme } from 'next-themes'

const MainLayout: FCC = ({ children }) => {
  const { theme, setTheme } = useTheme()

  return (
    <AppContextProvider value={{ theme, setTheme }}>
      <Header />
      <div className="bg-light dark:bg-primary min-h-screen pt-24">
        {children}
      </div>
      <Footer />
    </AppContextProvider>
  )
}

export default MainLayout
