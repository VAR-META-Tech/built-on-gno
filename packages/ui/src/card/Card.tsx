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
        'flex flex-col items-start justify-start gap-2',
        className,
      )}
    >
      <h3 className="text-ellipsis px-4 text-lg font-bold lg:text-2xl">
        {title}
      </h3>
      <div className="flex flex-wrap justify-center gap-6 rounded-3xl bg-white p-6 shadow-lg">
        {children}
      </div>
    </div>
  )
}
