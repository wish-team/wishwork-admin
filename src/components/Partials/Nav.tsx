import { useStore } from '@/store/store'
import { Menu, Transition } from '@headlessui/react'
import {
  ComputerDesktopIcon,
  GlobeAmericasIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useMemo, useState } from 'react'
import type { Resource } from '../../admin/Undertheground'
import Undertheground from '../../admin/Undertheground'
import BaseModal from '../Base/BaseModal'

type Props = {
  id?: string
}

export default function Nav({ id }: Props) {
  const logout = useStore((state) => state.logout)
  const { t } = useTranslation('common')
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const { theme, resolvedTheme, setTheme } = useTheme()

  const menuItems = useMemo(
    () =>
      [
        {
          ...Undertheground.profileResource,
        },
        ...Undertheground.resources,
      ] as Array<Resource>,
    []
  )
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(-1)

  useEffect(() => {
    setActiveTab(0)
    for (const index in menuItems) {
      const regex = new RegExp('^' + menuItems[index].id + '$')
      if (id && id.match(regex)) {
        setActiveTab(parseInt(index))
      }
    }
  }, [id, menuItems])

  const logoutHandler = () => {
    logout()
    router.replace('/login')
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between w-56 h-screen gap-4 px-3 py-8 overflow-y-scroll shadow-md bg-slate-200 dark:bg-slate-800 shrink-0">
        <div className="relative w-24 h-24 overflow-hidden shadow-lg shrink-0 shadow-purple-500">
          <Image
            src={Undertheground.logo}
            layout="fill"
            objectFit="contain"
            className="mb-6"
            priority
            alt="app logo"
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <Link href={router.asPath} locale={router.locale === 'en' ? 'fa' : 'en'}>
            <button className="inline-flex w-full gap-1 px-6 py-2 rounded-lg hover:bg-slate-500/20">
              <GlobeAmericasIcon width="1.5em" />
              <span>{router.locale === 'en' ? 'فا' : 'EN'}</span>
            </button>
          </Link>

          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex w-full gap-1 px-6 py-2 rounded-lg hover:bg-slate-500/20">
              <>
                {resolvedTheme === 'dark' ? <MoonIcon width="1.5em" /> : <SunIcon width="1.5em" />}
                {t('theme')}
              </>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-10 flex flex-col w-32 gap-1 p-1 mt-2 origin-top rounded-md shadow-lg inline-start-0 bg-slate-100 dark:bg-slate-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setTheme('dark')}
                      className={`group flex w-full items-center rounded-md p-2 text-sm ${
                        theme === 'dark' ? 'bg-sky-600' : ''
                      } ${
                        active ? 'bg-slate-200 dark:bg-slate-400 text-slate-800' : 'text-slate-900'
                      }`}
                    >
                      <>
                        <MoonIcon width="1.3em" className="mie-2" />
                        {t('dark')}
                      </>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setTheme('light')}
                      className={`group flex w-full items-center rounded-md p-2 text-sm ${
                        theme === 'light' ? 'bg-sky-600' : ''
                      } ${
                        active ? 'bg-slate-200 dark:bg-slate-400 text-slate-800' : 'text-slate-900'
                      }`}
                    >
                      <>
                        <SunIcon width="1.3em" className="mie-2" />
                        {t('light')}
                      </>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setTheme('system')}
                      className={`group flex w-full items-center rounded-md p-2 text-sm ${
                        theme === 'system' ? 'bg-sky-600' : ''
                      } ${
                        active ? 'bg-slate-200 dark:bg-slate-400 text-slate-800' : 'text-slate-900'
                      }`}
                    >
                      <>
                        <ComputerDesktopIcon width="1.3em" className="mie-2" />
                        {t('system')}
                      </>
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <hr className="w-11/12 border-2 border-slate-400 dark:border-slate-500" />

        <div className="flex flex-col w-full gap-2 mb-4">
          {menuItems.map((item, i) => (
            <Link href={item.profileResource ? '/profile' : `/view/${item.id}`} key={i}>
              <button
                className={`flex relative text-neutral-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg transition-colors duration-300 w-full font-bold text-sm px-4 py-2 ${
                  i === activeTab
                    ? 'dark:bg-slate-700 bg-slate-400 after:h-full after:w-2 after:absolute after:inline-start-0 after:top-0 after:-mis-3 after:bg-secondary after:rounded-ie-full after:shadow-secondary/80 after:shadow-[0_0_15px]'
                    : ''
                }`}
              >
                {t<string>(item.title)}
              </button>
            </Link>
          ))}
        </div>

        <hr className="w-11/12 border-2 border-slate-400 dark:border-slate-500" />

        <div
          className="flex w-full px-4 py-2 text-sm font-bold transition-colors duration-300 rounded-lg cursor-pointer text-neutral-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
          onClick={() => setShowLogoutModal(true)}
        >
          {t<string>('nav.logout')}
        </div>
      </div>

      <BaseModal
        isOpen={showLogoutModal}
        setIsOpen={setShowLogoutModal}
        title={t<string>('nav.logout')}
        message={t<string>('nav.logout_msg')}
        onSave={logoutHandler}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  )
}
