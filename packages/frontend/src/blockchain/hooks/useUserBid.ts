import { useAccount } from 'wagmi'
import { UserBid } from '@/types/bid'
import { useBidWinType } from './useBidWinType'
import { useBid } from './useBid'

export const useUserBid = (): UserBid | undefined => {
  const { address } = useAccount()
  const { bid } = useBid(address)
  const winType = useBidWinType(bid?.bidderId)

  if (winType == undefined || !bid) {
    return undefined
  }

  return {
    ...bid,
    winType,
  }
}
