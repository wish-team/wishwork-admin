import { SearchIcon } from '@heroicons/react/outline'
import { useTranslation } from 'next-i18next'
import type { ChangeEvent } from 'react'
import { useState, useRef } from 'react'
import BaseSelect from '../Base/BaseSelect'

interface SearchProps {
  searchOptions: { key: string; value: string }[]
  sortOptions: { key: string; value: string }[]
  translationID: string
  searchHandler: (search_term: string, search_field: string, sort: string, order: string) => void
  resetSearch: () => void
  loading: boolean
}

const Search = ({ searchOptions, translationID, searchHandler, resetSearch }: SearchProps) => {
  const { t } = useTranslation('common')
  const { t: t2 } = useTranslation(translationID)

  const formRef = useRef<HTMLFormElement>(null)

  const [message, setMessage] = useState('')

  const initialValues = {
    search_term: '',
    search_field: searchOptions[0].key,
    sort: '',
    order: 'desc',
  }
  const [values, setValues] = useState(initialValues)

  const searchTermHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setValues((ps) => ({ ...ps, search_term: '' }))
      setMessage('')
      return
    }
    if (e.target.value.length < 3) {
      setMessage(t('messages.min_3_chars'))
      return
    }
    setMessage('')
    setValues((ps) => ({ ...ps, search_term: e.target.value }))
  }

  const searchFieldHandler = (value: string) => {
    setValues((ps) => ({ ...ps, search_field: value }))
  }

  const onSearch = () => {
    searchHandler(values.search_term, values.search_field, values.sort, values.order)
  }

  const onReset = () => {
    formRef.current?.reset()
    setValues({
      search_term: '',
      search_field: '',
      sort: '',
      order: 'desc',
    })
    resetSearch()
  }

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault()
          onSearch()
        }}
        onReset={onReset}
        className="flex flex-wrap gap-1 p-1 md:flex-nowrap bg-slate-200 dark:bg-slate-600 rounded-xl"
      >
        <div className="flex overflow-hidden items-center px-2.5 pie-0.5 w-full z-20 rounded-lg text-sm text-slate-900 bg-slate-50 focus-within:ring-blue-500 dark:bg-slate-700 dark:placeholder-slate-400 dark:text-white">
          <SearchIcon height={25} />
          <input
            type="search"
            className="w-full h-full border-none bg-inherit focus:ring-0"
            id="search-dropdown"
            placeholder={t('search_term')}
            onChange={searchTermHandler}
          />
        </div>

        <div className="flex flex-wrap gap-1 md:flex-nowrap">
          <BaseSelect
            label={t('search_by')}
            hideLabel
            initialvalue={values.search_field}
            items={searchOptions.map(({ key, value }) => ({ key, value: t2(value) }))}
            onChange={searchFieldHandler}
            className="py-2.5 border-none bg-slate-50 dark:!bg-slate-700 dark:hover:!bg-slate-800"
          />

          <button
            type="submit"
            className="py-2.5 px-10 text-sm font-bold text-white rounded-lg dark:bg-sky-700 bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:hover:bg-sky-800 dark:focus:ring-sky-800"
          >
            {t<string>('search')}
          </button>

          <button
            aria-label="reset"
            title="Reset"
            type="reset"
            disabled={JSON.stringify(values) === JSON.stringify(initialValues)}
            className="py-2.5 px-10 text-sm font-bold text-white rounded-lg dark:bg-sky-700 bg-sky-600 hover:bg-sky-800 dark:hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 disabled:bg-white disabled:text-slate-300 disabled:hover:bg-white dark:disabled:bg-slate-700 dark:disabled:hover:bg-slate-700 "
          >
            {t<string>('reset')}
          </button>
        </div>
      </form>

      {message && <p className="flex justify-center">{message}</p>}
    </div>
  )
}

export default Search
