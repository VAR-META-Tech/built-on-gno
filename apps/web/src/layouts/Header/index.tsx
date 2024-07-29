import { useProjects, useRandomProject, useTags } from '@/apis'
import { Button, Github, Search } from '@repo/ui'
import { Dice5Icon } from '@var-meta/icons'
import { HStack } from '@var-meta/ui'
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
    <header className="flex h-16 w-full justify-center border-b-[1px] border-b-[#ddd]">
      <HStack className="container flex w-full flex-nowrap justify-between">
        <Link href="/" className="text-3xl font-semibold text-zinc-900">
          Built on Gno
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
            <Github className="h-6 w-6" />
          </Link>
          <Button
            startIcon={<Dice5Icon />}
            loading={isPending}
            disabled={isPending}
            color="warning"
            onClick={handleRandomProject}
            className="rounded-full"
          >
            Random project
          </Button>
        </div>
      </HStack>
    </header>
  )
}

export default Header
