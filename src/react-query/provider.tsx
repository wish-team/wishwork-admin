import { useStore } from '@/store/store'
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const checkStatusCode = (data: unknown) =>
  typeof data === 'object' && data !== null && 'statusCode' in data && data?.statusCode === 401

const queryClient = new QueryClient()
const ReactQueryProvider = ({
  children,
  dehydratedState,
}: {
  children: React.ReactNode
  dehydratedState: unknown
}) => {
  const loggedIn = useStore((state) => state.loggedIn)
  const logout = useStore((state) => state.logout)

  queryClient.setDefaultOptions({
    queries: {
      enabled: loggedIn,
      onSettled(data) {
        if (checkStatusCode(data)) {
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
      onSettled(data) {
        if (checkStatusCode(data)) {
          logout()
        }
      },
      retry: false,
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
