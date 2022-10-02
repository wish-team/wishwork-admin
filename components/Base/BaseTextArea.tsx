import React, { useState } from 'react'

interface BaseInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label?: string
  initialValue?: string
  helperText?: string
  error?: boolean
}

function BaseTextArea(props: BaseInputProps, ref: React.RefObject<HTMLTextAreaElement>) {
  const { onChange, ...inputProps } = props
  const [value, setValue] = useState(props.initialValue || '')

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    onChange?.(e)
  }

  return (
    <div>
      <div className="relative">
        <textarea
          {...inputProps}
          ref={ref}
          value={value}
          onChange={changeHandler}
          className={`w-full p-1.5 placeholder-transparent rounded-lg bg-slate-50 dark:bg-slate-600 dark:text-slate-300 text-slate-700 dark:border-slate-400 border-2 peer focus:border-sky-600 focus-visible:outline-none ${
            props.error ? 'border-red-600' : 'border-slate-400'
          }`}
          placeholder=" "
        />
        <label
          htmlFor={props.id}
          className="absolute text-sm transition-all left-2 -top-5 text-slate-600 dark:text-slate-400 peer-placeholder-shown:text-base peer-placeholder-shown:leading-5 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-slate-800 dark:peer-focus:text-slate-300 peer-focus:text-sm"
        >
          {props.label}
        </label>
      </div>

      <div className="absolute right-0 top-0 mt-1.5 mr-2.5">
        <span className="text-sm text-slate-600 dark:text-slate-400">{props.helperText}</span>
      </div>
    </div>
  )
}

export default React.forwardRef(BaseTextArea)
