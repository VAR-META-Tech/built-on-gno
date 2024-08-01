import { HStack, Tag, VStack } from '@var-meta/ui'
// eslint-disable-next-line no-redeclare
import Image from 'next/image'
import { IProject } from '../types'
import Link from 'next/link'

export const CardProject = ({
  name,
  logoUrl,
  shortDescription,
  projectTags,
  id,
}: IProject) => {
  return (
    <Link
      href={'/ecosystem/project/' + id}
      className="shadow-xs shadow-secondary flex h-full w-full cursor-pointer rounded-lg border border-gray-400 p-4"
    >
      <VStack className="gap-4">
        <HStack className="flex flex-col flex-nowrap items-start sm:flex-row">
          <div className="basics-1/3">
            <div className="relative z-[0] flex h-24 w-24 overflow-hidden rounded-full border-2 border-gray-400 md:h-28 md:w-28">
              <Image
                unoptimized
                src={logoUrl}
                alt=""
                className="relative z-[0] h-24 w-24 rounded-full transition-all delay-75 duration-300 ease-in-out hover:scale-125 md:h-28 md:w-28"
                fill
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 p-0 px-2">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-gray-300">{shortDescription}</p>
          </div>
        </HStack>
        <HStack>
          {projectTags.map((item) => (
            <div
              key={item.id}
              className="delay-50 hover:-translate-y-0.25 group transition duration-200 ease-in-out hover:scale-110"
            >
              <Tag
                size="sm"
                radius="lg"
                className="group-hover:bg-primary bg-primary/30 cursor-pointer border-gray-400 p-3"
                contentClassName="text-nowrap text-xs font-medium text-gray-300 group-hover:text-white"
              >
                {item.tag.name}
              </Tag>
            </div>
          ))}
        </HStack>
      </VStack>
    </Link>
  )
}
