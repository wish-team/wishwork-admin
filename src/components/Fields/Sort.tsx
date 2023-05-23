import { MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'
import { useState, useRef } from 'react'
import BaseSelect from '../Base/BaseSelect'

interface SortProps {
  sortOptions: { key: string; value: string }[]
  translationID: string
  searchHandler: (sort: string, order: string) => void
  resetSearch: () => void
  loading: boolean
}

const Sort = ({ sortOptions, translationID, searchHandler, resetSearch }: SortProps) => {
  const { t } = useTranslation('common')
  const { t: t2 } = useTranslation(translationID)

  const formRef = useRef<HTMLFormElement>(null)

  const [message] = useState('')

  const initialValues = {
    sort: '',
    order: 'desc',
  }
  const [values, setValues] = useState(initialValues)

  const sortHandler = (value: string) => {
    setValues((ps) => ({ ...ps, sort: value }))
  }

  const orderHandler = (value: string) => {
    setValues((ps) => ({ ...ps, order: value }))
  }

  const onSearch = () => {
    searchHandler(values.sort, values.order)
  }

  const onReset = () => {
    formRef.current?.reset()
    setValues({
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
        className="flex flex-col gap-1"
      >
        <div className="grid gap-2 md:flex md:gap-0">
          <div>
            <button
              type="submit"
              className="p-2.5 text-sm font-medium text-white dark:bg-sky-700 bg-sky-600 rounded-is-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
            >
              <MagnifyingGlassIcon height="1.5em" />
              <span className="sr-only">Search</span>
            </button>
            {/* <input
              type="search"
              id="search-dropdown"
              className={`block p-2.5 w-full z-20 text-sm rounded-ie-lg md:rounded-none text-slate-900 bg-slate-50 border-2 md:border-ie-0 border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-l-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:border-blue-500`}
              placeholder={t('search')}
              onChange={searchTermHandler}
            /> */}
          </div>

          <div className="flex [&>*]:w-full">
            {/* <BaseSelect
              label={t('search_by')}
              hideLabel
              initialValue={values.search_field}
              items={searchOptions.map(({ key, value }) => ({ key, value: t2(value) }))}
              onChange={searchFieldHandler}
              className="py-2.5 rounded-ie-none md:rounded-none border-ie-0 dark:border-slate-600"
            /> */}
            <BaseSelect
              label={t<string>('sort_by')}
              hideLabel
              initialvalue={values.sort}
              items={sortOptions.map(({ key, value }) => ({ key, value: t2(value) }))}
              onChange={sortHandler}
              className="py-2.5 rounded-none border-ie-0 dark:border-slate-600"
            />
            <BaseSelect
              label="Order"
              hideLabel
              initialvalue={values.order || 'desc'}
              items={[
                { key: 'desc', value: 'descending' },
                { key: 'asc', value: 'ascending' },
              ].map(({ key, value }) => ({ key, value: t(value) }))}
              onChange={orderHandler}
              className="py-2.5 rounded-none border-ie-0 dark:border-slate-600"
            />
            <button
              aria-label="reset"
              title="Reset"
              type="reset"
              disabled={JSON.stringify(values) === JSON.stringify(initialValues)}
              className="p-2 !w-fit text-white border-2 dark:bg-sky-700 bg-sky-600 rounded-ie-lg border-sky-700 hover:bg-sky-800 dark:hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 disabled:bg-white disabled:text-slate-300 disabled:hover:bg-white dark:disabled:bg-slate-700 dark:disabled:hover:bg-slate-700 disabled:border-slate-200 dark:disabled:border-slate-600"
            >
              <ArrowPathIcon height="1.5em" />
              <span className="sr-only">Reset Search</span>
            </button>
          </div>
        </div>
      </form>

      {message && <p className="flex justify-center">{message}</p>}
    </div>
  )
}

export default Sort
