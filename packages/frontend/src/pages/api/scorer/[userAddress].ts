import { EthereumAddressSchema } from '@/types/EthereumAddress'
import { attestScore } from '@/utils/attestScore'
import log from '@/utils/log'
import type { NextApiRequest, NextApiResponse } from 'next'
import { environment } from '@/config/environment'
import { urls } from '@/constants/urls'
import { GetScoreResponse } from '@/types/api/scorer'
import { ApiErrorResponse } from '@/types/api/error'
import z from 'zod'
import { RetrievePassportScoreResponseSchema } from '@/types/passport/scorer'

const gtcScorerId = environment.gtcScorerId
const gtcScorerApiKey = environment.gtcScorerApiKey

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // GET /api/scorer/[userAddress]?chainId=31337
      // Get [userAddress]'s passport score (might still be processing). Score must be submitted first.
      return getScore(req, res)
    default:
      res.status(405).json({
        error: 'Method not allowed',
      } satisfies ApiErrorResponse)
  }
}

async function getScore(req: NextApiRequest, res: NextApiResponse<GetScoreResponse>) {
  const chainIdResult = z.number().safeParse(Number(req.query.chainId))
  if (!chainIdResult.success) {
    return res.status(400).json({
      status: 'error',
      error: `Could not parse chainId: ${chainIdResult.error.message}`,
    } satisfies GetScoreResponse)
  }
  const userAddressResult = EthereumAddressSchema.safeParse(req.query.userAddress)
  if (!userAddressResult.success) {
    return res.status(400).json({
      status: 'error',
      error: `Could not parse userAddress: ${userAddressResult.error.message}`,
    } satisfies GetScoreResponse)
  }
  const chainId = chainIdResult.data
  const userAddress = userAddressResult.data

  let gtcResult
  try {
    const gtcResponse = await fetch(
      new URL(`/registry/v2/score/${gtcScorerId}/${userAddress}`, urls.gtcScorerApiBaseUri).href,
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
      } satisfies GetScoreResponse)
    } else {
      log.error(err)
      res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      } satisfies GetScoreResponse)
    }
    return
  }

  const parsedGtcResult = RetrievePassportScoreResponseSchema.safeParse(gtcResult)
  if (!parsedGtcResult.success) {
    log.error(`Could not parse Gitcoin Passport response: ${parsedGtcResult.error.message}`)
    res.status(500).json({
      status: 'error',
      error: 'There was an error while parsing the Passport analysis response',
    } satisfies GetScoreResponse)
    return
  }
  const analysisData = parsedGtcResult.data
  if (analysisData.status === 'ERROR') {
    log.error(analysisData.error)
    res.status(500).json({
      status: 'error',
      error: analysisData.error,
    } satisfies GetScoreResponse)
    return
  }

  // Parse && sum stamp scores
  const rawScore = Object.values(analysisData.stamp_scores)
    .map((value) => {
      if (typeof value !== 'number') {
        return 0
      }
      return value
    })
    .reduce((p, c) => p + c, 0)

  if (['PROCESSING', 'BULK_PROCESSING'].includes(analysisData.status)) {
    res.status(202).json({
      status: 'processing',
    } satisfies GetScoreResponse)
  } else {
    // `rawScore` is delivered as a floating point number, between 0 and 100 inclusive
    // Scale up to 8 decimals to be encoded as uint256
    const score = BigInt(Math.floor(rawScore * 10 ** 8))
    // Sign EIP-712 attestation
    const { digest, signature } = await attestScore(chainId, userAddress, score)
    res.status(200).json({
      status: 'done',
      address: userAddress,
      score: String(score),
      digest,
      signature,
    } satisfies GetScoreResponse)
  }
}
