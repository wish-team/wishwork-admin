import type { WorkBook, WritingOptions, XLSX$Utils } from 'xlsx'

export interface WriteFile {
  (data: WorkBook, filename: string, opts?: WritingOptions): unknown
}

const exportToXSLX = async (
  token: string,
  data: string,
  writeFile: WriteFile,
  utils: XLSX$Utils
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/export/${data}`, {
    headers: {
      token,
    },
  })

  if (res.status !== 200) {
    throw new Error('Something Went Wrong')
  }

  const json = await res.json()

  const worksheet = utils.json_to_sheet(json)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, `7o8 ${data} Sheet`)
  writeFile(workbook, `${data}.xlsx`)
}

export default exportToXSLX
