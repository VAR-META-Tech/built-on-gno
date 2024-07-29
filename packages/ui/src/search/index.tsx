'use client'
import { SearchMdIcon } from '@var-meta/icons'
import { Input, SearchIcon, Tag } from '@var-meta/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Gnosis } from '../icons'
import { IProject, ITag } from '../types'

interface IProps {
  search: string
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
    if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
      return
    }
    if (ref.current && !ref.current.contains(event.target as Node)) {
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
      <SearchIcon
        onClick={handleToggle}
        ref={buttonRef}
        className="cursor-pointer"
      />
      {toggle && (
        <div
          ref={ref}
          className="bg-secondary/20 border-secondary fixed left-0 right-0 top-20 z-20 mx-auto max-w-screen-lg rounded-xl border px-6 py-6 shadow-xl md:px-32 md:py-20 lg:px-64"
        >
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
            <div className="z-10 m-auto mt-1.5 h-auto w-full max-w-lg overflow-hidden rounded-lg bg-white p-6">
              <div className="flex flex-col gap-3">
                <h4 className="text-base font-medium text-gray-500">Tags</h4>
                <div className="flex flex-wrap gap-2 transition-all duration-300 ease-in-out">
                  {terms.map(({ id, name }) => (
                    <Link
                      href={'/ecosystem/tag/' + id}
                      key={id}
                      className="delay-50 group transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"
                    >
                      <Tag
                        size="sm"
                        radius="2xl"
                        className="group-hover:bg-primary bg-primary/30 cursor-pointer p-3"
                        contentClassName="text-nowrap text-xs font-medium text-gray-500 group-hover:text-white"
                      >
                        {name}
                      </Tag>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-3">
                <h4 className="text-base font-medium text-gray-500">
                  Projects
                </h4>
                <div className="flex flex-wrap gap-2">
                  {projects.map(({ name, id }) => (
                    <Link
                      href={'/ecosystem/project/' + id}
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
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
