type FieldProps = {
  placeholder: string
  items: string[]
  onChange: (value: string) => void
  error?: boolean
  adaptive?: boolean
  initialValue: number
}

const Select = ({ placeholder, items, onChange, initialValue }: FieldProps) => {
  return (
    <div>
      <p>{placeholder}</p>
      <select onChange={(e) => onChange(e.target.value)} defaultValue={items[initialValue]}>
        {items.map((item, i) => (
          <option value={item} key={i}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
