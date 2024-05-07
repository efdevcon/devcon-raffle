import { useUserBid } from '@/blockchain/hooks/useUserBid'
import { useEffect, useState } from 'react'
import { PlaceBidFlow } from './PlaceBid/PlaceBidFlow'
import { BumpBidFlow } from './BumpBid/BumpBidFlow'
import { GitcoinFlow } from '../gitcoin/GitcointFlow'
import { GetScoreResponseSuccess } from '@/types/api/scorer'

export const BidFlow = () => {
  const userBid = useUserBid()
  const [isTransactionViewLock, setTransactionViewLock] = useState(false)
  const userBidExists = !!userBid
  const [gitcoinCredentials, setGitcoinCredentials] = useState<GetScoreResponseSuccess | undefined>()
  const [gitcoinSettled, setGitcoinSettled] = useState<boolean>(false)

  const [isInitialBid, setIsInitialBid] = useState<boolean>(!userBidExists)
  useEffect(() => {
    if (!isTransactionViewLock) {
      setIsInitialBid(!userBidExists)
    }
  }, [isTransactionViewLock, userBidExists])

  if (!gitcoinCredentials || !gitcoinSettled) {
    return (
      <GitcoinFlow
        setGitcoinCredentials={setGitcoinCredentials}
        gitcoinCredentials={gitcoinCredentials}
        gitcoinSettled={() => setGitcoinSettled(true)}
      />
    )
  }

  return isInitialBid ? <PlaceBidFlow setTransactionViewLock={setTransactionViewLock} /> : <BumpBidFlow />
}

export interface FlowProps {
  setTransactionViewLock: (value: boolean) => void
}
