import type { NextApiResponse } from 'next'
import type { NextApiRequest } from 'next'

export const token = 'something-token-like'

export default function handler(req: NextApiRequest, res: NextApiResponse<{ token: string }>) {
  if (req.method !== 'POST') return res.status(400)

  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400)
  }

  res.status(200).json({ token })
}
