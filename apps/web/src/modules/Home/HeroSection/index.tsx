import { ROUTES } from '@/lib/routes'
import { ICategoriesResponse, ICategory } from '@repo/ui'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Slider, { Settings } from 'react-slick'
import LogoGno from '@/components/LogoGno'
import SearchInput from '@/components/SearchInput'

// interface ITab {
//   icon:
//     | ForwardRefExoticComponent<
//         SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>
//       >
//     | any
//   name: string
//   href: string
//   qty: number
// }

// const TABS: ITab[] = [
//   { icon: '', name: 'Exchanges CEX', href: ROUTES.HOME, qty: 56 },
//   { icon: '', name: 'Stacking', href: ROUTES.HOME, qty: 145 },
//   { icon: '', name: 'Wallets', href: ROUTES.HOME, qty: 30 },
//   { icon: '', name: 'Explorers', href: ROUTES.HOME, qty: 25 },
//   { icon: '', name: 'Bridges Utilities', href: ROUTES.HOME, qty: 74 },
//   { icon: '', name: 'Channels', href: ROUTES.HOME, qty: 11 },
//   { icon: '', name: 'NFT Collections', href: ROUTES.HOME, qty: 179 },
//   { icon: '', name: 'NFT Services', href: ROUTES.HOME, qty: 81 },
//   { icon: '', name: 'Chats', href: ROUTES.HOME, qty: 72 },
//   { icon: '', name: 'Social', href: ROUTES.HOME, qty: 38 },
//   { icon: '', name: 'Gambling', href: ROUTES.HOME, qty: 43 },
//   { icon: '', name: 'Jettons', href: ROUTES.HOME, qty: 78 },
//   { icon: '', name: 'Exchanges DEX', href: ROUTES.HOME, qty: 236 },
//   { icon: '', name: 'Games', href: ROUTES.HOME, qty: 2568 },
//   { icon: '', name: 'Dev Tools', href: ROUTES.HOME, qty: 18954 },
//   { icon: '', name: 'Shopping', href: ROUTES.HOME, qty: 10 },
//   { icon: '', name: 'Launchpads', href: ROUTES.HOME, qty: 2 },
// ]

const settingsTab: Settings = {
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 8.5,
  swipe: false,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 5.5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3.5,
        arrows: false,
        swipe: true,
      },
    },
  ],
}

type Props = {
  categories?: ICategoriesResponse
  totalProjects?: number
}

const HeroSection = ({ categories, totalProjects }: Props) => {
  const defaultValue = `${totalProjects} apps`
  const [qty, setQty] = useState(defaultValue)

  useEffect(() => {
    setQty(defaultValue)
  }, [totalProjects])

  const handleMouseEnter = (tab: ICategory) => {
    setQty(`${tab.name}`)
  }

  const handleMouseLeave = () => {
    setQty(defaultValue)
  }

  return (
    <div className="w-full">
      <p className="text-center text-[3rem] font-bold transition-all">
        Explore <span className="!text-secondary lowercase">{qty}</span> in
        <span className="inline-flex w-fit items-center">
          <span>&nbsp;Gn</span>
          <LogoGno className="-mb-3" />
          &nbsp;
        </span>
        Ecosystem
      </p>

      <div className="mx-auto mt-6 max-w-96">
        <SearchInput />
      </div>

      {!!categories?.data && categories?.data?.length > 7 ? (
        <div className="py-10">
          <Slider {...settingsTab}>
            {categories?.data.map((cat) => (
              <HeroTabItem
                cat={cat}
                handleMouseEnter={() => handleMouseEnter(cat)}
                handleMouseLeave={handleMouseLeave}
              />
            ))}
          </Slider>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-4 py-10">
          {categories?.data.map((cat) => (
            <HeroTabItem
              key={cat.id}
              cat={cat}
              handleMouseEnter={() => handleMouseEnter(cat)}
              handleMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default HeroSection

type HeroTabItemProps = {
  cat: ICategory
  handleMouseEnter: () => void
  handleMouseLeave: () => void
}

const HeroTabItem = ({
  cat,
  handleMouseEnter,
  handleMouseLeave,
}: HeroTabItemProps) => {
  return (
    <Link href={`${ROUTES.CATEGORY}/${cat?.id}`} key={cat?.id}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="dark:bg-primary-dark dark:hover:bg-primary-dark/35 cursor-pointer whitespace-nowrap rounded-3xl bg-[#E8E9ED] px-4 py-1 text-center transition-all hover:bg-white"
      >
        {cat.name}
      </div>
    </Link>
  )
}
