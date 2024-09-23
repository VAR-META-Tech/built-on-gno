import { GalleryVerticalEnd } from 'lucide-react'
import React, { forwardRef } from 'react'
import { cn, VStack, VStackProps } from '@var-meta/ui'

interface Props extends VStackProps {
  emptyText?: string
  textClassName?: Props['className']
}

const Empty = forwardRef<HTMLDivElement, Props>(
  ({ emptyText, className, textClassName, ...props }, ref) => {
    return (
      <VStack
        justify={'center'}
        align={'center'}
        spacing={16}
        ref={ref}
        {...props}
        className={cn('text-gray-color min-h-32 select-none', className)}
      >
        <GalleryVerticalEnd size={50} />

        <p className={textClassName}>{emptyText ?? 'No data'}</p>
      </VStack>
    )
  },
)

export default Empty
