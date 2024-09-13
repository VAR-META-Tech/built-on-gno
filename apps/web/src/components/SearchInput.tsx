'use client'

import { useProjects } from '@/apis'
import { DEFAULT_API_RETURN } from '@/constants'
import { ROUTES } from '@/lib/routes'
import { useDebouncedValue } from '@mantine/hooks'
import { IProject } from '@repo/ui'
import { SearchLgIcon } from '@var-meta/icons'
import { cn, HStack, Input } from '@var-meta/ui'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  callback?: () => void
}

const SearchInput: FC<Props> = ({ className, callback }) => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState<string>('')
  const [isShow, setIsShow] = useState<boolean>(false)
  const [valueDebounced] = useDebouncedValue<string>(inputValue, 300)
  const searchRef = useRef<HTMLDivElement>(null)

  const { data: projects = DEFAULT_API_RETURN } = useProjects(
    {
      search: valueDebounced,
      page_size: 10,
    },
    {
      enabled: !!valueDebounced,
    },
  )

  useEffect(() => {
    if (!valueDebounced) {
      setIsShow(false)
    } else {
      setIsShow(true)
    }
  }, [valueDebounced])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsShow(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchRef])

  const handleNavigate = (id: string) => {
    router.push(ROUTES.PROJECT + '/' + id)
    setIsShow(false)
    setInputValue('')

    if(callback) {
      callback()
    }
  }

  return (
    <div
      className={cn('relative w-full rounded-full', className)}
      ref={searchRef}
    >
      <Input
        className="focus-within:border-secondary rounded-full focus-within:shadow-none"
        prefix={<SearchLgIcon />}
        placeholder="Search applications"
        variant="background"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        onFocus={() => {
          if (!inputValue) return

          setIsShow(true)
        }}
      />
      {!!isShow && (
        <div className="bg-light dark:bg-primary absolute left-0 right-0 top-[120%] z-50 max-h-64 overflow-y-auto rounded-3xl p-2 shadow-[0_3px_6px_rgb(0,0,0,0.1)] md:max-h-80 dark:border dark:border-white/20">
          <HStack
            pos="apart"
            className="border-b border-b-black/10 py-1 dark:border-b-white/50"
          >
            <span className="text-sm text-black/50 dark:text-white/50">
              APPS
            </span>
            <span className="text-sm font-semibold text-black/50 dark:text-white/50">
              {projects?.data?.length || 0}
            </span>
          </HStack>
          <ul className="flex flex-col pt-2">
            {projects?.data?.map((project, index) => (
              <SearchItem
                key={`${project?.id}-${index}`}
                project={project}
                onClick={() => handleNavigate(String(project?.id))}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchInput

const SearchItem = ({
  project,
  onClick,
}: {
  project: IProject
  onClick?: () => void
}) => {
  return (
    <li
      onClick={onClick}
      className="flex w-full cursor-pointer gap-4 rounded-2xl p-3 hover:bg-black/5 hover:dark:bg-white/10"
    >
      <div>
        <Image
          src={project?.logoUrl}
          alt="logo project"
          width={48}
          height={48}
        />
      </div>

      <div className="flex-1 space-y-1">
        <div className="min-h-12">
          <span className="font-semibold">{project?.name}</span>

          <p className="line-clamp-1 text-sm">{project?.shortDescription}</p>
        </div>

        <ul className="flex flex-wrap gap-1">
          {project?.projectTags?.slice(0, 2)?.map((tag, index) => (
            <li
              key={`${tag?.tag?.id}-${index}`}
              className="border-primary dark:border-light text-xxs text-nowrap rounded-sm border px-1.5 py-0.5"
            >
              {tag?.tag?.name}
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
