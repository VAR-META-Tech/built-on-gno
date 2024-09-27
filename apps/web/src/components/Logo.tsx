import { Icons } from '@/assets/icon'
import { ROUTES } from '@/lib/routes'
import { cn } from '@var-meta/ui'
import { Link } from 'next-view-transitions'

import React, { forwardRef, HTMLAttributes, memo } from 'react'

interface ILogoProps extends HTMLAttributes<HTMLAnchorElement> {
  width?: number
  height?: number
}

const Logo = forwardRef<HTMLAnchorElement, ILogoProps>(
  ({ className, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={ROUTES.HOME}
        className={cn('flex flex-nowrap items-center', className)}
        {...props}
      >
        {/* <span className="text-primary hidden text-nowrap pb-3.5 text-2xl font-bold tracking-wide sm:flex md:text-[2rem] dark:text-white">
          Built on gno
        </span> */}
        <Icons.logo height={60} />
      </Link>
    )
  },
)

Logo.displayName = 'Logo'

export default memo(Logo)
