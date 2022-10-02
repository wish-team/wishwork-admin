import Admins from '@/admin/resources/admins'
import Profile from '@/admin/resources/profile'

const Undertheground = {
  logo: '/favicon.png',
  resources: [Admins],
  profileResource: Profile,
}

type Field = {
  title: string
  type?: 'Date' | 'DateDay' | 'Text' | 'File' | 'Image' | 'Number'
  conditions?: Record<string, string>
  key: string
  editable?: true
  hideInTable?: true
  hideInAdd?: true
  showInAdd?: boolean
}

type Resource = {
  id: string
  editId?: string
  title: string
  editTitle?: string
  fields?: Field[]
  add: boolean
  edit: boolean
  show?: boolean
  profileResource?: boolean
  search?: { key: string; value: string }[]
  sort?: { key: string; value: string }[]
  group?: { key: string; value: string }[]
}

export default Undertheground

export type { Resource, Field }
