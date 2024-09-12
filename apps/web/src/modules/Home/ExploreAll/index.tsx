import { Button } from '@repo/ui'
import { Grid01Icon } from '@var-meta/icons'
import Link from 'next/link'

export const ExploreAll = () => {
  return (
    <div className="flex justify-center items-center max-h-[23.75rem] w-full flex-col gap-8 rounded-3xl bg-white px-8 py-16">
      <p className="text-xl font-bold lg:text-4xl">
        Explore all categories
      </p>
      <p className="text-md lg:text-lg text-center md:max-w-[50%]">
        Discover The Open Network with the help of TON App. Explore trending
        dApps, NFT collections, marketplaces, DeFi tools and much more. Go ahead
        and dive into the Web3 world!
      </p>

      <Link href={'/'}>
        <Button
          size="xl"
          variant="link"
          className="bg-secondary hover:bg-secondary/50 flex min-w-[11rem] items-center justify-center rounded-4xl font-medium text-white"
        >
          <Grid01Icon className='w-5 h-5'/>
          All categories
        </Button>
      </Link>
    </div>
  )
}
