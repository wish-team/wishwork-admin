import { useStore } from '@/zustand/store'
import { useState } from 'react'
import type { XLSX$Utils } from 'xlsx'
import type { WriteFile } from './exportToXSLX.function'
import exportToXSLX from './exportToXSLX.function'

const useExportFile = (data: string) => {
  const [loading, setLoading] = useState(false)
  const token = useStore((state) => state.token)

  const exportBTNClickHandler = async (writeFile: WriteFile, utils: XLSX$Utils) => {
    setLoading(true)
    try {
      token && (await exportToXSLX(token, data, writeFile, utils))
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line no-console
        console.error('Export to XSLX Error:', error.message)
      }
    }
    setLoading(false)
  }

  return { exportBTNClickHandler, loading }
}

export default useExportFile
