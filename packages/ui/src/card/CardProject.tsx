import { HStack, Tag, VStack } from '@var-meta/ui'
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
      className="border-primary rounded-4xl flex h-full w-full cursor-pointer border p-4"
    >
      <VStack className="gap-4">
        <HStack className="flex flex-col flex-nowrap items-start sm:flex-row">
          <div className="basics-1/3">
            <div className="border-primary relative z-[0] flex h-24 w-24 overflow-hidden rounded-full border-2 md:h-28 md:w-28">
              <Image
                src={logoUrl}
                alt=""
                className="relative z-[0] h-24 w-24 rounded-full transition-all delay-75 duration-300 ease-in-out hover:scale-125 md:h-28 md:w-28"
                fill
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 p-0 px-2">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-gray-400">{shortDescription}</p>
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
                radius="2xl"
                className="group-hover:bg-primary bg-primary/30 cursor-pointer p-3"
                contentClassName="text-nowrap text-xs font-medium text-gray-500 group-hover:text-white"
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
