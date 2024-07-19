'use client'
import {
  Star01Icon,
  Star02Icon,
  Star03Icon,
  Star04Icon,
  Star05Icon,
  Star06Icon,
} from '@var-meta/icons'
import { ButtonProps, Button as VARButton } from '@var-meta/ui'
import clsx from 'clsx'
type Props = ButtonProps & {
  starColor?: string
}

export const Button = ({
  children,
  className,
  starColor = 'yellow',
  ...props
}: Props) => {
  return (
    <VARButton
      {...props}
      className={clsx(
        'group relative cursor-pointer bg-[#769689] transition-all duration-300 ease-in-out hover:bg-[#3e6957] hover:shadow-lg',
        className,
      )}
    >
      {children}
      <div className="absolute left-[20%] top-[20%] -z-[5] h-auto w-6 transition-all duration-1000 ease-in-out group-hover:left-[-30%] group-hover:top-[-80%] group-hover:z-[2]">
        <Star01Icon color={starColor} />
      </div>
      <div className="absolute left-[45%] top-[45%] -z-[5] h-auto w-4 transition-all duration-1000 ease-in-out group-hover:left-[10%] group-hover:top-[-20%] group-hover:z-[2]">
        <Star02Icon color={starColor} />
      </div>
      <div className="absolute left-[40%] top-[40%] -z-[5] h-auto w-4 transition-all duration-1000 ease-in-out group-hover:left-[25%] group-hover:top-[55%] group-hover:z-[2]">
        <Star03Icon color={starColor} />
      </div>
      <div className="absolute left-[40%] top-[20%] -z-[5] h-auto w-4 transition-all duration-1000 ease-in-out group-hover:left-[80%] group-hover:top-[30%] group-hover:z-[2]">
        <Star04Icon color={starColor} />
      </div>
      <div className="absolute left-[45%] top-[25%] -z-[5] h-auto w-4 transition-all duration-1000 ease-in-out group-hover:left-[115%] group-hover:top-[25%] group-hover:z-[2]">
        <Star05Icon color={starColor} />
      </div>
      <div className="absolute left-[50%] top-[5%] -z-[5] h-auto w-4 transition-all duration-1000 ease-in-out group-hover:left-[60%] group-hover:top-[5%] group-hover:z-[2]">
        <Star06Icon color={starColor} />
      </div>
    </VARButton>
  )
}
