import { ROUTES } from '@/lib/routes'
import { cn } from '@var-meta/ui'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React, { forwardRef, HTMLAttributes } from 'react'

interface ILogoProps extends HTMLAttributes<HTMLAnchorElement> {
  width?: number
  height?: number
}

const Logo = forwardRef<HTMLAnchorElement, ILogoProps>(
  ({ className, width = 42, height = 42, ...props }, ref) => {
    const { theme } = useTheme()

    return (
      <Link
        ref={ref}
        href={ROUTES.HOME}
        className={cn('flex flex-nowrap items-center', className)}
        {...props}
      >
        <span className="text-primary hidden pb-3.5 text-2xl font-bold tracking-wide sm:flex md:text-[2rem] dark:text-white">
          Built on gn
        </span>
        {theme === 'dark' ? (
          <Image
            src="/gno-light.logo.svg"
            alt=""
            width={width}
            height={height}
          />
        ) : (
          <Image src="/gno.logo.svg" alt="" width={width} height={height} />
        )}
      </Link>
    )
  },
)

Logo.displayName = 'Logo'

export default Logo
