import { Facebook, Github, LinkedIn, Twitter } from '@repo/ui'
import Link from 'next/link'

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
          <div className="flex justify-center gap-4">
            <Link href="https://www.facebook.com/varmeta.techcompany">
              <Facebook color="#0059ff7a" className="h-7 w-7" />
            </Link>
            <Link href="https://www.linkedin.com/company/var-meta">
              <LinkedIn color="#0059ff7a" className="h-7 w-7" />
            </Link>
            <Link href="https://x.com/var_meta">
              <Twitter color="#0059ff7a" className="h-7 w-7" />
            </Link>
            <Link href="https://github.com/var-META-Tech">
              <Github color="#0059ff7a" className="h-7 w-7" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
