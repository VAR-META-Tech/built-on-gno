import Logo from '@/components/Logo'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ROUTES } from '@/lib/routes'
import { AlignJustifyIcon, SearchLgIcon } from '@var-meta/icons'
import { CloseIcon, cn, HStack } from '@var-meta/ui'
import { Link } from 'next-view-transitions'
import React, { useState } from 'react'
import SearchModal from './SearchModal'

const NavList = [
  {
    name: 'Categories',
    href: ROUTES.CATEGORIES,
  },
  {
    name: 'Events',
    href: ROUTES.EVENTS,
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
      className={cn('w-full rounded-lg py-2.5 font-medium', className)}
    >
      {label}
    </Link>
  )
}

const NavbarDesktop = () => {
  return (
    <nav className="hidden lg:block">
      <ul className="flex gap-2">
        {NavList?.map((item) => (
          <NavItem
            key={item.name}
            label={item.name}
            href={item.href}
            className="px-4 text-black/60 transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-black active:scale-90 dark:text-white/60 hover:dark:bg-white/10 hover:dark:text-white"
          />
        ))}
      </ul>
    </nav>
  )
}

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <div className="flex items-center justify-center lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button>
            <AlignJustifyIcon width={24} height={24} />
          </button>
        </SheetTrigger>
        <SheetContent isShowCloseIcon={false}>
          <SheetHeader>
            <SheetTitle>
              <HStack pos="apart">
                <Logo width={28} height={28} />

                <HStack>
                  <SearchModal callback={handleClose}>
                    <button>
                      <SearchLgIcon width={24} height={24} />
                    </button>
                  </SearchModal>

                  <SheetClose>
                    <CloseIcon width={32} height={32} />
                  </SheetClose>
                </HStack>
              </HStack>
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
