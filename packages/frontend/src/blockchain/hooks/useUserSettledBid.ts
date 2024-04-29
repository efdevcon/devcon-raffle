import { useChainId, useReadContracts } from 'wagmi'
import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { Hex } from 'viem'
import { UserBid } from '@/types/bid'
import { useUserBid } from '@/blockchain/hooks/useUserBid'

export const useUserSettledBid = () => {
  const chainId = useChainId()
  const bid = useUserBid()

  const { data, refetch } = useReadContracts({
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

  const userBid: UserBid | undefined =
    !data || !bid
      ? undefined
      : {
          ...bid,
          claimed: data[0].claimed,
          winType: data[1],
        }

  return { userBid, refetch }
}
