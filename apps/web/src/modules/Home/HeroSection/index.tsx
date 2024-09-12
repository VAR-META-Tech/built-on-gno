import { ROUTES } from '@/lib/routes'
import {
  Button,
  Github,
  ICategoriesResponse,
  ICategory,
  Rectangle,
} from '@repo/ui'
import { PlaneIcon } from '@var-meta/icons'
import Image from 'next/image'
import Link from 'next/link'
import {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
  useEffect,
  useState,
} from 'react'
import Slider, { Settings } from 'react-slick'

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
    setQty(defaultValue);
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
        Explore <span className="!text-secondary lowercase">{qty}</span> in GNO
        Ecosystem
      </p>

      {!!categories?.data && categories?.data?.length > 7 ? (
        <div className="py-10">
          <Slider {...settingsTab}>
            {categories?.data.map((cat) => (
              <div
                onMouseEnter={() => handleMouseEnter(cat)}
                onMouseLeave={handleMouseLeave}
                className="dark:bg-primary/70 cursor-pointer whitespace-nowrap rounded-3xl bg-[#E8E9ED] px-4 py-1 text-center transition-all hover:bg-white"
              >
                {cat.name}
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-4 py-10">
          {categories?.data.map((cat) => (
            <div
              key={cat.id}
              onMouseEnter={() => handleMouseEnter(cat)}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer whitespace-nowrap rounded-3xl bg-[#E8E9ED] px-4 py-1 text-center transition-all hover:bg-white dark:bg-[#333335]"
            >
              {cat.name}
            </div>
          ))}
        </div>
      )}

      {/* <div className="bg-primary absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808020_.125rem,transparent_.125rem),linear-gradient(to_bottom,#80808020_.125rem,transparent_.125rem)] bg-[size:8rem_8rem]" />
      <div className="absolute left-[calc(50%_-_100%_/_2)] top-0 z-10 h-[100vh] w-[100%] flex-none overflow-hidden bg-[radial-gradient(50%_50%_at_50%_0%,_rgba(0,_89,_255,_.48)_0%,_rgba(0,_89,_255,_0)_100%)]" />
      <div className="absolute bottom-[10%] hidden overflow-visible md:flex">
        <Image
          src="/gnoscan.png"
          alt=""
          width={200}
          height={20}
          className="h-full w-full"
        />
      </div>
      <div className="flex w-full flex-row items-start justify-between bg-transparent">
        <div className="relative z-0 hidden md:flex">
          <div className="absolute left-12 overflow-visible lg:left-56">
            <div className="w-0.25 mx-auto h-32 bg-gray-400"></div>
            <Rectangle src="/gno.logo.png" />
          </div>
        </div>
        <div className="container relative z-10 flex w-full flex-col items-center justify-around gap-8">
          <p className="text-center text-6xl font-medium text-white">
            <span className="text-white">Built on</span>
            <span className="inline-flex w-fit items-center text-white">
              <span className="text-white">&nbsp;Gn</span>
              <Image
                width={72}
                height={72}
                className="-mb-5"
                alt=""
                src="/gno.logo.svg"
              />
            </span>
          </p>
          <p className="max-w-screen-md text-center text-lg text-white">
            Listed below are the top crypto coins and tokens used for the
            <span className="inline-flex w-fit items-center text-white">
              <span className="text-white">&nbsp;Gn</span>
              <Image
                width={20}
                height={20}
                className="-mb-1"
                alt=""
                src="/gno.logo.svg"
              />
              <span>.land&nbsp;</span>
            </span>
            Ecosystem. They are listed in size by many contributors. We welcome
            you to contribute your projects to the system, please create a pull
            request to{' '}
            <Link
              href="https://github.com/VAR-META-Tech/built-on-gno/issues"
              target="_blank"
              className="inline-flex w-fit items-start gap-1 text-white"
            >
              <Github className="h-5 w-5" color="#0059ff" />{' '}
              <span className="text-lg text-[#0059ff]">github</span>
            </Link>{' '}
            if you have one or many projects/tools built with
            <span className="inline-flex w-fit items-center text-white">
              <span className="text-white">&nbsp;Gn</span>
              <Image
                width={20}
                height={20}
                className="-mb-1"
                alt=""
                src="/gno.logo.svg"
              />
              <span>.land.</span>
            </span>
          </p>

          <Link href="/ecosystem/project/all">
            <Button
              startIcon={<PlaneIcon />}
              radius="full"
              size="xl"
              variant="outline"
              className="bg-secondary hover:bg-primary/50 border-secondary focus:bg-primary rounded-lg text-white hover:text-white/90"
            >
              Explore all
            </Button>
          </Link>
        </div>
        <div className="relative z-0 hidden md:flex">
          <div className="absolute right-12 overflow-visible lg:right-56">
            <div className="w-0.25 mx-auto h-32 bg-gray-400"></div>
            <Rectangle src="/adena.svg" />
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default HeroSection
