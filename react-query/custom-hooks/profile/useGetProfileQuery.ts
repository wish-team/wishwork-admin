import { RQ_KEYS } from '@/react-query/consts'
import type { ProfileSuccessRes } from '@/types/react-query/profile'
import { useStore } from '@/zustand/store'
import { useQuery } from '@tanstack/react-query'

export const getProfile = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
    headers: {
      authorization: token,
    },
  })

  return (await res.json()) as ProfileSuccessRes
}

const useGetProfileQuery = (initialData: ProfileSuccessRes) => {
  const token = useStore((state) => state.token)

  return useQuery([RQ_KEYS.GET_PROFILE], () => getProfile(token ?? ''), {
    initialData,
    select: (data) => {
      return {
        email: data.email,
        name: data.name,
      }
    },
  })
}

export default useGetProfileQuery
