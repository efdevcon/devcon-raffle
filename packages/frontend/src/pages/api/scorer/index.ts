import { environment } from '@/config/environment'
import log from '@/utils/log'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SubmitAddressForScoringRequestSchema, SubmitAddressForScoringResponse } from '@/types/api/scorer'
import { ApiErrorResponse } from '@/types/api/error'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      // POST /api/scorer
      // Submit a user's address, with their signature, to passport for scoring
      return submitAddressForScoring(req, res)
    default:
      res.status(405).json({
        error: 'Method not allowed',
      } satisfies ApiErrorResponse)
  }
}

async function submitAddressForScoring(req: NextApiRequest, res: NextApiResponse) {
  const requestBodyResult = SubmitAddressForScoringRequestSchema.safeParse(req.body)
  if (!requestBodyResult.success) {
    res.status(400).json({
      error: `Could not parse request: ${requestBodyResult.error}`,
    } satisfies SubmitAddressForScoringResponse)
    return
  }
  const requestBody = requestBodyResult.data

  let gtcResult
  try {
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
    res.status(500).json({
      error: 'There was an error while trying to contact the Passport API',
    } satisfies SubmitAddressForScoringResponse)
    return
  }

  res.status(200).json({} satisfies SubmitAddressForScoringResponse)
}
