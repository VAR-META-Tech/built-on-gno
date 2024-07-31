'use client'
import { ButtonProps, Button as VARButton } from '@var-meta/ui'
import clsx from 'clsx'

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <VARButton
      {...props}
      className={clsx(
        'group relative cursor-pointer bg-[#769689] transition-all duration-300 ease-in-out hover:bg-[#3e6957] hover:shadow-lg',
        className,
      )}
    >
      {children}
    </VARButton>
  )
}
