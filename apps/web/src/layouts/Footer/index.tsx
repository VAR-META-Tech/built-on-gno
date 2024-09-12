import { Facebook, Github, LinkedIn, Twitter } from '@repo/ui'
import { useTheme } from 'next-themes'
import Link from 'next/link'

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="bg-light dark:bg-primary fixed bottom-0 left-0 right-0 mt-12 flex h-auto w-full flex-col justify-center gap-8">
      <div className="container grid w-full grid-cols-1 items-center gap-5 py-6">
        <div className="col-span-2 flex justify-center lg:col-span-1">
          <span className="text-sm">
            Copyright © {new Date().getFullYear()} by {' '}
            <Link href="https://www.var-meta.com/" target='_blank' className='hover:underline'>VAR META</Link>. All Rights Reserved.
          </span>
        </div>
        <div className="col-span-2 flex flex-col items-center gap-4 lg:col-span-1">
          <div className="flex justify-center gap-4">
            <Link href="https://www.facebook.com/varmeta.techcompany" target='_blank' className='hover:scale-125 transition-all'>
              <Facebook className="h-6 w-6" color={theme === 'dark' ? 'white' : 'black'} fill={theme === 'dark' ? 'black' : 'white'} />
            </Link>
            <Link href="https://www.linkedin.com/company/var-meta" target='_blank' className='hover:scale-125 transition-all'>
              <LinkedIn className="h-6 w-6" color={theme === 'dark' ? 'white' : 'black'} />
            </Link>
            <Link href="https://x.com/var_meta" target='_blank' className='hover:scale-125 transition-all'>
              <Twitter className="h-6 w-6" color={theme === 'dark' ? 'white' : 'black'} />
            </Link>
            <Link href="https://github.com/var-META-Tech" target='_blank' className='hover:scale-125 transition-all'>
              <Github className="h-6 w-6" color={theme === 'dark' ? 'white' : 'black'} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
