import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label?: string
  initialvalue?: string
  helpertext?: string
  error?: boolean
}

function BaseInput(props: BaseInputProps, ref: React.ForwardedRef<HTMLInputElement>) {
  const { type, onChange, className, ...inputProps } = props
  const [inputType, setInputType] = useState(type)
  const [value, setValue] = useState(props.initialvalue || '')

  // update state when initialvalue changes
  useEffect(() => {
    setValue(props.initialvalue || '')
  }, [props.initialvalue])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange?.(e)
  }

  return (
    <div className="w-full">
      <div className="relative">
        <input
          {...inputProps}
          ref={ref}
          value={value}
          type={inputType}
          onChange={changeHandler}
          className={`w-full p-1.5 placeholder-transparent rounded-lg bg-slate-50 dark:bg-slate-600 dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-300 border-2 peer focus:border-sky-600 focus-visible:outline-none ${
            props.error ? 'border-red-600' : 'border-slate-400'
          } ${className}`}
          placeholder=" "
        />
        <label
          htmlFor={props.id}
          className="absolute text-sm transition-all inline-start-2 -top-5 text-slate-600 dark:text-slate-400 peer-placeholder-shown:text-md peer-placeholder-shown:leading-5 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-slate-800 dark:peer-focus:text-slate-300 peer-focus:text-sm"
        >
          {props.label}
        </label>
        {type === 'password' && (
          <button
            className="absolute top-0 bottom-0 transition-all duration-200 ease-in-out transform inline-end-3 hover:scale-105 focus-visible:scale-105 focus:outline-none"
            onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}
            type="button"
          >
            {inputType === 'password' ? (
              <EyeIcon className="w-5 h-full" />
            ) : (
              <EyeSlashIcon className="w-5 h-full" />
            )}
          </button>
        )}
      </div>

      <div className="absolute right-0 top-0 mt-1.5 mr-2.5">
        <span className="text-sm text-slate-600 dark:text-slate-400">{props.helpertext}</span>
      </div>
    </div>
  )
}

export default React.forwardRef(BaseInput)
