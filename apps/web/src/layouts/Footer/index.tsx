import { Facebook, Github, LinkedIn, Twitter } from '@repo/ui'
import { Button } from '@var-meta/ui'

const Footer = () => {
  return (
    <footer className="bg-primary mt-12 flex h-auto w-full flex-col justify-center gap-8">
      <div className="container grid w-full grid-cols-2 items-center gap-10 py-4">
        <div className="col-span-2 flex justify-center lg:col-span-1 lg:justify-start">
          <span className="text-xl text-white">
            Copyright © {new Date().getFullYear()} by VAR META. All Rights
            Reserved.
          </span>
        </div>
        <div className="col-span-2 flex flex-col items-center gap-4 lg:col-span-1 lg:items-end">
          <div className="flex justify-center gap-2">
            <Button iconOnly variant="link">
              <Facebook color="#0059ff7a" className="h-7 w-7" />
            </Button>
            <Button iconOnly variant="link">
              <LinkedIn color="#0059ff7a" className="h-7 w-7" />
            </Button>
            <Button iconOnly variant="link">
              <Twitter color="#0059ff7a" className="h-7 w-7" />
            </Button>
            <Button iconOnly variant="link">
              <Github color="#0059ff7a" className="h-7 w-7" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
