'use client'
import { useProject } from '@/apis'
import { CardInfo, Loading } from '@repo/ui'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@var-meta/ui'
import { notFound, useParams } from 'next/navigation'
import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import Compare from './Compare'

const DetailProject = () => {
  const { project } = useParams()
  const { data, isError, isLoading } = useProject(String(project))

  if (isError) {
    notFound()
  }

  if (isLoading) return <Loading />

  return (
    <div className="container grid w-full grid-flow-row grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-8">
        <div className="border-gray shadow-xs shadow-secondary flex flex-col gap-8 rounded-lg border p-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold lg:text-4xl">
              {data?.name ?? ''}
            </h2>
          </div>
          <ReactMarkDown remarkPlugins={[remarkGfm]}>
            {data?.projectDescriptions?.description ?? ''}
          </ReactMarkDown>
        </div>
      </div>
      <div className="col-span-12 flex w-full flex-col gap-6 lg:col-span-4">
        <CardInfo data={data!} />
        <h2 className="px-4 text-3xl font-bold">Glossary</h2>
        <Accordion
          type="multiple"
          divider
          defaultValue={[String(data?.glossaryProjects[0]?.id ?? '')]}
        >
          <div className='space-y-4'>
            {data?.glossaryProjects?.map(({ glossary, id }) => (
              <AccordionItem value={String(id)} key={id} className='!border !border-gray rounded-lg shadow-xs shadow-secondary'>
                <AccordionTrigger className="text-xl font-bold uppercase">
                  {glossary.name}
                </AccordionTrigger>
                <AccordionContent>{glossary.description}</AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </Accordion>
      </div>
      {(data?.projectTags.length ?? 0 > 0) ? (
        <Compare
          projectTags={data?.projectTags}
          name={data?.name}
          id={data?.id}
        />
      ) : null}
    </div>
  )
}

export default DetailProject
