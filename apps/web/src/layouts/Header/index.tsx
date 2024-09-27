// import { useProjects, useTags } from '@/apis'
import { Github } from '@repo/ui'
// import { Dice5Icon } from '@var-meta/icons'
import { HStack } from '@var-meta/ui'
import { Link } from 'next-view-transitions'

// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
// import { useDebouncedValue } from '@mantine/hooks'
// import ToggleThemeButton from '@/components/ToggleThemeButton'
import { NavbarDesktop, NavbarMobile } from './components/Navbar'
import Logo from '@/components/Logo'
import ToggleThemeButton from '@/components/ToggleThemeButton'
import SearchInput from '@/components/SearchInput'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/lib/routes'
import { useAppContext } from '@/context/app.context'

const Header = () => {
  const pathname = usePathname()
  const { theme } = useAppContext()
  // const { mutateAsync, isPending } = useRandomProject()
  // const [search, setSearch] = useState('')
  // const [searchDebounced] = useDebouncedValue(search, 200)
  // const { data: projects = { data: [] } } = useProjects(
  //   { search: searchDebounced },
  //   { enabled: !!searchDebounced },
  // )
  // const { data: tags = { data: [] } } = useTags(
  //   { search: searchDebounced },
  //   { enabled: !!searchDebounced },
  // )

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
    <header className="fixed left-0 right-0 top-0 z-50 flex h-20 w-full justify-center border-b-[0.25px] before:absolute before:h-20 before:w-full before:backdrop-blur-[15px]">
      <HStack pos="apart" noWrap className="container relative z-30 w-full">
        <HStack spacing={12} noWrap>
          <Logo />

          {pathname !== ROUTES.HOME && (
            <div className="hidden w-80 lg:block">
              <SearchInput />
            </div>
          )}
        </HStack>

        <div className="flex w-auto items-center justify-end gap-2 md:gap-4 xl:gap-6">
          <NavbarDesktop />
          {/* <Search
            onSearch={setSearch}
            projects={projects.data}
            terms={tags.data}
            search={search}
          /> */}

          <Link
            href="https://github.com/VAR-META-Tech/built-on-gno/issues"
            target="_blank"
          >
            <Github
              className="h-6 w-6"
              color={theme !== 'light' ? 'white' : 'black'}
            />
          </Link>

          <ToggleThemeButton />
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

          <NavbarMobile />
        </div>
      </HStack>
    </header>
  )
}

export default Header
