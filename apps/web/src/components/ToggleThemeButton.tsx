import { useTheme } from 'next-themes'
import * as React from 'react'
import { Moon02Icon, SunIcon } from '@var-meta/icons'

export default function ToggleThemeButton() {
  const { setTheme, theme } = useTheme()

  const handleClick = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return theme === 'dark' ? (
    <SunIcon className="h-6 w-6 cursor-pointer" onClick={handleClick} />
  ) : (
    <Moon02Icon className="h-6 w-6 cursor-pointer" onClick={handleClick} />
  )
}
