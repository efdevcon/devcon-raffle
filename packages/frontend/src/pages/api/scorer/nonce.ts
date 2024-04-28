import { environment } from '@/config/environment'
import log from '@/utils/log'
import type { NextApiRequest, NextApiResponse } from 'next'
import { GetPassportScorerNonceResponse } from '@/types/api/scorer'
import { ApiErrorResponse } from '@/types/api/error'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // GET /api/scorer
      // Get a nonce that a user must sign in order to submit their address for passport scoring
      return getPassportScorerNonce(req, res)
    default:
      res.status(405).json({
        error: 'Method not allowed',
      } satisfies ApiErrorResponse)
  }
}

async function getPassportScorerNonce(_req: NextApiRequest, res: NextApiResponse) {
  let gtcResult
  try {
    const gtcResponse = await fetch(new URL('/registry/v2/signing-message', environment.gtcScorerApiBaseUri).href, {
      method: 'GET',
      headers: {
        'X-API-KEY': environment.gtcScorerApiKey,
      },
    })
    gtcResult = await gtcResponse.json()
  } catch (err) {
    log.error(err)
    res.status(500).json({
      error: 'There was an error while trying to contact the Passport API',
    } satisfies GetPassportScorerNonceResponse)
    return
  }
  const { message, nonce } = gtcResult
  res.status(200).json({
    message,
    nonce,
  } satisfies GetPassportScorerNonceResponse)
}
