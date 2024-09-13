import { BreadcrumbItem, Breadcrumbs } from '@var-meta/ui'
import Link from 'next/link'
import React, { forwardRef, ReactNode } from 'react'

export interface IBreadCrumbData {
  label: string
  href: string
}

interface IBreadCrumb extends React.HTMLAttributes<HTMLOListElement> {
  data: IBreadCrumbData[]
  separator?: ReactNode
}

const BreadCrumb = forwardRef<
  React.ElementRef<typeof Breadcrumbs>,
  IBreadCrumb
>(({ data, separator = '>', ...props }, ref) => {
  return (
    <Breadcrumbs ref={ref} separator={separator} {...props}>
      {data?.map(({ label, href }, index) => {
        if (index !== data.length - 1) {
          return (
            <BreadcrumbItem key={label}>
              <Link
                className="text-primary/50 hover:text-primary/80 dark:text-white dark:text-white/50 hover:dark:text-white/80"
                href={href}
              >
                {label}
              </Link>
            </BreadcrumbItem>
          )
        }

        return (
          <BreadcrumbItem key={label}>
            <span className="text-primary dark:text-white">{label}</span>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumbs>
  )
})

BreadCrumb.displayName = 'BreadCrumb'

export default BreadCrumb
