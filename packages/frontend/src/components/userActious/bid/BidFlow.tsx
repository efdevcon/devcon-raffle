import { useUserBid } from '@/blockchain/hooks/useUserBid'
import { useEffect, useState } from 'react'
import { BumpBidFlow } from './BumpBid/BumpBidFlow'
import { InitialBidFlow } from './InitialBidFlow'

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

  return isInitialBid ? <InitialBidFlow setTransactionViewLock={setTransactionViewLock} /> : <BumpBidFlow />
}
