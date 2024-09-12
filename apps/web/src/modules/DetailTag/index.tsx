'use client'
import { useProjects } from '@/apis'
import HeroSection from '@/modules/Home/HeroSection'
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
      <HeroSection />
      <div className="container my-10 flex w-full flex-col items-start justify-start gap-4 p-2 sm:my-20 md:my-32">
        <h3 className="text-ellipsis text-lg font-bold lg:text-2xl">
          {tagName}
        </h3>
        <div className="flex w-full flex-wrap justify-start gap-6">
          {projects.data.map((project, index) => (
            <CardPreview key={project.id} {...project} index={index}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default DetailTag
