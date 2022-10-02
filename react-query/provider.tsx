import { useStore } from '@/zustand/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
const ReactQueryProvider = ({ children }) => {
  const loggedIn = useStore((state) => state.loggedIn)
  const logout = useStore((state) => state.logout)

  queryClient.setDefaultOptions({
    queries: {
      enabled: loggedIn,
      onSettled(data: { statusCode?: number }) {
        if (data?.statusCode === 401) {
          logout()
        }
      },
      retry(failureCount) {
        if (failureCount > 1) {
          return false
        }
        return true
      },
      keepPreviousData: true,
    },
    mutations: {
      onSettled(data: { statusCode?: number }) {
        if (data?.statusCode === 401) {
          logout()
        }
      },
      retry: false,
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
