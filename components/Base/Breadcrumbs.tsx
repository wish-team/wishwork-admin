import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'

interface BreadcrumbsProps {
  items: {
    label: string
    href?: string
  }[]
}

export default function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center gap-1">
        {props.items.map((item, index) => (
          <li
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-400"
            key={index}
          >
            {index > 0 && (
              <>
                <ChevronRightIcon height="1.5em" className="rtl:hidden" />
                <ChevronLeftIcon height="1.5em" className="ltr:hidden" />
              </>
            )}

            <Link href={item.href ?? ''} passHref>
              <a
                href="idk"
                className={
                  !item.href
                    ? 'pointer-events-none cursor-default'
                    : 'hover:text-slate-900 dark:hover:text-slate-50'
                }
              >
                {item.label}
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
