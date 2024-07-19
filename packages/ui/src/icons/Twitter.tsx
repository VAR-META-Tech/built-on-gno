import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<SVGElement> & {
  width?: number
  height?: number
  color?: string
  size?: number
}

export const Twitter = ({
  className,
  size,
  height = 40,
  width = 40,
  color = 'black',
  ...props
}: Props) => {
  return (
    <svg
      width={size ?? width}
      height={size ?? height}
      viewBox="0 0 42 38"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M36.6526 3.80782H43.3995L28.6594 20.6548L46 43.5798H32.4225L21.7881 29.6759L9.61989 43.5798H2.86886L18.6349 25.56L2 3.80782H15.9222L25.5348 16.5165L36.6526 3.80782ZM34.2846 39.5414H38.0232L13.8908 7.63408H9.87892L34.2846 39.5414Z"
        fill={color}
      />
    </svg>
  )
}
