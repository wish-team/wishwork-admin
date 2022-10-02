import type { ReactChild } from 'react'

type PropsType = {
  children: ReactChild
  onClick?: (() => void) | (() => Promise<void>)
  fill?: boolean
}

export default function SecondaryButton({ children, onClick, fill }: PropsType) {
  return (
    <div
      className="flex items-center justify-center py-3 px-5 text-base font-semibold rounded-md cursor-pointer border-2 border-primary transition-all duration-150 ease-in-out bg-white text-primary h-12 hover:bg-primary hover:text-white focus:bg-primary focus:text-white"
      onClick={onClick}
      style={{ width: fill ? '100%' : 'max-content' }}
    >
      {children}
    </div>
  )
}
