import { useAccount } from 'wagmi'
import { useBids } from '@/providers/BidsProvider'
import { useMemo } from 'react'
import { BidWithPlace } from '@/types/bid'

export const useUserBid = (): BidWithPlace | undefined => {
  const { address } = useAccount()
  const { bidList } = useBids()

  return useMemo(() => {
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
}
