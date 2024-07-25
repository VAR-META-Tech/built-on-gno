'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const { back } = useRouter()
  return (
    <section>
      <div className="mx-auto flex h-[calc(100vh_-_277px)] items-center justify-center px-6 py-12">
        <div>
          <p className="text-main text-primary text-5xl font-medium">
            404 error
          </p>
          <h1 className="text-primary mt-3 text-2xl font-semibold md:text-3xl">
            We can&apos;t find that page
          </h1>
          <p className="mt-4 text-gray-400">
            Sorry, the page you are looking for doesn&apos;t exist or has been
            moved.
          </p>

          <div className="mt-6 flex items-center gap-x-3">
            <button
              onClick={back}
              className="bg-primary/50 hover:bg-primary flex w-1/2 gap-x-2 rounded-lg border px-5 py-2 text-sm text-gray-700 sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </button>
            <Link
              href="/"
              className="bg-secondary/70 hover:bg-secondary w-1/2 rounded-lg px-5 py-2 text-sm text-white sm:w-auto"
            >
              Take me home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
