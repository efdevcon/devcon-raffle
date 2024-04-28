import type { NextApiRequest, NextApiResponse } from 'next'
import { randomUUID } from 'crypto'
import { GetVoucherNonceResponse } from '@/types/api/voucher'
import { nonceStore } from '@/utils/nonceStore'
import { ApiErrorResponse } from '@/types/api/error'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // GET /api/voucher/nonce
      // Get a nonce that a user must sign in order to get their voucher code
      return getVoucherNonce(req, res)
    default:
      res.status(405).json({
        error: 'Method not allowed',
      } satisfies ApiErrorResponse)
  }
}

async function getVoucherNonce(_req: NextApiRequest, res: NextApiResponse) {
  const nonce = randomUUID()
  nonceStore.add(nonce)

  res.status(200).json({
    nonce,
  } satisfies GetVoucherNonceResponse)
}
