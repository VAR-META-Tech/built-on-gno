type Props = {
  title?: string
  children?: React.ReactNode
}

export const Card = ({ children, title }: Props) => {
  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <h3 className="text-ellipsis px-4 text-lg font-bold lg:text-2xl">
        {title}
      </h3>
      <div className="flex flex-wrap gap-6 rounded-3xl bg-white p-6 shadow-lg">
        {children}
      </div>
    </div>
  )
}
