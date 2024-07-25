'use client'
import { useProject } from '@/apis'
import { CardInfo } from '@repo/ui'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@var-meta/ui'
import { notFound, useParams } from 'next/navigation'
import ReactMarkDown from 'react-markdown'
import Compare from './Compare'

const DetailProject = () => {
  const { project } = useParams()
  const { data, isError } = useProject(String(project))

  if (isError) {
    notFound()
  }

  return (
    <div className="container mt-12 grid w-full grid-flow-row grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-8">
        <div className="flex flex-col gap-8 rounded-xl bg-white p-8 shadow-md">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold lg:text-4xl">
              {data?.name ?? ''}
            </h2>
          </div>
          <ReactMarkDown>
            {data?.projectDescriptions?.description ?? ''}
          </ReactMarkDown>
        </div>
      </div>
      <div className="col-span-12 flex w-full flex-col gap-4 lg:col-span-4">
        <CardInfo data={data!} />
        <h2 className="px-4 text-3xl font-bold">Glossary</h2>
        <Accordion type="multiple">
          {data?.glossaryProjects?.map(({ glossary, id }) => (
            <AccordionItem value={String(id)} key={id}>
              <AccordionTrigger className="text-xl font-bold uppercase">
                {glossary.name}
              </AccordionTrigger>
              <AccordionContent>{glossary.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Compare compares={data?.compares} name={data?.name} />
    </div>
  )
}

export default DetailProject
