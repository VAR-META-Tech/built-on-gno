import { useProjects, useTags } from '@/apis'
import { Github, Search } from '@repo/ui'
// import { Dice5Icon } from '@var-meta/icons'
import { HStack } from '@var-meta/ui'
import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDebouncedValue } from '@mantine/hooks';
import { ROUTES } from '@/lib/routes'
// import ToggleThemeButton from '@/components/ToggleThemeButton'
import { useTheme } from 'next-themes'

const Header = () => {
  const { theme } = useTheme();
  // const { mutateAsync, isPending } = useRandomProject()
  const [search, setSearch] = useState('')
  const [searchDebounced] = useDebouncedValue(search, 200);
  const { data: projects = { data: [] } } = useProjects(
    { search: searchDebounced },
    { enabled: !!searchDebounced },
  )
  const { data: tags = { data: [] } } = useTags(
    { search: searchDebounced },
    { enabled: !!searchDebounced },
  )

  // const { push } = useRouter()

  // const handleRandomProject = async () => {
  //   try {
  //     const project = await mutateAsync()
  //     push('/ecosystem/project/' + project.id)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <header className="fixed left-0 right-0 top-0 z-20 flex h-20 w-full justify-center border-b-[0.25px] before:absolute before:h-20 before:w-full before:backdrop-blur-[15px]">
      <HStack className="container relative z-30 flex w-full flex-nowrap justify-between">
        <Link href={ROUTES.HOME} className="flex flex-nowrap items-center">
          <span className="hidden pb-3.5 text-[2rem] text-primary dark:text-white font-bold tracking-wide sm:flex">
            Built on gn
          </span>
          {
            theme === 'dark' ? (
              <Image src="/gno-light.logo.svg" alt="" width={42} height={42} />
            ) : (
              <Image src="/gno.logo.svg" alt="" width={42} height={42} />
            )
          }
        </Link>
        <div className="flex w-auto items-center justify-end gap-2 md:gap-4 xl:gap-6">
          <Search
            onSearch={setSearch}
            projects={projects.data}
            terms={tags.data}
            search={search}
          />
          <Link
            href="https://github.com/VAR-META-Tech/built-on-gno/issues"
            target="_blank"
          >
            <Github className="h-6 w-6" color={theme === 'dark' ? 'white' : 'black'} />
          </Link>

          {/* <ToggleThemeButton /> */}
          {/* <Button
            startIcon={<Dice5Icon color="#110F12" />}
            loading={isPending}
            disabled={isPending}
            variant="outline"
            onClick={handleRandomProject}
            className="bg-secondary hover:bg-primary/50 border-secondary focus:bg-primary rounded-lg text-black hover:text-black/90"
          >
            Random project
          </Button> */}
        </div>
      </HStack>
    </header>
  )
}

export default Header
