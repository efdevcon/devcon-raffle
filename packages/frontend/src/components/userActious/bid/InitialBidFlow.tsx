import { GitcoinCredentials } from '@/types/passport/GticoinCredentials'
import { useState } from 'react'
import { GitcoinFlow } from '../gitcoin/GitcoinFlow'
import { PlaceBidFlow } from './PlaceBid/PlaceBidFlow'

interface Props {
  setTransactionViewLock: (value: boolean) => void
}

export const InitialBidFlow = ({ setTransactionViewLock }: Props) => {
  const [gitcoinCredentials, setGitcoinCredentials] = useState<GitcoinCredentials | undefined>()
  const [gitcoinSettled, setGitcoinSettled] = useState<boolean>(false)

  if (!gitcoinCredentials || !gitcoinSettled) {
    return (
      <GitcoinFlow
        setGitcoinCredentials={setGitcoinCredentials}
        gitcoinCredentials={gitcoinCredentials}
        gitcoinSettled={() => setGitcoinSettled(true)}
      />
    )
  }

  return <PlaceBidFlow setTransactionViewLock={setTransactionViewLock} gitcoinCredentials={gitcoinCredentials} />
}
