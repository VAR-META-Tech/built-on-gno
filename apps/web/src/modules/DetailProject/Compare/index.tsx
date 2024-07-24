import {
  CompareTable,
  IProjectCompare,
  IProjectDetail,
  IProjectFeature,
} from '@repo/ui'
import { Tabs, TabsList, TabsTrigger } from '@var-meta/ui'
import { useEffect, useMemo, useState } from 'react'

const Compare = ({ compares = [], name }: Partial<IProjectDetail>) => {
  const [tabIndex, setTabIndex] = useState('')
  const [data, setData] = useState<IProjectCompare[] | undefined>([])

  useEffect(() => {
    setTabIndex(compares!.length > 0 ? String(compares![0]?.tag.id ?? '') : '')
  }, [compares])

  useEffect(() => {
    setData(compares?.find((i) => i.tag.id === Number(tabIndex))?.data)
  }, [compares, tabIndex])

  const features = useMemo(() => {
    const compareFeatures: IProjectFeature[] = []
    data?.forEach(({ projectFeatures }) => {
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
      <p className="max-w-md px-4 text-3xl font-bold lg:text-5xl">
        Compare similar projects to
        <span className="text-primary"> {name}</span>
      </p>
      <Tabs
        radius="full"
        value={tabIndex}
        onValueChange={(e) => setTabIndex(e)}
      >
        <TabsList className="max-w-sm">
          {compares?.map(({ tag }) => (
            <TabsTrigger key={tag.id} value={String(tag.id)}>
              {tag.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <CompareTable data={data ?? []} features={features} />
    </div>
  )
}

export default Compare
