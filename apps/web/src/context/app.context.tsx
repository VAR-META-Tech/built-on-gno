import { createSafeContext } from '@/lib/create-safe-context'

type AppContextProps = {
  theme: string | undefined
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

export const [AppContextProvider, useAppContext] =
  createSafeContext<AppContextProps>(
    'AppContextProvider component was not found in tree',
  )
