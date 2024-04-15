import { useChainId, useReadContracts } from 'wagmi'
import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { useMemo } from 'react'

export const useReadAuctionParams = () => {
  const chainId = useChainId()
  const address = AUCTION_ADDRESSES[chainId]
  const calls = params.map(
    (param) =>
      ({
        address,
        abi: AUCTION_ABI,
        functionName: param,
      } as const),
  )

  const { data } = useReadContracts({
    contracts: calls,
    allowFailure: false,
  })

  return useMemo(
    () => ({
      biddingStartTime: data?.[0],
      biddingEndTime: data?.[1],
      auctionWinnersCount: data ? Number(data[2]) : undefined,
      raffleWinnersCount: data ? Number(data[3]) : undefined,
    }),
    [data],
  )
}

const params = ['biddingStartTime', 'biddingEndTime', 'auctionWinnersCount', 'raffleWinnersCount'] as const
