import { Avatar } from '@var-meta/ui'
import Link from 'next/link'
import { useMemo } from 'react'

type Propjects = {
  logo: string
}

interface Props {
  title: string
  link: string
  projects: Propjects[]
}

export const Category = ({ projects, link, title }: Props) => {
  const [firstThree, lastThree] = useMemo(
    () => [projects.slice(0, 3), projects.slice(0, projects.length - 3)],
    [projects],
  )

  return (
    <Link href={link}>
      <div className="flex h-full flex-col gap-4">
        <div className="mx-2 text-lg font-bold lg:text-2xl">{title}</div>
        <div className="flex gap-1 rounded-3xl bg-white p-6 shadow-xl">
          {firstThree.map((i) => (
            <Avatar
              key={i.logo}
              indicator="none"
              radius="half"
              size="2xl"
              className="border-2"
              src={i.logo}
            />
          ))}
          {lastThree.length > 0 && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2">
              <span className="text-center text-xl text-gray-400">
                +{lastThree.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
