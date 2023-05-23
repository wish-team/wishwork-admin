import ErrorBoundary from '@/components/ErrorBoundary'
import StoreProvider from '@/store/StoreProvider'
import type { PersistedState } from '@/store/store'
import type { SSRConfig } from 'next-i18next'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ReactQueryProvider from '../react-query/provider'
import '../styles/globals.scss'

function App({
  Component,
  pageProps: { initialState, dehydratedState, ...pageProps },
}: AppProps<{ initialState: PersistedState; dehydratedState: unknown }>) {
  const router = useRouter()

  // change html dir when locale is farsi
  const dir = router.locale === 'fa' ? 'rtl' : 'ltr'
  useEffect(() => {
    document.documentElement.dir = dir
  }, [dir])

  return (
    <ErrorBoundary>
      <StoreProvider {...initialState}>
        <ReactQueryProvider dehydratedState={dehydratedState}>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </ReactQueryProvider>
      </StoreProvider>
    </ErrorBoundary>
  )
}

export default appWithTranslation<
  AppProps<{ initialState: PersistedState; dehydratedState: unknown } & SSRConfig>
>(App)
