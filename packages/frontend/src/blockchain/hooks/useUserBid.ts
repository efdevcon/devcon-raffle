import { useAccount } from 'wagmi'
import { UserBid } from '@/types/bid'
import { useBidWinType } from './useBidWinType'
import { useChainId, useReadContract } from 'wagmi'
import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { Hex } from 'viem'
import { useMemo } from 'react'
import { useBids } from '@/providers/BidsProvider'

export const useUserBid = (): UserBid | undefined => {
  const { address } = useAccount()
  const chainId = useChainId()
  const { bidList } = useBids()

  const bid = useMemo(() => {
    if (!address) {
      return undefined
    }

    const userBidPlace = bidList.findIndex((bid) => bid.address === address)
    return userBidPlace >= 0
      ? {
          ...bidList[userBidPlace],
          place: userBidPlace + 1,
        }
      : undefined
  }, [address, bidList])

  const { data } = useReadContract({
    chainId,
    abi: AUCTION_ABI,
    address: AUCTION_ADDRESSES[chainId],
    functionName: 'getBid',
    args: [address as Hex],
    query: {
      enabled: !!address,
    },
  })
  const claimed = data?.claimed

  const winType = useBidWinType(bid?.bidderId)

  if (winType === undefined || !bid || claimed === undefined || !address) {
    return undefined
  }

  return {
    address,
    amount: bid.amount,
    bidderId: bid.bidderId,
    place: bid.place,
    claimed,
    winType,
    claimed: false,
  }
}
