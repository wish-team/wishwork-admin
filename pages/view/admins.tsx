import type { Resource } from '@/admin/Undertheground'
import Undertheground from '@/admin/Undertheground'
import Breadcrumbs from '@/components/Base/Breadcrumbs'
import DataGrid from '@/components/DataGrid'
import ViewContainer from '@/components/ViewContainer'
import Default from '@/layouts/Default'
import useGetAdminsQuery, { getAdmins } from '@/react-query/custom-hooks/admins/useGetAdminsQuery'
import useLogout from '@/react-query/useLogout'
import type { GetAdmins } from '@/types/react-query/admins'
import getInitialState from '@/zustand/getInitialState'
import type { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useState } from 'react'

type Props = {
  resource: Resource
  admins: GetAdmins
  logout?: true
}

const Admins = ({ resource, admins, logout }: Props) => {
  useLogout(logout)

  const [pageNumber, setPageNumber] = useState(1)
  const { t } = useTranslation()

  const { isLoading, data } = useGetAdminsQuery(pageNumber, admins)

  return (
    <Default id={resource.id}>
      <Head>
        <title>{t<string>('nav.admins')}</title>
      </Head>

      <Breadcrumbs items={[{ label: t('nav.home'), href: '/' }, { label: t('nav.admins') }]} />

      <ViewContainer title={resource.title}>
        {data && (
          <DataGrid
            resource={resource}
            data={data.admins}
            loading={isLoading}
            totalCount={data.totalCount}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        )}
      </ViewContainer>
    </Default>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale, req }) => {
  const resource = Undertheground.resources.find((item) => item.id === 'admins')

  const initialState = getInitialState(req.headers)

  const translations = await serverSideTranslations(locale ?? '', ['common', 'table'])

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

  const admins = await getAdmins(initialState.token, 1)

  return {
    props: {
      admins,
      initialState,
      resource,
      ...translations,
    },
  }
}

export default Admins
