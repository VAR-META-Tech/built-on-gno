import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import { Button } from '@repo/ui'
import Link from 'next/link'

export const SeeAll = () => {
  const { data = DEFAULT_API_RETURN } = useProjects()

  return (
    <div className="shadow-xs shadow-secondary flex h-full w-[328px] flex-col gap-2 rounded-lg border border-gray-500 p-6">
      <div className="text-lg font-bold lg:text-2xl">All projects</div>
      <div className="flex h-[76px] items-center justify-center gap-4 bg-transparent">
        <span className="text-5xl font-bold">
          {data.pagination.total_items}
        </span>
        <Link href={'/ecosystem/project/all'}>
          <Button
            size="xl"
            variant="outline"
            className="bg-secondary hover:bg-primary/50 border-secondary focus:bg-primary rounded-lg text-white hover:text-white/90"
          >
            View All Projects
          </Button>
        </Link>
      </div>
    </div>
  )
}
