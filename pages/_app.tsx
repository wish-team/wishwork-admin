import ErrorBoundary from '@/components/ErrorBoundary'
import type { PersistedState } from '@/zustand/store'
import { initializeStore, Provider } from '@/zustand/store'
import type { SSRConfig } from 'next-i18next'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ReactQueryProvider from '../react-query/provider'
import '../styles/globals.scss'

function App({ Component, pageProps }: AppProps<{ initialState: Partial<PersistedState> }>) {
  const createStore = () => initializeStore(pageProps.initialState)

  const router = useRouter()

  // change html dir when locale is farsi
  const dir = router.locale === 'fa' ? 'rtl' : 'ltr'
  useEffect(() => {
    document.documentElement.dir = dir
  }, [dir])

  return (
    <ErrorBoundary>
      <Provider createStore={createStore}>
        <ReactQueryProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </ReactQueryProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default appWithTranslation<AppProps<{ initialState: Partial<PersistedState> } & SSRConfig>>(
  App
)
