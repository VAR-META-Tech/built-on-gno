'use client'
import { SearchLgIcon } from '@var-meta/icons'
import { Input, Tag } from '@var-meta/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { IProject, ITag } from '../types'

interface IProps {
  search: string
  // eslint-disable-next-line no-unused-vars
  onSearch: (_: string) => void
  terms: ITag[]
  projects: IProject[]
}

export const Search = ({ projects, terms, search, onSearch }: IProps) => {
  const [toggle, setToggle] = useState(false)
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<SVGSVGElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      !buttonRef?.current?.contains(event.target as Node)
    ) {
      handleToggle()
    }
  }

  useEffect(() => {
    setToggle(false)
  }, [pathname])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  const handleToggle = () => {
    onSearch('')
    setToggle((prev) => !prev)
  }

  return (
    <>
      <SearchLgIcon
        onClick={handleToggle}
        ref={buttonRef}
        className="h-6 w-6 cursor-pointer"
      />
      {toggle && (
        <div className="container fixed left-0 right-0 top-28 z-30 w-full">
          <div
            ref={ref}
            className="border-secondary rounded-lg border px-6 py-6 backdrop-blur-[15px] md:px-32 md:py-20 lg:px-64"
          >
            <Input
              className="focus-within:border-0.5 focus-within:border-primary/20 ring-secondary h-12 border-2 ring-8"
              size="md"
              radius="sm"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search applications"
              suffixClassName="bg-transparent"
              suffix={<SearchLgIcon color="white" />}
            />
            {search && (
              <div className="z-10 m-auto mt-3 h-auto w-full overflow-hidden rounded-lg p-6 shadow-md">
                <div className="flex flex-col gap-3">
                  <h4 className="text-base font-medium">Tags</h4>
                  <div className="flex flex-wrap gap-2 transition-all duration-300 ease-in-out">
                    {terms.map(({ id, name }) => (
                      <Link
                        href={'/ecosystem/tag/' + id}
                        key={id}
                        className="delay-50 group transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"
                      >
                        <Tag
                          size="sm"
                          radius="lg"
                          className="cursor-pointer border-none bg-secondary p-3 group-hover:bg-secondary"
                          contentClassName="text-nowrap text-xs font-medium group-hover:text-white"
                        >
                          {name}
                        </Tag>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-3">
                  <h4 className="text-base font-medium">Projects</h4>
                  <div className="flex flex-wrap gap-2">
                    {projects.map(({ name, id }) => (
                      <Link
                        href={'/ecosystem/project/' + id}
                        key={name}
                        className="delay-50 group transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"
                      >
                        <Tag
                          size="sm"
                          radius="lg"
                          className="group-hover:bg-secondary bg-secondary cursor-pointer border-none p-3"
                          contentClassName="text-nowrap text-xs font-medium group-hover:text-white"
                        >
                          {name}
                        </Tag>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
