'use client'
import { Button, Github, Rectangle } from '@repo/ui'
import { PlaneIcon } from '@var-meta/icons'
import { Heading } from '@var-meta/ui'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <div className="relative flex h-[calc(100vh-64px)] min-h-96 w-full flex-col items-center justify-center">
      <div className="absolute right-1/2 top-32 overflow-visible opacity-50">
        <div className="bg-primary h-160 w-160 absolute z-[-1] overflow-hidden rounded-full mix-blend-multiply blur-2xl"></div>
      </div>
      <div className="absolute left-56 top-32 overflow-visible opacity-50">
        <div className="bg-secondary h-120 w-120 absolute z-[-1] overflow-hidden rounded-full mix-blend-multiply blur-3xl"></div>
      </div>

      <div className="flex w-full flex-row items-start justify-between">
        <div className="relative z-0 hidden md:flex">
          <div className="absolute left-12 overflow-visible lg:left-56">
            <div className="w-0.25 mx-auto mb-2 h-32 bg-gray-400"></div>
            <Rectangle src="https://images.thedapplist.com/prod/uploads/projects/image_1694354043720_carrot.png" />
          </div>
          <div className="absolute -top-16 left-4 overflow-visible lg:left-48">
            <div className="w-0.25 mx-auto mb-2 h-32 bg-gray-400"></div>
            <Rectangle src="https://images.thedapplist.com/prod/uploads/projects/image_1698243533973_flooz.png" />
          </div>
          <div className="absolute -top-32 left-20 overflow-visible lg:left-64">
            <div className="w-0.25 mx-auto mb-2 h-32 bg-gray-400"></div>
            <Rectangle src="https://images.thedapplist.com/prod/uploads/projects/image_1709116925030_layer-zero.jpeg" />
          </div>
        </div>
        <div className="container relative z-10 flex w-full flex-col items-center justify-around gap-8">
          <Heading
            size="7xl"
            weight="semibold"
            align="center"
            className="from-primary to-secondary w-fit bg-gradient-to-r bg-clip-text text-transparent"
          >
            Built on Gno
          </Heading>
          <p className="max-w-screen-md text-center text-lg">
            Listed below are the top crypto coins and tokens used for the Gnosis
            Ecosystem. They are listed in size by many contributors. We welcome
            you to contribute your projects to the system, please create a pull
            request to{' '}
            <Link
              href="https://github.com/VAR-META-Tech/built-on-gno"
              className="text-secondary inline-flex w-fit items-start gap-1"
            >
              <Github className="h-5 w-5" color="#769689" />{' '}
              <span className="text-lg">github</span>
            </Link>{' '}
            if you have one or many projects/tools built with gnosis.
          </p>

          <Link href="/ecosystem/project/all">
            <Button
              startIcon={<PlaneIcon />}
              radius="full"
              size="xl"
              color="warning"
              className="rounded-full"
            >
              Explore all
            </Button>
          </Link>
        </div>
        <div className="relative z-0 hidden md:flex">
          <div className="absolute right-12 overflow-visible lg:right-56">
            <div className="w-0.25 mx-auto mb-2 h-32 bg-gray-400"></div>
            <Rectangle src="https://images.thedapplist.com/prod/uploads/projects/image_1697556638632_envio.png" />
          </div>
          <div className="absolute -top-16 right-4 overflow-visible lg:right-48">
            <div className="w-0.25 mx-auto mb-2 h-32 bg-gray-400"></div>
            <Rectangle src="https://images.thedapplist.com/prod/uploads/projects/image_1700824970222_indexed.jpeg" />
          </div>
          <div className="absolute -top-32 right-20 overflow-visible lg:right-64">
            <div className="w-0.25 mx-auto mb-2 h-32 bg-gray-400"></div>
            <Rectangle src="https://images.thedapplist.com/prod/uploads/projects/image_1713440327185_layer-3.jpeg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
