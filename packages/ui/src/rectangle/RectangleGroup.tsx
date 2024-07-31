import clsx from 'clsx'
import { Rectangle } from './Rectangle'

export const RectangleGroup = ({
  className,
  srcs,
}: {
  className?: string
  srcs: string[]
}) => {
  return (
    <div className={clsx('flex items-center gap-1', className)}>
      {srcs.map((src) => (
        <Rectangle key={src} src={src} />
      ))}
    </div>
  )
}
