import type { ProfileResponse } from '@/types/react-query/profile'
import type { NextApiResponse } from 'next'
import type { NextApiRequest } from 'next'
import { token } from './login'

export default function handler(req: NextApiRequest, res: NextApiResponse<ProfileResponse>) {
  if (req.method !== 'GET')
    return res.status(405).json({ success: false, statusCode: 405, message: 'Method Not Allowed' })

  if (req.headers.authorization !== token)
    return res.status(401).json({ success: false, statusCode: 401, message: 'Unauthorized' })

  res.status(200).json({ success: true, email: 'wish@work.co', name: 'WishWork' })
}
