import { useTranslation } from 'next-i18next'
import type { ReactNode } from 'react'
import GridCTA from './Buttons/GridCTA'

type ContainerProps = {
  title: string
  children: ReactNode
  button?: {
    text: string
    onClick: () => void
  }
  exportBTN?: {
    onClick: () => Promise<void>
    loading: boolean
  }
  cols?: boolean
}

export default function ViewContainer({
  children,
  title,
  button,
  cols,
  exportBTN,
}: ContainerProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-extrablack text-right">{t<string>(title)}</h1>
        {button && <GridCTA onClick={button.onClick}>{button.text}</GridCTA>}

        {exportBTN && (
          <GridCTA onClick={exportBTN.loading ? () => {} : exportBTN.onClick}>
            {exportBTN.loading ? t<string>('exporting') : t<string>('export')}
          </GridCTA>
        )}
      </div>

      <div className={cols ? 'grid grid-cols-1 sm:grid-cols-2 gap-8' : 'flex flex-col gap-8'}>
        {children}
      </div>
    </div>
  )
}
