import { useAccount } from 'wagmi'
import { useBids } from '@/providers/BidsProvider'
import { useMemo } from 'react'
import { Bid } from '@/types/bid'

export const useUserBid = (): Bid | undefined => {
  const { address } = useAccount()
  const { bidList } = useBids()

  return useMemo(() => bidList.find((bid) => bid.address === address), [address, bidList])
}
