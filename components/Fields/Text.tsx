import { useRef, useState } from 'react'
import styles from '../../styles/Fields.module.css'

type FieldProps = {
  placeholder: string
  onChange?: (value: string) => void
  initialValue?: string
  error?: boolean
  adaptive?: boolean
  disabled?: boolean
  numberOnly?: boolean
}

export default function Text({
  placeholder,
  onChange,
  error,
  initialValue,
  adaptive,
  disabled,
  numberOnly,
}: FieldProps) {
  const field = useRef<HTMLInputElement>(null)
  const [isActive, setActive] = useState(false)
  const [value, setValue] = useState(initialValue || '')
  const textChanged = (e: { target: { value: string } }) => {
    const val: string = numberOnly ? e.target.value.replace(/[^\d]/, '') : e.target.value
    setValue(val)
    onChange?.(val)
  }

  return (
    <div
      className={`${styles.container} ${isActive ? styles.active : ''} ${
        error ? styles.error : ''
      }`}
      style={{ width: adaptive ? '100%' : undefined }}
    >
      <span
        className={`${styles.placeholder} ${isActive || value ? styles.notch : ''} ${
          error ? styles.notchError : ''
        }`}
        onClick={() => field.current?.focus()}
      >
        {placeholder}
      </span>
      <input
        className="h-full w-full p-3 text-right text-sm font-medium outline-none"
        type="text"
        onChange={textChanged}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        ref={field}
        value={value}
        disabled={disabled}
      />
    </div>
  )
}
