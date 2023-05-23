import type { Resource } from '../Undertheground'

const Admins: Resource = {
  id: 'admins',
  editId: 'admin',
  title: 'nav.admins',
  editTitle: 'admin',
  add: false,
  edit: false,
  fields: [
    { title: 'admin.email', key: 'email' },
    { title: 'admin.name', key: 'name' },
    { title: 'admin.createdAt', key: 'createdAt', type: 'Date' },
  ],
}

export default Admins
