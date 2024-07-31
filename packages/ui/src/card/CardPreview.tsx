import { Tag } from '@var-meta/ui'
// eslint-disable-next-line no-redeclare
import Image from 'next/image'
import Link from 'next/link'
import { IProject } from '../types'

function CardPreview({
  id,
  projectTags,
  shortDescription,
  logoUrl,
  name,
}: IProject) {
  return (
    <Link
      href={'/ecosystem/project/' + id}
      className="shadow-xs shadow-secondary flex w-full cursor-pointer flex-col justify-between gap-2 rounded-lg border border-gray-500 p-3 md:w-[48%] lg:w-[23.6%]"
    >
      <div className="flex flex-row flex-nowrap items-start">
        <div className="basics-1/3">
          <div className="relative z-[0] flex h-20 w-20 overflow-hidden rounded-full border-2 border-gray-500">
            <Image
              src={logoUrl}
              alt=""
              className="relative z-[0] h-16 w-16 rounded-full transition-all delay-75 duration-300 ease-in-out hover:scale-125"
              fill
            />
          </div>
        </div>
        <div className="flex w-44 flex-col gap-1 p-0 px-2">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="h-full max-h-14 overflow-hidden text-ellipsis text-sm text-gray-300">
            {shortDescription}
          </p>
        </div>
      </div>
      <div className="flex w-full gap-1 overflow-hidden p-1">
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
      </div>
    </Link>
  )
}

export default CardPreview
