import clsx from 'clsx'

type Props = {
  title?: string
  children?: React.ReactNode
  className?: string
}

export const Card = ({ children, title, className }: Props) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-start justify-start gap-2 p-2',
        className,
      )}
    >
      <h3 className="text-ellipsis px-4 text-lg font-bold lg:text-2xl">
        {title}
      </h3>
      <div className="bg-primary flex flex-wrap justify-center gap-6 rounded-lg border p-6 shadow-md">
        {children}
      </div>
    </div>
  )
}
