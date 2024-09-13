import { ROUTES } from '@/lib/routes'
import { cn } from '@var-meta/ui'
import Link from 'next/link'
import React, { forwardRef, HTMLAttributes } from 'react'
import LogoGno from './LogoGno'

interface ILogoProps extends HTMLAttributes<HTMLAnchorElement> {
  width?: number
  height?: number
}

const Logo = forwardRef<HTMLAnchorElement, ILogoProps>(
  ({ className, width = 42, height = 42, ...props }, ref) => {

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
        <LogoGno width={width} height={height} />
      </Link>
    )
  },
)

Logo.displayName = 'Logo'

export default Logo
