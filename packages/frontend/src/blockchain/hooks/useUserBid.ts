import { useAccount } from 'wagmi'
import { useBids } from '@/providers/BidsProvider'
import { useMemo } from 'react'
import { UserBid } from '@/types/bid'
import { useBidWinType } from './useBidWinType'

export const useUserBid = (): UserBid | undefined => {
  const { address } = useAccount()
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

  const winType = useBidWinType(bid?.bidderId)

  if (winType == undefined || !bid) {
    return undefined
  }

  return {
    ...bid,
    winType,
    claimed: false,
  }
}
