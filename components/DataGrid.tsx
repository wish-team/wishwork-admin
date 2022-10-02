import type { Resource } from '@/admin/Undertheground'
import { EyeIcon, PencilIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { Dispatch, SetStateAction } from 'react'
import DownloadButton from './Buttons/DownloadButton'
import Pagination from './Pagination'

type GridProps = {
  data: Record<string, any>[]
  resource?: Resource
  loading: boolean
  pageNumber?: number
  setPageNumber?: Dispatch<SetStateAction<number>>
  totalCount?: number
  searchSettings?: { search_term?: string; search_field?: string; sort: string; order: string }
  searchOptions?: { key: string; value: string }[]
  sortOptions?: { key: string; value: string }[]
  searchHandler?: (search_term: string, search_field: string, sort: string, order: string) => void
}

export default function DataGrid({
  data,
  resource,
  loading,
  pageNumber,
  setPageNumber,
  totalCount,
  searchSettings,
  sortOptions,
  searchHandler,
}: GridProps) {
  const { t } = useTranslation(['common', 'table'])

  const { locale } = useRouter()

  const fields = resource?.fields
  let columns = ''

  fields?.filter((field) => !field.hideInTable).forEach(() => (columns += '1fr '))

  return (
    <>
      <div className="w-full overflow-x-auto rounded-md bg-slate-300 dark:bg-slate-700">
        <table className="w-full table-auto ">
          <thead>
            <tr className="h-14 ">
              {fields
                ?.filter((field) => !field.hideInTable)
                .map((field, i) => (
                  <th
                    scope="col"
                    className={`p-4 font-bold text-left whitespace-nowrap text-slate-700 dark:text-slate-100 ${
                      sortOptions?.some((x) => x.key === field.key) ? 'cursor-pointer' : ''
                    }`}
                    key={i}
                    onClick={() => {
                      sortOptions?.some((x) => x.key === field.key) &&
                        searchHandler?.(
                          searchSettings?.search_term ?? '',
                          searchSettings?.search_field ?? '',
                          field.key,
                          searchSettings?.order === 'asc' ? 'desc' : 'asc'
                        )
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <>
                        {t(field.title, { ns: 'table' })}
                        {sortOptions?.some((x) => x.key === field.key) && (
                          <ChevronDownIcon
                            height={20}
                            style={{
                              cursor: 'pointer',
                              transform:
                                searchSettings?.order === 'asc' &&
                                searchSettings?.sort === field.key
                                  ? 'rotate(180deg)'
                                  : 'rotate(0deg)',
                            }}
                          />
                        )}
                      </>
                    </span>
                  </th>
                ))}
            </tr>
          </thead>

          <tbody className="font-medium rounded-b-lg bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300">
            {loading ? (
              <tr className="w-full py-3 border-b-2 last:border-0 border-slate-400">
                <td
                  className="p-4 text-sm text-center text-gray-600 align-middle dark:text-gray-400 whitespace-nowrap text-start"
                  colSpan={99}
                >
                  {t<string>('loading')}
                </td>
              </tr>
            ) : data?.length ? (
              data.map((item, i) => (
                <tr className="w-full py-3 border-b-2 last:border-0 border-slate-400" key={i}>
                  {fields
                    ?.filter((field) => !field.hideInTable)
                    .map((field, j) => (
                      <td className="p-4 text-sm whitespace-nowrap" key={j}>
                        {item[field.key] != null ? (
                          field.conditions ? (
                            t(field.conditions[item[field.key]], { ns: 'table' }) || item[field.key]
                          ) : field.type === 'Date' ? (
                            new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-GB', {
                              dateStyle: 'short',
                              timeStyle: 'short',
                            }).format(new Date(item[field.key]))
                          ) : field.type === 'DateDay' ? (
                            new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-GB', {
                              dateStyle: 'short',
                            }).format(new Date(item[field.key]))
                          ) : field.type === 'Text' ? (
                            (item[field.key] + '').substring(0, 25) + '...'
                          ) : field.type === 'File' ? (
                            <DownloadButton downloadLink={item[field.key]} />
                          ) : field.type === 'Image' ? (
                            <a
                              href={item[field.key]}
                              className="font-bold"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {t<string>('click')}
                            </a>
                          ) : typeof item[field.key] === 'boolean' ? (
                            item[field.key] === true ? (
                              t('yes')
                            ) : (
                              t('no')
                            )
                          ) : (
                            // JSON.stringify(item[field.key]) //? use if data has unknown shape
                            item[field.key]
                          )
                        ) : field.key.split('.').length === 2 ? (
                          field.type === 'DateDay' ? (
                            new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-GB', {
                              dateStyle: 'short',
                            }).format(
                              new Date(item[field.key.split('.')[0]][field.key.split('.')[1]])
                            )
                          ) : (
                            item[field.key.split('.')[0]][field.key.split('.')[1]]
                          )
                        ) : (
                          '—'
                        )}
                      </td>
                    ))}
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      {resource?.show && (
                        <a
                          href={`${locale === 'fa' ? '/fa' : ''}/show/${resource.editId}/${
                            item._id
                          }`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <button title={t('preview')}>
                            <EyeIcon className="w-4 h-4" />
                          </button>
                        </a>
                      )}
                      {resource?.edit && (
                        <a
                          href={`${locale === 'fa' ? '/fa' : ''}/edit/${resource.editId}/${
                            item._id
                          }`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <button title={t('edit')}>
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="w-full py-3 border-b-2 last:border-0 border-slate-400">
                <td
                  className="p-4 text-sm text-center text-gray-600 align-middle dark:text-gray-400 whitespace-nowrap text-start"
                  colSpan={99}
                >
                  {t<string>('not_found')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalCount && totalCount > 15 && pageNumber && setPageNumber ? (
        <Pagination currentPage={pageNumber} paginate={setPageNumber} totalCount={totalCount} />
      ) : null}
    </>
  )
}
