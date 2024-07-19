'use client'
import { useProjects, useTags } from '@/apis'
import { RectangleGroup, Search } from '@repo/ui'
import { Heading } from '@var-meta/ui'
import { useState } from 'react'

const HeroSection = () => {
  const [search, setSearch] = useState('')
  const { data: projects } = useProjects({ search })
  const { data: tags } = useTags({ search })

  const lineOne = [
    'https://images.thedapplist.com/prod/uploads/projects/image_1694354043720_carrot.png',
    'https://images.thedapplist.com/prod/uploads/projects/image_1713262925439_light.png',
    'https://images.thedapplist.com/prod/uploads/projects/image_1713202006632_d-rpc.jpeg',
  ]
  const lineTwo = [
    'https://images.thedapplist.com/prod/uploads/projects/image_1713197059581_subsquid.jpeg',
    'https://images.thedapplist.com/prod/uploads/projects/image_1709116925030_layer-zero.jpeg',
    'https://images.thedapplist.com/dev/uploads/proposals/avatar_pool-together.png',
    'https://images.thedapplist.com/prod/uploads/projects/image_1707804001192_den.jpeg',
  ]
  const lineThree = [
    'https://images.thedapplist.com/prod/uploads/projects/image_1705834562040_hopr-staking-hub.png',
    'https://images.thedapplist.com/prod/uploads/projects/image_1705674839766_ucf-finance.png',
    'https://images.thedapplist.com/prod/uploads/projects/image_1691752774323_aragon.jpeg',
    'https://images.thedapplist.com/prod/uploads/projects/image_1705493502000_triangle.jpeg',
    'https://images.thedapplist.com/prod/uploads/projects/image_1704351903210_hyperlane.jpeg',
  ]
  const lineFour = [
    'https://images.thedapplist.com/prod/uploads/projects/image_1704185409018_walletbeat-fyi.jpeg',
    'https://images.thedapplist.com/prod/uploads/projects/image_1697556638632_envio.png',
    'https://images.thedapplist.com/prod/uploads/projects/image_1701693577729_rubic.png',
    'https://images.thedapplist.com/prod/uploads/projects/image_1700824970222_indexed.jpeg',
  ]
  const lineFive = [
    'https://images.thedapplist.com/prod/uploads/projects/image_1700115379235_delegate.png',
    'https://images.thedapplist.com/prod/uploads/projects/image_1713440327185_layer-3.jpeg',
    'https://images.thedapplist.com/prod/uploads/projects/image_1698243533973_flooz.png',
  ]
  return (
    <div className="bg-primary relative flex h-[calc(50vh-64px)] min-h-96 w-full flex-col items-center justify-center">
      <div className="container flex w-full items-center justify-around">
        <Heading
          size="7xl"
          weight="semibold"
          align="center"
          className="text-white"
        >
          Built on Gno
        </Heading>
        <div className="hidden gap-1 md:flex md:flex-col">
          <RectangleGroup className="justify-start" srcs={lineOne} />
          <RectangleGroup className="justify-start" srcs={lineTwo} />
          <RectangleGroup className="justify-start" srcs={lineThree} />
          <RectangleGroup className="justify-end" srcs={lineFour} />
          <RectangleGroup className="justify-end" srcs={lineFive} />
        </div>
      </div>
      <div className={`absolute bottom-[-20px] h-fit w-full max-w-lg px-10`}>
        <Search
          onSearch={setSearch}
          search={search}
          projects={projects?.data ?? []}
          terms={tags?.data ?? []}
        />
      </div>
    </div>
  )
}

export default HeroSection
