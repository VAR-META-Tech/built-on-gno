import { useCompareProject } from '@/apis'
import { CompareTable, IProjectDetail, IProjectFeature } from '@repo/ui'
import { Tabs, TabsList, TabsTrigger } from '@var-meta/ui'
import { useEffect, useMemo, useState } from 'react'

const Compare = ({ projectTags = [], name, id }: Partial<IProjectDetail>) => {
  const [tabIndex, setTabIndex] = useState('')

  const { data, isLoading } = useCompareProject(
    {
      project_id: Number(id),
      tag_id: Number(tabIndex),
    },
    {
      enabled: !!tabIndex && !!id,
    },
  )

  useEffect(() => {
    setTabIndex(
      projectTags!.length > 0 ? String(projectTags![0]?.tag.id ?? '') : '',
    )
  }, [projectTags])

  const features = useMemo(() => {
    const compareFeatures: IProjectFeature[] = []
    data?.data.forEach(({ projectFeatures }) => {
      projectFeatures.forEach((acc) => {
        if (
          !compareFeatures.find(({ featureId }) => featureId === acc.featureId)
        )
          compareFeatures.push(acc)
      })
    })
    return compareFeatures
  }, [data])

  return (
    <div className="col-span-12 flex flex-col justify-start gap-8 py-10">
      <p className="max-w-lg px-4 text-2xl font-bold leading-none lg:text-4xl">
        Compare similar projects to
        <span className="text-[#0059ff]"> {name}</span>
      </p>
      <Tabs radius="lg" value={tabIndex} onValueChange={(e) => setTabIndex(e)}>
        <TabsList className="w-fit">
          {projectTags?.map(({ tag }) => (
            <TabsTrigger key={tag.id} className="px-4" value={String(tag.id)}>
              {tag.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <CompareTable
        loading={isLoading}
        data={data?.data ?? []}
        features={features}
      />
    </div>
  )
}

export default Compare
