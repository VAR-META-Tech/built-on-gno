import * as React from 'react'
import { Moon02Icon, SunIcon } from '@var-meta/icons'
import { useAppContext } from '@/context/app.context'

export default function ToggleThemeButton() {
  const { setTheme, theme } = useAppContext()

  const handleClick = () => setTheme(theme !== 'light' ? 'light' : 'dark')

  return theme !== 'light' ? (
    <SunIcon className="h-6 w-6 cursor-pointer" onClick={handleClick} />
  ) : (
    <Moon02Icon className="h-6 w-6 cursor-pointer" onClick={handleClick} />
  )
}
