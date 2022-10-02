import { PlusIcon } from '@heroicons/react/outline'
import { MinusCircleIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import BaseInput from './BaseInput'

interface BaseEditableListProps {
  id: string
  label?: string
  initialItems?: string[]
  onChange?: (list: string[]) => void
}

export default function BaseEditableList(props: BaseEditableListProps) {
  const [items, setItems] = useState(props.initialItems || [])
  const [value, setValue] = useState('')

  // update state when initialItems change
  useEffect(() => {
    setItems(props.initialItems || [])
  }, [props.initialItems])

  return (
    <div className="flex flex-col w-full">
      <form
        className="flex w-full"
        onSubmit={(e) => {
          e.preventDefault()
          if (!value) return
          if (items.includes(value)) return
          setItems((prevVal) => [...prevVal, value])
          props.onChange?.(items)
          setValue('')
        }}
      >
        <BaseInput
          id={props.id}
          label={props.label}
          initialvalue={value}
          onChange={(e) => setValue(e.target.value)}
          className="rounded-b-none rounded-ie-none border-ie-0"
        />
        <button
          type="submit"
          className="grid h-full border-2 place-items-center rounded-se-lg aspect-square text-slate-400 bg-slate-50 dark:bg-slate-600 border-slate-300 dark:border-slate-400"
        >
          <PlusIcon height="1.5rem" />
        </button>
      </form>

      <ul className="flex flex-col rounded-b-lg bg-slate-300 dark:bg-slate-700">
        {items.length ? (
          items.map((item, i) => (
            <li
              key={i}
              className="flex justify-between p-2 border-b-2 last:border-0 border-slate-400 dark:border-slate-500 text-slate-600 dark:text-slate-300"
            >
              {item}
              <button
                className="grid duration-100 ease-in-out place-items-center text-rose-500"
                onClick={() => {
                  const newItems = items.filter((_, _i) => i !== _i)
                  setItems(newItems)
                  props.onChange?.(newItems)
                }}
              >
                <MinusCircleIcon height="1.5rem" />
              </button>
            </li>
          ))
        ) : (
          <div className="p-2">Empty</div>
        )}
      </ul>
    </div>
  )
}
