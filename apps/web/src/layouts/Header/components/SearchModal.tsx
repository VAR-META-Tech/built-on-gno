import SearchInput from '@/components/SearchInput'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { FCC } from '@var-meta/ui'
import React from 'react'

interface Props {
  callback?: () => void
}

const SearchModal: FCC<Props> = ({ children, callback }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        isShowCloseIcon={false}
        className="dark:bg-primary !rounded-full bg-white p-0 sm:max-w-[425px]"
      >
        <SearchInput
          callback={() => {
            handleClose()
            if (callback) {
              callback()
            }
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default SearchModal
