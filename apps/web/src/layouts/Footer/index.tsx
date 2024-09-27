import { useAppContext } from '@/context/app.context'
import { Facebook, Github, LinkedIn, Twitter } from '@repo/ui'
import { Link } from 'next-view-transitions'


const Footer = () => {
  const { theme } = useAppContext()

  return (
    <footer className="bg-light dark:bg-primary container z-50 flex h-auto w-full flex-col justify-center gap-8 pt-12">
      <div className="bg-disabled/30 h-[.0625rem] w-full" />

      <div className="flex w-full flex-col items-center justify-between gap-6 py-6 md:flex-row">
        <div className="col-span-2 flex justify-center lg:col-span-1">
          <span className="text-sm">
            Copyright © {new Date().getFullYear()} by{' '}
            <Link
              href="https://www.var-meta.com/"
              target="_blank"
              className="hover:underline"
            >
              VAR META
            </Link>
            . All Rights Reserved.
          </span>
        </div>
        <div className="col-span-2 flex flex-col items-center gap-4 lg:col-span-1">
          <div className="flex justify-center gap-4">
            <Link
              href="https://www.facebook.com/varmeta.techcompany"
              target="_blank"
              className="transition-all hover:scale-125"
            >
              <Facebook
                className="h-6 w-6"
                color={theme !== 'light' ? 'white' : 'black'}
                fill={theme !== 'light' ? 'black' : 'white'}
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/var-meta"
              target="_blank"
              className="transition-all hover:scale-125"
            >
              <LinkedIn
                className="h-6 w-6"
                color={theme !== 'light' ? 'white' : 'black'}
              />
            </Link>
            <Link
              href="https://x.com/var_meta"
              target="_blank"
              className="transition-all hover:scale-125"
            >
              <Twitter
                className="h-6 w-6"
                color={theme !== 'light' ? 'white' : 'black'}
              />
            </Link>
            <Link
              href="https://github.com/var-META-Tech"
              target="_blank"
              className="transition-all hover:scale-125"
            >
              <Github
                className="h-6 w-6"
                color={theme !== 'light' ? 'white' : 'black'}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
