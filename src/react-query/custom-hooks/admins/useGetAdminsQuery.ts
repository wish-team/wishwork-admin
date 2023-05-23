import { RQ_KEYS } from '@/react-query/consts'
import type { GetAdmins } from '@/types/react-query/admins'
import { useStore } from '@/store/store'
import { useQuery } from '@tanstack/react-query'

export const getAdmins = async (token: string, pageNumber: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admins?page=${pageNumber}`, {
    headers: {
      token,
    },
  })

  return (await res.json()) as GetAdmins
}

const useGetAdminsQuery = (pageNumber: number, initialData: GetAdmins) => {
  const token = useStore((state) => state.token)

  return useQuery([RQ_KEYS.GET_ADMINS, pageNumber], () => getAdmins(token ?? '', pageNumber), {
    initialData,
  })
}

export default useGetAdminsQuery
