'use client'
import { ButtonProps, Button as VARButton } from '@var-meta/ui'
import clsx from 'clsx'

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <VARButton
      {...props}
      className={clsx(
        'group relative cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg',
        className,
      )}
    >
      {children}
    </VARButton>
  )
}
