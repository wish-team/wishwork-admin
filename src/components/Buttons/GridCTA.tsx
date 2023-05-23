import type { ReactNode } from 'react'

type PropsType = {
  children: ReactNode
  onClick?: (() => void) | (() => Promise<void>)
}

export default function GridCTA({ children, onClick }: PropsType) {
  return (
    <div
      className="flex items-center justify-center h-8 px-6 py-4 text-sm font-semibold text-white transition-all duration-200 ease-in-out border-0 rounded-md cursor-pointer bg-slate-500 hover:bg-slate-600 focus:bg-primary-hover"
      onClick={onClick}
    >
      {children}
    </div>
  )
}
