'use client'
import { ROUTES } from '@/lib/routes'
import { Button } from '@repo/ui'
import { ArrowLeftIcon } from '@var-meta/icons'
import { useRouter } from 'next/navigation'
import { Link } from 'next-view-transitions'

export default function NotFound() {
  const { back } = useRouter()
  return (
    <section>
      <div className="mx-auto flex h-[calc(100vh_-_189px)] items-center justify-center px-6 py-12 lg:h-[calc(100vh_-_120px)]">
        <div>
          <p className="text-main text-5xl font-medium">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold md:text-3xl">
            We can&apos;t find that page
          </h1>
          <p className="mt-4 text-gray-500">
            Sorry, the page you are looking for doesn&apos;t exist or has been
            moved.
          </p>

          <div className="mt-6 flex items-center gap-x-3">
            <Button
              variant="outline"
              onClick={back}
              className="bg-primary hover:bg-primary/50 border-secondary focus:bg-primary flex w-1/2 items-center gap-x-2 rounded-lg border px-5 py-2 text-sm text-white hover:text-white/90 sm:w-auto"
            >
              <ArrowLeftIcon />
              <span>Go back</span>
            </Button>
            <Link href={ROUTES.HOME}>
              <Button
                variant="solid"
                className="bg-secondary hover:bg-secondary border-secondary focus:bg-secondary flex w-1/2 items-center gap-x-2 rounded-lg border px-5 py-2 text-sm text-white hover:text-white/90 sm:w-auto"
              >
                Take me home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
