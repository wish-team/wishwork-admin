import { useStore } from '@/store/store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Default({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const loggedIn = useStore((state) => state.loggedIn)

  useEffect(() => {
    if (loggedIn) {
      router.replace('/profile')
    }
  }, [loggedIn, router])

  return (
    <>
      {loggedIn ? null : (
        <div className="grid place-items-center">
          <main className="w-full max-w-sm px-4">{children}</main>
        </div>
      )}
    </>
  )
}
