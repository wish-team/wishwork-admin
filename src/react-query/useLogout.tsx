import { useStore } from '@/store/store'

const useLogout = (logout?: true) => {
  const logoutFunction = useStore((state) => state.logout)

  if (logout) {
    logoutFunction()
  }
}

export default useLogout
