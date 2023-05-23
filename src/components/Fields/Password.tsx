import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import type { ChangeEvent } from 'react'
import { useRef, useState } from 'react'
import styles from '../../styles/Fields.module.css'

type FieldProps = {
  placeholder: string
  onChange?: (val: string) => void
}

export default function Password({ placeholder, onChange }: FieldProps) {
  const field = useRef<HTMLInputElement>(null)
  const [isActive, setActive] = useState(false)
  const [value, setValue] = useState('')
  const [visible, setVisiblity] = useState(false)
  const textChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setValue(val)
    onChange?.(val)
  }
  return (
    <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
      <span
        className={`${styles.placeholder} ${isActive || value ? styles.notch : ''}`}
        onClick={() => field.current?.focus()}
      >
        {placeholder}
      </span>
      <input
        type={visible ? 'text' : 'password'}
        onChange={textChanged}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        ref={field}
        value={value}
        className="h-full w-full p-3 pl-10 text-right text-sm font-medium outline-none"
      />
      <span
        className="absolute left-3 top-[0.95rem] cursor-pointer h-4 w-4"
        onClick={() => setVisiblity(!visible)}
      >
        {!visible ? <EyeIcon /> : <EyeSlashIcon />}
      </span>
    </div>
  )
}
