import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      // POST /api/logout
      // Clear connect address-specific cookies
      return logout(req, res)
    default:
      res.status(405).end()
  }
}

export async function logout(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', 'voucherCodeJwt=deleted; Expires=Thu, 01 Jan 1970 00:00:00 GMT')
  res.status(200).end()
}
