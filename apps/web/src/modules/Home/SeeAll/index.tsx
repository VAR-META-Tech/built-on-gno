import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import { Button } from '@repo/ui'
import Link from 'next/link'

export const SeeAll = () => {
  const { data = DEFAULT_API_RETURN } = useProjects()

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="mx-4 text-lg font-bold lg:text-2xl">All projects</div>
      <div className="flex flex-col items-center gap-1 rounded-3xl border bg-white p-6 shadow-xl">
        <span className="text-4xl font-bold text-gray-400">
          {data.pagination.total_items}
        </span>
        <Link href={'/ecosystem/project/all'}>
          <Button radius="full" color="warning">
            View All Projects
          </Button>
        </Link>
      </div>
    </div>
  )
}
