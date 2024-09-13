import { useTheme } from 'next-themes'
import Image from 'next/image'

import React, { forwardRef, HTMLAttributes } from 'react'

interface ILogoProps extends HTMLAttributes<HTMLAnchorElement> {
  width?: number
  height?: number
}

const LogoGno = forwardRef<HTMLAnchorElement, ILogoProps>(
  ({ className, width = 42, height = 42 }) => {
    const { theme } = useTheme()

    return (
      <>
        {theme === 'dark' ? (
          <Image
            src="/gno-light.logo.svg"
            alt=""
            width={width}
            height={height}
            className={className}
          />
        ) : (
          <Image
            src="/gno.logo.svg"
            alt=""
            width={width}
            height={height}
            className={className}
          />
        )}
      </>
    )
  },
)

LogoGno.displayName = 'LogoGno'

export default LogoGno
