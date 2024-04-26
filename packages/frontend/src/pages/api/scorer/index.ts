import { environment } from '@/config/environment'
import log from '@/utils/log'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SubmitAddressForScoringRequestSchema } from '@/types/api/scorer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      // POST /api/scorer
      // Submit a user's address, with their signature, to passport for scoring
      return submitAddressForScoring(req, res)
    default:
      res.status(405).end()
  }
}

export async function submitAddressForScoring(req: NextApiRequest, res: NextApiResponse) {
  let gtcResult
  try {
    const requestBody = SubmitAddressForScoringRequestSchema.parse(req.body)
    const gtcResponse = await fetch(new URL('/registry/v2/submit-passport', environment.gtcScorerApiBaseUri).href, {
      method: 'POST',
      headers: {
        'X-API-KEY': environment.gtcScorerApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scorer_id: environment.gtcScorerId,
        address: requestBody.userAddress,
        signature: requestBody.signature,
        nonce: requestBody.nonce,
      }),
    })
    gtcResult = await gtcResponse.json()
    if (gtcResponse.status !== 200 || gtcResult.error) {
      throw new Error(gtcResult.detail)
    }
  } catch (err) {
    log.error(err)
    res.status(500).end()
    return
  }

  res.status(200).end()
}
