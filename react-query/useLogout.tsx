import { useStore } from '@/zustand/store'

const useLogout = (logout?: true) => {
  const logoutFunction = useStore((state) => state.logout)

  if (logout) {
    logoutFunction()
  }
}

export default useLogout
