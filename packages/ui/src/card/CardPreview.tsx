import { Avatar } from '@var-meta/ui'
import Link from 'next/link'
import { IProject } from '../types'

function CardPreview({
  id,
  // projectTags,
  shortDescription,
  logoUrl,
  name,
  index,
}: IProject & { index: number }) {
  return (
    <Link href={'/ecosystem/project/' + id}>
      <div className="hover:border-gray-500/50 flex min-h-[7.25rem] gap-3 rounded-md border border-transparent bg-white dark:bg-primary-dark p-2">
        <div className="relative">
          <Avatar
            indicator="none"
            size="4xl"
            className="relative z-0"
            src={logoUrl}
          />

          <span className="z-1 bg-light dark:bg-primary absolute -bottom-[0.125rem] -right-[.25rem] flex h-6 w-6 items-center justify-center rounded-full font-bold">
            {index + 1}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold">{name}</p>
          <p className="text-gray-500 line-clamp-2">{shortDescription}</p>
        </div>
      </div>
      {/* <div className="flex w-full gap-1 overflow-hidden p-1">
        {projectTags.map((item) => (
          <div
            key={item.id}
            className="delay-50 hover:-translate-y-0.25 group transition duration-200 ease-in-out hover:scale-110"
          >
            <Tag
              size="sm"
              radius="lg"
              className="group-hover:bg-primary bg-primary/30 cursor-pointer border-gray-500 p-3"
              contentClassName="text-nowrap text-xs font-medium text-gray-300 group-hover:text-white"
            >
              {item.tag.name}
            </Tag>
          </div>
        ))}
      </div> */}
    </Link>
  )
}

export default CardPreview
