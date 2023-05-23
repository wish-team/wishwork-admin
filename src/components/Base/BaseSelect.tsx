import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useState } from 'react'

interface BaseSelectProps {
  label?: string
  items?: { key: string; value: string }[]
  initialvalue?: string
  onChange?: (value: string) => void
  className?: string
  style?: React.CSSProperties
  hideLabel?: boolean
}

export default function BaseSelect(props: BaseSelectProps) {
  const [selectedOption, setSelectedOption] = useState(props.initialvalue || '')

  // update state when initialvalue changes
  useEffect(() => {
    setSelectedOption(props.initialvalue || '')
  }, [props.initialvalue])

  const changeHandler = (value: string) => {
    setSelectedOption(value)
    props.onChange?.(value)
  }

  return (
    <Listbox value={selectedOption} onChange={changeHandler}>
      <div className="relative">
        <Listbox.Button
          className={`relative w-full cursor-default rounded-lg py-2 pis-3 pie-10 text-left border-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${
            selectedOption
              ? 'bg-sky-600 dark:bg-sky-700 hover:bg-sky-700 dark:hover:bg-sky-800 border-sky-700 dark:border-sky-700 text-sky-100 dark:text-sky-100'
              : 'text-slate-400 bg-slate-50 dark:bg-slate-600 dark:hover:bg-slate-700 dark:text-slate-300 dark:border-slate-400 border-slate-300'
          } ${props.className}`}
          style={props.style}
        >
          {((props.hideLabel && !selectedOption) || !props.hideLabel) && (
            <span
              className={`block truncate duration-100 ease-in-out dark:text-slate-400 ${
                selectedOption
                  ? 'absolute inline-start-2 top-0 -translate-y-[calc(100%+2px)] text-sm text-slate-600 dark:text-slate-400'
                  : ''
              }`}
            >
              {props.label}
            </span>
          )}

          <span className="block truncate rtl:text-start text-slate-100 dark:text-slate-50">
            {props.items?.filter(({ key }) => key === selectedOption)?.[0]?.value}
          </span>
          <span className="absolute inset-y-0 flex items-center pr-2 pointer-events-none inline-end-0">
            <ChevronUpDownIcon
              className={`w-5 h-5 text-slate-400 ${selectedOption ? 'text-sky-100' : ''}`}
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>

        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-slate-50 dark:bg-slate-300 w-fit max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {props.items?.map((item) => (
              <Listbox.Option
                key={item.key}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-sky-100 dark:bg-slate-200 text-sky-900' : 'text-slate-900'
                  }`
                }
                value={item.key}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {item.value}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
