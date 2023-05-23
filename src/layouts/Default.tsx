import { useStore } from '@/store/store'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import Nav from '../components/Partials/Nav'

type Props = {
  id?: string
  children: ReactNode
}

export default function Default({ children, id }: Props) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const router = useRouter()

  const loggedIn = useStore((state) => state.loggedIn)
  const logout = useStore((state) => state.logout)

  const { t } = useTranslation('common')

  useEffect(() => {
    if (!loggedIn) {
      logout()
      router.replace('/login')
    }
  }, [loggedIn, router, logout])

  return (
    <div className="relative flex min-h-screen overflow-hidden min-w-screen">
      <div id="nav" className="hidden lg:block">
        <Nav id={id} />
      </div>

      <div
        className={`z-0 flex flex-col h-screen w-full transition-all duration-300 ease-in-out ${
          isNavOpen ? 'rtl:-translate-x-4 ltr:translate-x-4' : ''
        }`}
      >
        <header className="sticky top-0 z-50 flex items-center w-screen gap-4 px-2 shadow-md h-14 shrink-0 shadow-slate-900/20 bg-slate-700 text-slate-200 lg:hidden">
          <button className="h-full" onClick={() => setIsNavOpen(true)}>
            <Bars3Icon height="70%" />
          </button>

          <h3>{t<string>('app.title')}</h3>
        </header>

        <main className="relative">
          <div className="absolute inset-0 min-h-screen px-5 py-8 pb-16 overflow-y-auto md:p-10">
            {children}
          </div>
        </main>
      </div>

      <div
        id="mobile-nav"
        className={`z-10 lg:hidden absolute transition-all ease-in-out duration-300 inset-0 min-w-screen min-h-screen ${
          isNavOpen ? '' : 'invisible opacity-0'
        }`}
      >
        <div
          className={`absolute inset-0 cursor-pointer firefox:bg-black/30 backdrop-blur-sm`}
          onClick={() => setIsNavOpen(false)}
        />
        <div
          className={`absolute transition-all ease-in-out duration-300 min-h-screen ${
            isNavOpen ? 'inline-start-0' : '-inline-start-full'
          } `}
        >
          <Nav id={id} />
        </div>
      </div>
    </div>
  )
}
