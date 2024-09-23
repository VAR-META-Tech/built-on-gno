import { Icons } from '@/assets/icon'
import { useAppContext } from '@/context/app.context'

import React, { forwardRef, HTMLAttributes, useMemo } from 'react'

interface ILogoProps extends HTMLAttributes<HTMLAnchorElement> {
  width?: number
  height?: number
}

const LogoGno = forwardRef<HTMLAnchorElement, ILogoProps>(
  // eslint-disable-next-line no-unused-vars
  ({ className, width = 42, height = 42 }, ref) => {
    const { theme } = useAppContext()

    const renderIcon = useMemo(() => {
      if (theme !== 'light') {
        return <Icons.gno width={width} height={height} className={className} />
      }

      return (
        <Icons.gnoLight width={width} height={height} className={className} />
      )
    }, [theme])

    return <>{renderIcon}</>
  },
)

LogoGno.displayName = 'LogoGno'

export default LogoGno
