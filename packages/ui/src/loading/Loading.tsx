export const Loading = () => {
  return (
    <div className="bg-transparent fixed left-0 top-0 z-[9999] flex h-[100vh] w-full items-center justify-center gap-4 backdrop-blur-sm">
      <div className='h-8 w-8 bg-secondary/100 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-8 w-8 bg-secondary/100 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-8 w-8 bg-secondary/100 rounded-full animate-bounce'></div>
    </div>
  )
}
