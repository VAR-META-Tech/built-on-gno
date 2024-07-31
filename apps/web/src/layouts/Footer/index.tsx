import { Facebook, Github, LinkedIn, Twitter } from '@repo/ui'
import { Button } from '@var-meta/ui'

const Footer = () => {
  return (
    <footer className="bg-primary mt-12 flex h-auto w-full flex-col justify-center gap-8 border-b-[1px] border-t-[#ddd]">
      <div className="container grid w-full grid-cols-2 items-center gap-10 py-10">
        <div className="hidden text-white lg:col-span-1 lg:flex">
          <p className="text-3xl font-medium">Built On Gno</p>
        </div>
        <div className="col-span-2 flex flex-col items-center gap-4 lg:col-span-1 lg:items-end">
          <span className="text-xl text-white">
            Copyright © 2024 by VAR META. All Rights Reserved.
          </span>
          <div className="flex justify-center gap-2">
            <Button iconOnly variant="link">
              <Facebook color="#769689" className="h-7 w-7" />
            </Button>
            <Button iconOnly variant="link">
              <LinkedIn color="#769689" className="h-7 w-7" />
            </Button>
            <Button iconOnly variant="link">
              <Twitter color="#769689" className="h-7 w-7" />
            </Button>
            <Button iconOnly variant="link">
              <Github color="#769689" className="h-7 w-7" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
