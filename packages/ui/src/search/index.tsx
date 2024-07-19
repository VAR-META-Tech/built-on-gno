import { SearchMdIcon } from '@var-meta/icons'
import { Input, Tag } from '@var-meta/ui'
import { Gnosis } from '../icons'
import { IProject, ITag } from '../types'

interface IProps {
  search: string
  onSearch: (_: string) => void
  terms: ITag[]
  projects: IProject[]
}

export const Search = ({ projects, terms, search, onSearch }: IProps) => {
  return (
    <div className="relative h-fit w-full max-w-lg" id="is-sticky">
      <Input
        className="h-12 rounded-full border-2 focus-within:border-0"
        size="md"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Start typing search"
        prefix={<Gnosis width={24} height={24} />}
        suffix={<SearchMdIcon />}
      />

      {search && (
        <div
          className={`absolute left-0 right-0 z-10 mt-2 ${
            search ? 'h-auto' : 'h-0'
          } w-full max-w-lg overflow-hidden rounded-lg bg-white p-6 transition-all duration-500 ease-in-out lg:m-auto`}
        >
          <div className="flex flex-col gap-3">
            <h4 className="text-base font-medium text-gray-500">Terms</h4>
            <div className="flex flex-wrap gap-2 transition-all duration-300 ease-in-out">
              {terms.map((item) => (
                <div
                  key={item.id}
                  className="delay-50 group transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"
                >
                  <Tag
                    size="sm"
                    radius="2xl"
                    className="group-hover:bg-primary bg-primary/30 cursor-pointer p-3"
                    contentClassName="text-nowrap text-xs font-medium text-gray-500 group-hover:text-white"
                  >
                    {item.name}
                  </Tag>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-3">
            <h4 className="text-base font-medium text-gray-500">Projects</h4>
            <div className="flex flex-wrap gap-2">
              {projects.map(({ name }) => (
                <div
                  key={name}
                  className="delay-50 group transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"
                >
                  <Tag
                    size="sm"
                    radius="2xl"
                    className="group-hover:bg-secondary bg-secondary/30 cursor-pointer p-3"
                    contentClassName="text-nowrap text-xs font-medium text-gray-500 group-hover:text-white"
                  >
                    {name}
                  </Tag>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
