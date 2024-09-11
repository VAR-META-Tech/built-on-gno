import { useTheme } from 'next-themes'
import * as React from 'react'
import { Moon02Icon, SunIcon } from '@var-meta/icons'

export default function ToggleThemeButton() {
  const { setTheme, theme } = useTheme()

  return (
    <>
      {
        theme === 'dark' ? (
          <SunIcon className="h-6 w-6 cursor-pointer" color='white' onClick={() => setTheme('light')}/>   
        ) : (
          <Moon02Icon className="h-6 w-6 cursor-pointer" color='#110F12' onClick={() => setTheme('dark')}/>
        )
      }
    </>
  )
}
