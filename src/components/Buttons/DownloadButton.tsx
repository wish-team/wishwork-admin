import { useStore } from '@/store/store'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

const DownloadButton = ({ downloadLink }: { downloadLink: string }) => {
  const [fetching, setFetching] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const token = useStore((state) => state.token)

  const { t } = useTranslation('common')

  const clickHandler = async () => {
    setFetching(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files?key=${downloadLink}`, {
        headers: { token: token ?? '' },
      })
      if (res.status !== 200) {
        setErrorMsg(t<string>('try_again'))
        setTimeout(() => setErrorMsg(''), 1500)
        setFetching(false)
        return
      }
      const link = await res.text()

      const hiddenLink = document.createElement('a')
      hiddenLink.href = link
      hiddenLink.target = '_blank'
      hiddenLink.rel = 'noreferrer noopener'

      document.body.appendChild(hiddenLink)
      hiddenLink.click()
      hiddenLink.remove()
    } catch (error) {
      setErrorMsg(t<string>('try_again'))
      setTimeout(() => setErrorMsg(''), 1500)
    }
    setFetching(false)
  }

  return (
    <button disabled={fetching || !!errorMsg} onClick={clickHandler} className="font-bold">
      {fetching ? t<string>('downloading') : errorMsg ? errorMsg : t<string>('download')}
    </button>
  )
}

export default DownloadButton
