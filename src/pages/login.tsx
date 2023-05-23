import BaseInput from '@/components/Base/BaseInput'
import getInitialState from '@/store/getInitialState'
import { useStore } from '@/store/store'
import type { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import PrimaryButton from '../components/Buttons/Primary'
import Minimal from '../layouts/Minimal'
import type { LoginResponse } from '../types/login'

const Login = () => {
  const router = useRouter()
  const authLogin = useStore((state) => state.login)

  const { t } = useTranslation('login')

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const login = async () => {
    setLoading(true)
    if (!new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
      setLoading(false)
      setMessage(t<string>('email_format_err'))
      return
    }

    setMessage('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const resData: LoginResponse = await res.json()

      if (res.status === 200) {
        authLogin(resData.token)
        router.push('/profile')
      } else if (res.status === 400) {
        setMessage(t<string>('invalid_credentials_err'))
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setMessage(t<string>('500_err'))
    }
  }
  return (
    <Minimal>
      <Head>
        <title>{t<string>('login_title')}</title>
      </Head>
      <form
        className="flex flex-col justify-center items-center min-h-screen gap-8"
        onSubmit={(e) => {
          e.preventDefault()
          login()
        }}
      >
        <h1 className="text-2xl font-extrabold">{t<string>('header')}</h1>

        <BaseInput
          id={t('email')}
          label={t<string>('email')}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <BaseInput
          id={t('password')}
          label={t<string>('password')}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {message}
        <PrimaryButton disabled={loading} type="submit">
          {t<string>('button')}
        </PrimaryButton>
      </form>
    </Minimal>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale, req }) => {
  return {
    props: {
      initialState: getInitialState(req.headers),
      ...(await serverSideTranslations(locale ?? '', ['login'])),
    },
  }
}

export default Login
