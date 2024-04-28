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

export async function getVoucherWithJwt(req: NextApiRequest, res: NextApiResponse) {
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

  const voucherCodeResult = await getVoucherCode(payload.chainId as number, payload.address as `0x${string}`)
  if (!voucherCodeResult.isWinner) {
    res.status(403).json({
      error: `${payload.chainId}:${payload.address} did not win a ticket!`,
    } satisfies GetVoucherResponse)
    return
  }

  res.status(200).json({
    voucherCode: voucherCodeResult.voucherCode,
  } satisfies GetVoucherResponse)
}

export async function getVoucherWithSig(req: NextApiRequest, res: NextApiResponse) {
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

  const voucherCodeResult = await getVoucherCode(chainId, userAddress)
  if (!voucherCodeResult.isWinner) {
    res.status(403).json({
      error: `${chainId}:${userAddress} did not win a ticket!`,
    } satisfies GetVoucherResponse)
    return
  }

  // All good
  // Send back JWT for future requests
  const jwt = await new jose.SignJWT({ chainId, address: userAddress })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(environment.authSecret)
  res.setHeader('Set-Cookie', `voucherCodeJwt=${jwt}; sameSite=none; secure=true;`)
  res.status(200)
  res.json({
    voucherCode: voucherCodeResult.voucherCode,
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

type GetVoucherCodeResult =
  | {
      isWinner: false
    }
  | {
      isWinner: true
      voucherCode: string
    }

async function getVoucherCode(chainId: number, userAddress: `0x${string}`): Promise<GetVoucherCodeResult> {
  const client = getPublicClient(chainId)

  // Check if address was a winner
  const { bidderID } = await client.readContract({
    address: AUCTION_ADDRESSES[chainId as keyof typeof AUCTION_ADDRESSES],
    abi: AUCTION_ABI,
    functionName: 'getBid',
    args: [userAddress],
  })
  const winType = await client.readContract({
    address: AUCTION_ADDRESSES[chainId as keyof typeof AUCTION_ADDRESSES],
    abi: AUCTION_ABI,
    functionName: 'getBidWinType',
    args: [bidderID],
  })
  if (winType === WinType.LOSS) {
    return {
      isWinner: false,
    }
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
    return {
      isWinner: false,
    }
  }

  return {
    isWinner: true,
    voucherCode: environment.voucherCodes[winnerIndex],
  }
}
