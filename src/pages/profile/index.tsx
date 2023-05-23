import Breadcrumbs from '@/components/Base/Breadcrumbs'
import useGetProfileQuery, {
  getProfile,
} from '@/react-query/custom-hooks/profile/useGetProfileQuery'
import useLogout from '@/react-query/useLogout'
import type { ProfileSuccessRes } from '@/types/react-query/profile'
import getInitialState from '@/store/getInitialState'
import type { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import type { Resource } from '../../admin/Undertheground'
import Undertheground from '../../admin/Undertheground'
import ViewContainer from '../../components/ViewContainer'
import Default from '../../layouts/Default'

type Props = {
  resource: Resource
  profile: ProfileSuccessRes
  logout?: true
}

const Profile = ({ resource, profile, logout }: Props) => {
  useLogout(logout)
  const { t } = useTranslation(['common', 'profile'])

  const { data } = useGetProfileQuery(profile)

  return (
    <Default id={resource.id}>
      <Head>
        <title>{t<string>('nav.profile')}</title>
      </Head>

      <Breadcrumbs items={[{ label: t('nav.home'), href: '/' }, { label: t('nav.profile') }]} />

      <ViewContainer title={resource.title}>
        <div className="flex flex-col gap-4 p-4 bg-white dark:bg-slate-800 dark:text-slate-300">
          <h2 className="text-2xl font-extrablack">{t<string>('profile', { ns: 'profile' })}</h2>

          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {data &&
              (Object.keys(data) as Array<keyof typeof data>).map((key, index) => (
                <div key={index} className="flex flex-col p-4 h-28 bg-slate-100 dark:bg-slate-700">
                  <h4 className="text-lg font-light">{t<string>(key, { ns: 'profile' })}</h4>
                  <h5 className="text-xl font-extrablack">{data[key]}</h5>
                </div>
              ))}
          </div>
        </div>
      </ViewContainer>
    </Default>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale, req }) => {
  const resource = Undertheground.profileResource

  const initialState = getInitialState(req.headers)
  const translations = await serverSideTranslations(locale ?? '', ['common', 'profile'])

  if (!initialState.token) {
    return {
      props: {
        resource,
        ...translations,
        logout: true,
        initialState,
      },
    }
  }

  const profile = await getProfile(initialState.token)
  return {
    props: {
      resource,
      profile,
      initialState,
      ...translations,
    },
  }
}

export default Profile
