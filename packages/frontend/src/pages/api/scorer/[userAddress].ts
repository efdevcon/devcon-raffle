import { EthereumAddressSchema } from '@/types/EthereumAddress'
import { attestScore } from '@/utils/attestScore'
import log from '@/utils/log'
import type { NextApiRequest, NextApiResponse } from 'next'
import { environment } from '@/config/environment'
import { GetScoreResponse } from '@/types/api/scorer'
import z from 'zod'

const gtcScorerId = environment.gtcScorerId
const gtcScorerApiBaseUri = environment.gtcScorerApiBaseUri
const gtcScorerApiKey = environment.gtcScorerApiKey

// GET /api/scorer/[userAddress]?chainId=31337
// Get [userAddress]'s passport score (might still be processing). Score must be submitted first.
export default async function handler(req: NextApiRequest, res: NextApiResponse<GetScoreResponse>) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  const chainIdResult = z.number().safeParse(Number(req.query.chainId))
  if (!chainIdResult.success) {
    return res.status(400).end() // TODO
  }
  const userAddressResult = EthereumAddressSchema.safeParse(req.query.userAddress)
  if (!userAddressResult.success) {
    return res.status(400).end() // TODO
  }
  const chainId = chainIdResult.data
  const userAddress = userAddressResult.data

  let gtcResult
  try {
    const gtcResponse = await fetch(
      new URL(`/registry/v2/score/${gtcScorerId}/${userAddress}`, gtcScorerApiBaseUri).href,
      {
        headers: {
          'X-API-KEY': gtcScorerApiKey,
        },
      },
    )
    gtcResult = await gtcResponse.json()
    if (gtcResponse.status !== 200) {
      throw new Error(gtcResult.detail)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // The scorer will return a 400 when the score has not been submitted for querying
    if (err.message.startsWith('Unable to get score')) {
      res.status(500).json({
        status: 'error',
        error: `Unable to get score for ${userAddress}. Submit the score before querying.`,
      })
    } else {
      log.error(err)
      res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      })
    }
    return
  }

  // Parse && sum stamp scores
  const { error, address, stamp_scores, status } = gtcResult
  const rawScore = stamp_scores
    ? Object.values(stamp_scores)
        .map((value) => {
          if (typeof value !== 'number') {
            return 0
          }
          return value
        })
        .reduce((p, c) => p + c, 0)
    : 0

  if (error) {
    log.error(error)
    res.status(500).json({
      status: 'error',
      error,
    })
  } else if (status === 'PROCESSING' || status === 'BULK_PROCESSING') {
    res.status(202).json({
      status,
    })
  } else {
    // `rawScore` is delivered as a floating point number, between 0 and 100 inclusive
    // Scale up to 8 decimals to be encoded as uint256
    const score = BigInt(Math.floor(rawScore * 10 ** 8))
    // Sign EIP-712 attestation
    const { digest, signature } = await attestScore(chainId, address, score)
    const result: GetScoreResponse = {
      status,
      address,
      score: String(score),
      digest,
      signature,
    }
    res.status(200).send(result)
  }
}
