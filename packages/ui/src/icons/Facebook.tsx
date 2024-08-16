import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<SVGElement> & {
  width?: number
  height?: number
  color?: string
  size?: number
}

export const Facebook = ({
  className,
  size,
  height = 40,
  width = 40,
  color = '#0866FF',
  ...props
}: Props) => {
  return (
    <svg
      width={size ?? width}
      height={size ?? height}
      viewBox={`0 0 ${size ?? width} ${size ?? height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect
        width={size ?? width}
        height={size ?? height}
        rx={size ?? width}
        fill={color}
      />
      <path
        d="M27.7852 25.7812L28.6719 20H23.125V16.25C23.125 14.668 23.8984 13.125 26.3828 13.125H28.9062V8.20312C28.9062 8.20312 26.6172 7.8125 24.4297 7.8125C19.8594 7.8125 16.875 10.582 16.875 15.5938V20H11.7969V25.7812H16.875V39.7578C17.8945 39.918 18.9375 40 20 40C21.0625 40 22.1055 39.918 23.125 39.7578V25.7812H27.7852Z"
        fill="black"
      />
    </svg>
  )
}
