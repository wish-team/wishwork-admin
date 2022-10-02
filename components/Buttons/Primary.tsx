type PropsType = {
  children: React.ReactNode
  onClick?: () => Promise<void>
  fill?: boolean
  disabled: boolean
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export default function PrimaryButton({ children, onClick, fill, disabled, type }: PropsType) {
  return (
    <button
      className="flex items-center justify-center py-3 px-5 text-base font-semibold rounded-md cursor-pointer bg-slate-500 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500 focus:bg-primary-hover transition-all duration-200 ease-in-out text-white border-0 h-12"
      onClick={() => onClick && onClick()}
      style={{ width: fill ? '100%' : 'max-content' }}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
