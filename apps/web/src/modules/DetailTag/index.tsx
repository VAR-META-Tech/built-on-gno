'use client'
import { useProjects } from '@/apis'
import HeroSection from '@/components/HeroSection'
import { DEFAULT_API_RETURN } from '@/constants'
import { Card } from '@repo/ui'
import { Tag, Tooltip, TooltipProvider } from '@var-meta/ui'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

const DetailTag = () => {
  const { tag } = useParams()

  const { data: projects = DEFAULT_API_RETURN } = useProjects({
    tag_id: Number(tag),
    page_size: 10000,
  })

  const tagName = useMemo(() => {
    if (projects.data.length <= 0) return ''
    const tags = projects.data[0]?.projectTags.find(
      ({ tagId }) => Number(tagId) === Number(tag),
    )
    return tags?.tag?.name ?? ''
  }, [projects])

  return (
    <>
      <HeroSection />
      <div className="container mt-10 flex w-full justify-center gap-10 sm:mt-20 md:mt-32">
        <Card title={String(tagName)}>
          {projects.data.map((project) => (
            <TooltipProvider>
              <Tooltip
                title={
                  <h2 className="p-2 text-2xl font-bold">{project.name}</h2>
                }
                contentClassName="w-full"
                content={
                  <div className="flex w-full flex-col gap-3 p-2">
                    <div className="text-md font-normal text-gray-600">
                      {project.shortDescription}
                    </div>
                    <div className="flex w-full flex-row gap-1 overflow-hidden">
                      {project.projectTags.map(({ tag }) => (
                        <Tag size="sm" radius="xl">
                          <span className="text-nowrap p-2">{tag.name}</span>
                        </Tag>
                      ))}
                    </div>
                  </div>
                }
              >
                <Link
                  href={`/ecosystem/project/${project.id}`}
                  className="group flex cursor-pointer flex-col"
                >
                  <div className="relative z-0 h-20 w-20 rounded-full border-2">
                    <Image
                      src={project.logoUrl}
                      alt=""
                      fill
                      className="relative z-0 rounded-full object-cover"
                    />
                    <div className="absolute flex h-full w-full items-center justify-center rounded-full bg-black text-sm text-white opacity-0 transition-all duration-200 group-hover:opacity-50">
                      explore
                    </div>
                  </div>
                  <h2 className="max-w-20 overflow-hidden text-ellipsis text-nowrap text-lg font-semibold">
                    {project.name}
                  </h2>
                </Link>
              </Tooltip>
            </TooltipProvider>
          ))}
        </Card>
      </div>
    </>
  )
}

export default DetailTag
