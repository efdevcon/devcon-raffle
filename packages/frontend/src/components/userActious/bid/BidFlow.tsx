import { useUserBid } from '@/blockchain/hooks/useUserBid'
import { useEffect, useState } from 'react'
import { PlaceBidFlow } from './PlaceBid/PlaceBidFlow'
import { BumpBidFlow } from './BumpBid/BumpBidFlow'

export const BidFlow = () => {
  const userBid = useUserBid()
  const [isTransactionViewLock, setTransactionViewLock] = useState(false)
  const userBidExists = !!userBid

  const [isInitialBid, setIsInitialBid] = useState<boolean>(!userBidExists)
  useEffect(() => {
    if (!isTransactionViewLock) {
      setIsInitialBid(!userBidExists)
    }
  }, [isTransactionViewLock, userBidExists])

  return isInitialBid ? <PlaceBidFlow setTransactionViewLock={setTransactionViewLock} /> : <BumpBidFlow />
}

export interface FlowProps {
  setTransactionViewLock: (value: boolean) => void
}
