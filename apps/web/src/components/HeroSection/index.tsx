'use client'
import { Button, Github, Rectangle } from '@repo/ui'
import { PlaneIcon } from '@var-meta/icons'
import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <div className="relative flex h-[100vh] min-h-96 w-full flex-col items-center justify-center">
      <div className="bg-primary absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808020_2px,transparent_2px),linear-gradient(to_bottom,#80808020_2px,transparent_2px)] bg-[size:128px_128px]" />
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
      </div>
    </div>
  )
}

export default HeroSection
