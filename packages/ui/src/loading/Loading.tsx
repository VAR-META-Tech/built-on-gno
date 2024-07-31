export const Loading = () => {
  return (
    <div className="bg-primary/40 fixed left-0 top-0 z-[9999] flex h-[100vh] w-full flex-col items-center justify-center gap-6 backdrop-blur-md">
      <div className="falling"></div>
    </div>
  )
}
