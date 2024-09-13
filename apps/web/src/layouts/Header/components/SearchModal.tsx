import SearchInput from '@/components/SearchInput'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { FCC } from '@var-meta/ui'
import React from 'react'

interface Props {}

const SearchModal: FCC<Props> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        isShowCloseIcon={false}
        className="!rounded-full bg-white dark:bg-primary p-0 sm:max-w-[425px]"
      >
        <SearchInput />
      </DialogContent>
    </Dialog>
  )
}

export default SearchModal
