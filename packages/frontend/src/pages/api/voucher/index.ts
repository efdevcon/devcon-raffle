import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyMessage } from 'viem'
import { getPublicClient } from '@/blockchain/publicClient'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { WinType } from '@/blockchain/abi/WinType'
import { ContractState } from '@/blockchain/abi/ContractState'
import { environment } from '@/config/environment'
import * as jose from 'jose'
import log from '@/utils/log'
import { buildVoucherClaimMessage } from '@/utils/buildVoucherClaimMessage'
import { GetVoucherResponse, GetVoucherWithSigRequestSchema } from '@/types/api/voucher'
import { nonceStore } from '@/utils/nonceStore'
import { ApiErrorResponse } from '@/types/api/error'
import { ContractFunctionExecutionError } from 'viem'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // GET /api/voucher
      // Get voucher code with signed JWT
      return getVoucherWithJwt(req, res)
    case 'POST':
      // POST /api/voucher
      // Submit a signature (of signed nonce) in order to get a voucher code
      return getVoucherWithSig(req, res)
    default:
      res.status(405).json({
        error: 'Method not allowed',
      } satisfies ApiErrorResponse)
  }
}

async function getVoucherWithJwt(req: NextApiRequest, res: NextApiResponse) {
  const voucherCodeJwt = req.cookies.voucherCodeJwt
  if (!voucherCodeJwt) {
    res.status(403).json({
      error: 'No JWT supplied',
    } satisfies GetVoucherResponse)
    return
  }

  const { payload } = await jose.jwtVerify(voucherCodeJwt, environment.authSecret, {
    requiredClaims: ['chainId', 'address'],
  })

  const winnerIndex = await getWinnerIndex(payload.chainId as number, payload.address as `0x${string}`)

  if (winnerIndex === -1) {
    res.status(403).json({
      error: `${payload.chainId}:${payload.address} is not qualified for a voucher code.`,
    } satisfies GetVoucherResponse)
    return
  }
  const voucherCode = environment.voucherCodes[winnerIndex]
  if (!voucherCode) {
    res.status(500).json({
      error: `Voucher not available for winner index ${winnerIndex}`,
    } satisfies GetVoucherResponse)
    return
  }

  res.status(200).json({
    voucherCode,
  } satisfies GetVoucherResponse)
}

async function getVoucherWithSig(req: NextApiRequest, res: NextApiResponse) {
  const reqParseResult = GetVoucherWithSigRequestSchema.safeParse(req.body)
  if (!reqParseResult.success) {
    res.status(400).json({
      error: reqParseResult.error.message,
    } satisfies GetVoucherResponse)
    return
  }

  const { chainId, userAddress, signature, nonce } = reqParseResult.data
  // Check & spend nonce
  if (!nonceStore.delete(nonce)) {
    res.status(403).json({
      error: `Unknown nonce: ${nonce}`,
    } satisfies GetVoucherResponse)
    return
  }

  const isValid = await verifyMessage({
    address: userAddress,
    signature,
    message: buildVoucherClaimMessage(chainId, userAddress, nonce),
  })
  if (!isValid) {
    res.status(403).json({
      error: 'Invalid signature',
    } satisfies GetVoucherResponse)
    return
  }

  const isReady = await isContractSettled(chainId)
  if (!isReady) {
    res.status(403).json({
      error: 'Contract not yet settled',
    } satisfies GetVoucherResponse)
    return
  }

  const winnerIndex = await getWinnerIndex(chainId, userAddress)
  if (winnerIndex === -1) {
    res.status(403).json({
      error: `${chainId}:${userAddress} is not qualified for a voucher code.`,
    } satisfies GetVoucherResponse)
    return
  }
  const voucherCode = environment.voucherCodes[winnerIndex]
  if (!voucherCode) {
    res.status(500).json({
      error: `Voucher not available for winner index ${winnerIndex}`,
    } satisfies GetVoucherResponse)
    return
  }

  // All good
  // Send back JWT for future requests
  const jwt = await new jose.SignJWT({ chainId, address: userAddress })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(environment.authSecret)
  res
    .status(200)
    .setHeader('Set-Cookie', `voucherCodeJwt=${jwt}; sameSite=none; secure=true;`)
    .json({
      voucherCode,
    } satisfies GetVoucherResponse)
}

async function isContractSettled(chainId: number): Promise<boolean> {
  const client = getPublicClient(chainId)
  // Check if auction & raffle are settled
  const state = await client.readContract({
    address: AUCTION_ADDRESSES[chainId as keyof typeof AUCTION_ADDRESSES],
    abi: AUCTION_ABI,
    functionName: 'getState',
  })
  return state === ContractState.RAFFLE_SETTLED
}

async function getWinnerIndex(chainId: number, userAddress: `0x${string}`): Promise<number> {
  const client = getPublicClient(chainId)

  // Check if address was a winner
  let bidderID: bigint
  try {
    ;({ bidderID } = await client.readContract({
      address: AUCTION_ADDRESSES[chainId as keyof typeof AUCTION_ADDRESSES],
      abi: AUCTION_ABI,
      functionName: 'getBid',
      args: [userAddress],
    }))
  } catch (err: unknown) {
    if (
      err instanceof ContractFunctionExecutionError &&
      err.shortMessage.includes('AuctionRaffle: no bid by given address')
    ) {
      return -1
    } else {
      throw err
    }
  }
  const winType = await client.readContract({
    address: AUCTION_ADDRESSES[chainId as keyof typeof AUCTION_ADDRESSES],
    abi: AUCTION_ABI,
    functionName: 'getBidWinType',
    args: [bidderID],
  })
  if (winType === WinType.LOSS) {
    return -1
  }

  // Get voucher code for address
  const auctionWinners = await client.readContract({
    address: AUCTION_ADDRESSES[chainId as keyof typeof AUCTION_ADDRESSES],
    abi: AUCTION_ABI,
    functionName: 'getAuctionWinners',
  })
  const raffleWinners = await client.readContract({
    address: AUCTION_ADDRESSES[chainId as keyof typeof AUCTION_ADDRESSES],
    abi: AUCTION_ABI,
    functionName: 'getRaffleWinners',
  })
  const winnerIndex = auctionWinners.concat(raffleWinners).findIndex((id) => id === bidderID)
  if (winnerIndex === -1) {
    log.error(`Invariant violation: ${userAddress} is a winner but not present in winners list onchain`)
    return -1
  }

  return winnerIndex
}
