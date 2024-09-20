import { ROUTES } from '@/lib/routes'
import { Button, Github } from '@repo/ui'
import { Grid01Icon } from '@var-meta/icons'
import { Link } from 'next-view-transitions'
import LogoGno from '@/components/LogoGno'

export const ExploreAll = () => {
  return (
    <div className="dark:bg-primary-dark flex max-h-[23.75rem] w-full flex-col items-center justify-center gap-6 rounded-3xl bg-white px-8 py-16">
      <p className="text-xl font-bold lg:text-4xl">Explore all categories</p>
      <p className="text-md text-center font-medium md:max-w-[50%] lg:text-lg">
        Listed below are the top crypto coins and tokens used for the
        <span className="inline-flex w-fit items-center">
          <span className="">&nbsp;Gn</span>
          <LogoGno width={20} height={20} className="-mb-1" />
          <span>.land&nbsp;</span>
        </span>
        Ecosystem. They are listed in size by many contributors. We welcome you
        to contribute your projects to the system, please create a pull request
        to{' '}
        <Link
          href="https://github.com/VAR-META-Tech/built-on-gno/issues"
          target="_blank"
          className="inline-flex w-fit items-baseline gap-1"
        >
          <Github className="h-5 w-5 self-center" color="#00A0F0" />{' '}
          <span className="text-lg text-[#00A0F0]">github</span>
        </Link>{' '}
        if you have one or many projects/tools built with
        <span className="inline-flex w-fit items-center">
          <span>&nbsp;Gn</span>
          <LogoGno width={20} height={20} className="-mb-1" />
          <span>.land.</span>
        </span>
      </p>

      <Link href={ROUTES.CATEGORIES}>
        <Button
          size="xl"
          variant="link"
          className="bg-secondary hover:bg-secondary/50 rounded-4xl flex min-w-[11rem] items-center justify-center font-medium text-white"
        >
          <Grid01Icon className="h-5 w-5" />
          All categories
        </Button>
      </Link>
    </div>
  )
}
