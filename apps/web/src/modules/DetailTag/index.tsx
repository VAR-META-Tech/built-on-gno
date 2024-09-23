'use client'
import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import { Loading } from '@repo/ui'
import CardPreview from '@repo/ui/src/card/CardPreview'
import { notFound, useParams } from 'next/navigation'
import { useMemo } from 'react'

const DetailTag = () => {
  const { tag } = useParams()

  const {
    data: projects = DEFAULT_API_RETURN,
    isSuccess,
    isLoading,
  } = useProjects({
    tag_id: Number(tag),
    page_size: 10000,
  })

  if (isSuccess && projects.data.length === 0) {
    notFound()
  }

  const tagName = useMemo(() => {
    if (projects.data.length <= 0) return ''
    const tags = projects.data[0]?.projectTags.find(
      ({ tagId }) => Number(tagId) === Number(tag),
    )
    return tags?.tag?.name ?? ''
  }, [projects])

  if (isLoading) return <Loading />

  return (
    <>
      {/* <HeroSection /> */}
      <div className="container flex w-full flex-col items-start justify-start gap-4 p-2">
        <h3 className="text-ellipsis text-lg font-bold lg:text-2xl">
          {tagName}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.data.map((project, index) => (
            <CardPreview key={project.id} {...project} index={index}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default DetailTag
