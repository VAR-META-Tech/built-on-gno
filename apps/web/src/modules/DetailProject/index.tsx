'use client'
import { CardInfo, CompareTable } from '@repo/ui'
import { CheckCircleIcon } from '@var-meta/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@var-meta/ui'
import ReactMarkDown from 'react-markdown'

const DetailProject = () => {
  const data = {
    name: 'Genius',
    virified: true,
    description: '# Hi, *Pluto*!',
    industry: ['DeFi', 'Dex'],
    displayTerm: 'DeFi',
    term: 'defi',
    tags: [
      'AMM',
      'CLMM',
      'Swaps',
      'NFT',
      'Liquidity Manager',
      'Yield Farming',
      'Yield Optimizer',
    ],
    partnerships: [
      {
        name: 'Ledgity',
        image:
          'https://img.freepik.com/free-psd/3d-nft-icon-chain_629802-28.jpg?semt=ais_user',
      },
      {
        name: 'Ledgity',
        image:
          'https://img.freepik.com/free-vector/blockchain-concept_23-2147856383.jpg?semt=ais_user',
      },
    ],
    author: 'builtongno',
    social: {
      website: 'https://defillama.com',
      twitter: 'https://twitter.com/defillama',
      git: 'https://github.com/defillama',
      discord: 'https://discord.com/invite/defillama',
      telegram: 'https://t.me/defillama',
    },
    glossary: [
      {
        name: 'DEX',
        description:
          'es, you can try us for free for 30 days. Our friendly team will work with you to get you up and running as soon as possible.',
      },
      {
        name: 'NFT',
        description:
          'Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.',
      },
    ],
  }

  var tabledata = [
    {
      name: 'Carot',
      image:
        'https://images.thedapplist.com/prod/uploads/projects/image_1694354043720_carrot.png',
      id: '1',
      art3D: true,
      cat: false,
      collection: false,
    },

    {
      name: 'dRPC',
      image:
        'https://images.thedapplist.com/prod/uploads/projects/image_1713202006632_d-rpc.jpeg',
      id: '2',
      art3D: false,
      cat: false,
      collection: true,
    },

    {
      name: 'Triangle',
      image:
        'https://images.thedapplist.com/prod/uploads/projects/image_1705493502000_triangle.jpeg',
      id: '3',
      art3D: true,
      cat: false,
      collection: true,
    },

    {
      name: 'Indexed',
      image:
        'https://images.thedapplist.com/prod/uploads/projects/image_1700824970222_indexed.jpeg',
      id: '4',
      art3D: false,
      cat: true,
      collection: true,
    },
    {
      name: 'Ucf Finance',
      image:
        'https://images.thedapplist.com/prod/uploads/projects/image_1705674839766_ucf-finance.png',
      id: '5',
      art3D: true,
      cat: false,
      collection: false,
    },
  ]
  const features = [
    {
      key: 'art3D',
      label: '3D Art',
    },
    {
      key: 'cat',
      label: 'Cat',
    },
    {
      key: 'collection',
      label: 'Collection',
    },
  ]
  return (
    <div className="container mt-12 grid w-full grid-flow-row grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-8">
        <div className="flex flex-col gap-8 rounded-xl bg-white p-8 shadow-md">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold lg:text-4xl">{data.name}</h2>
            {data.virified && <CheckCircleIcon color="green" />}
          </div>
          <ReactMarkDown>{data.description}</ReactMarkDown>
        </div>
      </div>
      <div className="col-span-12 flex w-full flex-col gap-4 lg:col-span-4">
        <CardInfo data={data} />
        <h2 className="px-4 text-3xl font-bold">Glossary</h2>
        <Accordion type="multiple">
          {data.glossary.map((item) => (
            <AccordionItem value={item.name} key={item.name}>
              <AccordionTrigger className="text-xl font-bold uppercase">
                {item.name}
              </AccordionTrigger>
              <AccordionContent>{item.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="col-span-12 flex flex-col justify-start gap-8 py-10">
        <p className="max-w-md px-4 text-3xl font-bold lg:text-5xl">
          Compare similar projects to
          <span className="text-[#312cc9]"> {data.name}</span>
        </p>
        <CompareTable data={tabledata} features={features} />
      </div>
    </div>
  )
}

export default DetailProject
