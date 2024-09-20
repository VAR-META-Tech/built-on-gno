import { useAppContext } from '@/context/app.context'
import Image from 'next/image'

import React, { forwardRef, HTMLAttributes, useMemo } from 'react'

interface ILogoProps extends HTMLAttributes<HTMLAnchorElement> {
  width?: number
  height?: number
}

const LogoGno = forwardRef<HTMLAnchorElement, ILogoProps>(
  ({ className, width = 42, height = 42 }) => {
    const { theme } = useAppContext()

    const renderIcon = useMemo(() => {
      if (theme !== 'light') {
        return (
          <Image
            src="/gno.logo.svg"
            alt=""
            width={width}
            height={height}
            className={className}
          />
        )
      }

      return (
        <Image
          src="/gno-light.logo.svg"
          alt=""
          width={width}
          height={height}
          className={className}
        />
      )
    }, [theme])

    return <>{renderIcon}</>
  },
)

LogoGno.displayName = 'LogoGno'

export default LogoGno
