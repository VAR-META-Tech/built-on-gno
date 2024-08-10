import { useProjects, useRandomProject, useTags } from '@/apis'
import { Button, Github, Search } from '@repo/ui'
import { Dice5Icon } from '@var-meta/icons'
import { HStack } from '@var-meta/ui'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Header = () => {
  const { mutateAsync, isPending } = useRandomProject()
  const [search, setSearch] = useState('')
  const { data: projects = { data: [] } } = useProjects(
    { search },
    { enabled: !!search },
  )
  const { data: tags = { data: [] } } = useTags(
    { search },
    { enabled: !!search },
  )

  const { push } = useRouter()

  const handleRandomProject = async () => {
    try {
      const project = await mutateAsync()
      push('/ecosystem/project/' + project.id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <header className="shadow-xs border-b-gray fixed left-0 right-0 top-0 z-20 flex h-20 w-full justify-center border-b-[0.25px] before:absolute before:h-20 before:w-full before:backdrop-blur-[15px]">
      <HStack className="container relative z-30 flex w-full flex-nowrap justify-between">
        <Link
          href="/"
          className="flex flex-nowrap items-center text-4xl font-normal"
        >
          <Image src="/gno.logo.png" alt="" width={100} height={60} />
          <span className="bg-gradient-to-r from-gray-700 to-white bg-clip-text text-transparent">
            Ecosystem
          </span>
        </Link>
        <div className="flex w-auto items-center justify-end gap-2 md:gap-4 xl:gap-6">
          <Search
            onSearch={setSearch}
            projects={projects.data}
            terms={tags.data}
            search={search}
          />
          <Link
            href="https://github.com/vAR-META-Tech/built-on-gno"
            target="_blank"
          >
            <Github className="h-6 w-6" color="#ffffff" />
          </Link>
          <Button
            startIcon={<Dice5Icon color="#FFFFFF" />}
            loading={isPending}
            disabled={isPending}
            variant="outline"
            onClick={handleRandomProject}
            className="bg-secondary hover:bg-primary/50 border-secondary focus:bg-primary rounded-lg text-white hover:text-white/90"
          >
            Random project
          </Button>
        </div>
      </HStack>
    </header>
  )
}

export default Header
