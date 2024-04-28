import { EthereumAddressSchema } from '@/types/EthereumAddress'
import { attestScore } from '@/utils/attestScore'
import log from '@/utils/log'
import type { NextApiRequest, NextApiResponse } from 'next'
import { environment } from '@/config/environment'
import { GetScoreResponse } from '@/types/api/scorer'
import { ApiErrorResponse } from '@/types/api/error'
import z from 'zod'
import { PassportAnalysisResponseSchema } from '@/types/passport/analysis'

const gtcScorerApiBaseUri = environment.gtcScorerApiBaseUri
const gtcScorerApiKey = environment.gtcScorerApiKey

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // GET /api/scorer/analysis/[userAddress]
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
    // NB: This endpoint may change
    const gtcResponse = await fetch(new URL(`/passport/analysis/${userAddress}`, gtcScorerApiBaseUri).href, {
      headers: {
        'X-API-KEY': gtcScorerApiKey,
      },
    })
    gtcResult = await gtcResponse.json()
    if (gtcResponse.status !== 200) {
      throw new Error(gtcResult.detail)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    log.error(err)
    res.status(500).json({
      status: 'error',
      error: 'Internal server error',
    } satisfies GetScoreResponse)
    return
  }

  const analysisResult = PassportAnalysisResponseSchema.safeParse(gtcResult)
  if (!analysisResult.success) {
    log.error(`Could not parse analysis response: ${analysisResult.error.message}`)
    res.status(500).json({
      status: 'error',
      error: 'There was an error while parsing the Passport analysis response',
    } satisfies GetScoreResponse)
    return
  }

  // `rawScore` is delivered as a number (integer?), between 0 and 100 inclusive
  // Scale up to 8 decimals to be encoded as uint256
  const rawScore = analysisResult.data.details.models.ethereum_activity.score
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
