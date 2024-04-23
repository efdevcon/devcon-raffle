import { useUserBid } from '@/blockchain/hooks/useUserBid'
import { useEffect, useState } from 'react'
import { PlaceBidFlow } from './PlaceBid/PlaceBidFlow'

export const BidFlow = () => {
  const userBid = useUserBid()
  const [isTransactionViewLock, setTransactionViewLock] = useState(false)

  const [isInitialBid, setIsInitialBid] = useState<boolean>(!userBid)
  useEffect(() => {
    if (!isTransactionViewLock) {
      setIsInitialBid(!userBid)
    }
  }, [isTransactionViewLock, !userBid]) // eslint-disable-line react-hooks/exhaustive-deps

  return isInitialBid ? <PlaceBidFlow setTransactionViewLock={setTransactionViewLock} /> : <BumpBidPlaceholder />
}

export interface FlowProps {
  setTransactionViewLock: (value: boolean) => void
}

const BumpBidPlaceholder = () => <div />
