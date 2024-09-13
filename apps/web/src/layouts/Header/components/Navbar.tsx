import Logo from '@/components/Logo'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ROUTES } from '@/lib/routes'
import { AlignJustifyIcon } from '@var-meta/icons'
import { cn } from '@var-meta/ui'
import Link from 'next/link'
import React from 'react'

const NavList = [
  {
    name: 'Categories',
    href: ROUTES.CATEGORIES,
  },
]

const NavItem = ({
  label,
  href,
  className,
}: {
  label: string
  href: string
  className?: string
}) => {
  return (
    <Link
      href={href}
      className={cn('w-full rounded-lg py-2.5 font-semibold', className)}
    >
      {label}
    </Link>
  )
}

const NavbarDesktop = () => {
  return (
    <nav className="hidden md:block">
      <ul className="flex gap-2">
        {NavList?.map((item) => (
          <NavItem
            key={item.name}
            label={item.name}
            href={item.href}
            className="px-4 hover:bg-gray-100 hover:dark:bg-white/10"
          />
        ))}
      </ul>
    </nav>
  )
}

const NavbarMobile = () => {
  return (
    <div className="flex items-center justify-center md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button>
            <AlignJustifyIcon width={24} height={24} />
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <Logo width={28} height={28} />
            </SheetTitle>
          </SheetHeader>
          <ul className="flex flex-col gap-2">
            {NavList?.map((item) => (
              <NavItem key={item.name} label={item.name} href={item.href} />
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export { NavbarDesktop, NavbarMobile }
