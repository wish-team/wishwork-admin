import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/Fields.module.css'

type FieldProps = {
  placeholder: string
  onChange?: (value: string[]) => void
  initialValue?: string[]
  error?: boolean
  disabled?: boolean
  tags: Array<{ title: string }>
}

export default function Tags({
  placeholder,
  tags,
  onChange,
  error,
  initialValue,
  disabled,
}: FieldProps) {
  const field = useRef<HTMLInputElement>(null)
  const [isActive, setActive] = useState(false)
  const [value, setValue] = useState('')
  const [items, setItems] = useState(initialValue || [])
  const [, setFiltered] = useState<Record<string, string>[]>([])
  const textChanged = (e: { target: { value: string } }) => {
    const val: string = e.target.value
    setValue(val)
  }
  useEffect(() => {
    if (value !== '') {
      setFiltered(
        tags
          ? tags.filter((t) => !items.includes(t.title) && t.title.toLowerCase().includes(value))
          : []
      )
    } else {
      setFiltered([])
    }
  }, [value, tags, items])
  return (
    <div
      className={`${styles.container} ${styles.tagsContainer} ${isActive ? styles.active : ''} ${
        error ? styles.error : ''
      }`}
    >
      <span
        className={`${styles.placeholder} ${
          isActive || value || items.length > 0 ? styles.notch : ''
        } ${error ? styles.notchError : ''}`}
        onClick={() => field.current?.focus()}
      >
        {placeholder}
      </span>
      {items.map((item, i) => (
        <div
          className={styles.tagItem}
          key={i}
          onClick={() => {
            setItems(items.filter((_, index) => index !== i))
          }}
        >
          <span className={styles.removeIcon}>Icon</span>
          <span className={styles.tag}>{item}</span>
        </div>
      ))}
      <input
        type="text"
        onChange={textChanged}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const splitted = value.trim().split(' ')
            const newItems = [...items, ...splitted]
            let charCount = 0
            for (const item of newItems) {
              charCount += item.length
            }
            if (charCount > 40 || newItems.length > 5) return
            setItems(newItems)
            onChange && onChange(newItems)
            setValue('')
          } else if (e.key === 'Backspace' && value === '') {
            onChange && onChange(items.filter((_, index) => index !== items.length - 1))
            setItems(items.filter((_, index) => index !== items.length - 1))
          }
        }}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        ref={field}
        value={value}
        disabled={disabled}
      />
      {/* <motion.div
        className={styles.selectItems}
        animate={filtered.length > 0 ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
      >
        {filtered.map((item, i) => (
          <div
            className={`${styles.selectItem} font-bold`}
            key={i}
            onClick={() => {
              const newItems = [...items, item.title]
              let charCount = 0
              for (const item of newItems) {
                charCount += item.length
              }
              if (charCount > 40 || newItems.length > 5) return
              setItems(newItems)
              onChange && onChange(newItems)
              setValue('')
            }}
          >
            #{item.title}
          </div>
        ))}
      </motion.div> */}
    </div>
  )
}
