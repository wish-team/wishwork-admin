import type { GetAdmins } from '@/types/react-query/admins'
import type { NextApiResponse } from 'next'
import type { NextApiRequest } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<GetAdmins>) {
  res.status(200).json({
    admins: [
      { _id: '1', createdAt: new Date(), email: 'admin@wishwork.co', name: 'Admin 1' },
      { _id: '2', createdAt: new Date(), email: 'admin2@wishwork.co', name: 'Admin 2' },
      { _id: '3', createdAt: new Date(), email: 'admin3@wishwork.co', name: 'Admin 3' },
    ],
    totalCount: 3,
    totalPages: 1,
  })
}
