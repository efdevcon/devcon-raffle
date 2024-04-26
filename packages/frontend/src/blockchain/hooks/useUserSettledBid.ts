import { useChainId, useReadContracts } from 'wagmi'
import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { Hex } from 'viem'
import { UserBid } from '@/types/bid'
import { useUserBid } from '@/blockchain/hooks/useUserBid'

export const useUserSettledBid = (): UserBid | undefined => {
  const chainId = useChainId()
  const bid = useUserBid()

  const { data } = useReadContracts({
    contracts: [
      {
        chainId,
        abi: AUCTION_ABI,
        address: AUCTION_ADDRESSES[chainId],
        functionName: 'getBid',
        args: [bid?.address as Hex],
      },
      {
        chainId,
        abi: AUCTION_ABI,
        address: AUCTION_ADDRESSES[chainId],
        functionName: 'getBidWinType',
        args: [bid?.bidderId as bigint],
      },
    ],
    allowFailure: false,
    query: {
      enabled: !!(bid?.address && bid?.bidderId),
    },
  })

  if (!data || !bid) {
    return undefined
  }

  return {
    ...bid,
    claimed: data[0].claimed,
    winType: data[1],
  }
}
