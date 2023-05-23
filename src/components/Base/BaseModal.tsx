import { Dialog, Transition } from '@headlessui/react'
import { useTranslation } from 'next-i18next'
import { Fragment } from 'react'

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onSave?: () => void
  onCancel?: () => void
  title?: React.ReactNode
  message?: React.ReactNode
}

export default function MyModal(props: Props) {
  const { t } = useTranslation()

  const closeHandler = () => {
    props.onCancel?.()
    props.setIsOpen(false)
  }
  const saveHandler = () => {
    props.onSave?.()
    props.setIsOpen(false)
  }

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog className="fixed inset-0 z-10 grid place-items-center" onClose={closeHandler}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 cursor-pointer firefox:bg-black/40 backdrop-blur-sm " />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden transition-all transform shadow-xl bg-slate-50 dark:bg-slate-600 rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-lg font-extrabold leading-6 text-slate-900 dark:text-slate-200"
            >
              {props.title}
            </Dialog.Title>

            <Dialog.Description
              className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-300"
              as="div"
            >
              {props.message}
            </Dialog.Description>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                className="inline-flex justify-center px-6 py-2 text-sm font-medium border border-transparent rounded-md text-sky-900 bg-slate-100 dark:bg-slate-300 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
                onClick={closeHandler}
              >
                {t<string>('cancel')}
              </button>

              <button
                type="button"
                className="inline-flex justify-center px-6 py-2 text-sm font-medium border border-transparent rounded-md text-sky-900 bg-slate-100 dark:bg-slate-300 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
                onClick={saveHandler}
              >
                {t<string>('continue')}
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
