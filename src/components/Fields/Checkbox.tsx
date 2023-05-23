import { useState } from 'react'
import styles from '../../styles/Fields.module.css'

type Item = {
  label: string
  value: string
}

type FieldProps = {
  items: Array<Item>
  title?: string
  onChange?: (value: unknown[]) => void
  initialValue?: Array<Item>
  error?: boolean
}

export default function Checkbox({ items, onChange, error, initialValue, title }: FieldProps) {
  const [value, setValue] = useState(
    [...Array(items.length)].map((_, i) =>
      initialValue ? initialValue.findIndex((val) => val.value === items[i].value) > -1 : false
    )
  )

  return (
    <div className={styles.checkboxContainer}>
      <h3 className="font-bold">{title}</h3>
      {items.map((item, index) => (
        <div
          className={styles.checkbox}
          key={item.value}
          onClick={() => {
            const updateTo = !value[index]
            value[index] = updateTo
            const updated = value.map((val: boolean, i: number) => (i === index ? updateTo : val))
            setValue(updated)
            onChange && onChange(items.filter((_, i) => updated[i]))
          }}
        >
          <div
            className={`${styles.box} ${value[index] && styles.boxActive} ${
              error && !value[index] && styles.error
            }`}
          >
            {/* <motion.span
              className={styles.check}
              animate={value[index] ? { scale: 1, rotate: '45deg' } : { scale: 0, rotate: 0 }}
            ></motion.span> */}
          </div>
          <span className={`${styles.label} ${error && !value[index] && styles.textError}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
