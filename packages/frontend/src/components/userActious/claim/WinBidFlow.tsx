import { useMinimumBid } from '@/blockchain/hooks/useMinimumBid'
import { useEffect, useMemo, useState } from 'react'
import { UserBid } from '@/types/bid'
import { WinType } from '@/types/winType'
import { WinForm } from '@/components/userActious/claim/WinForm'
import { TxFlowSteps } from '@/components/auction/TxFlowSteps'
import { useAccount } from 'wagmi'
import { AuctionTransaction } from '@/components/auction/AuctionTransaction'
import { useClaimFunds } from '@/blockchain/hooks/useClaimFunds'

interface WinBidFlowProps {
  userBid: UserBid
}

export const WinBidFlow = ({ userBid }: WinBidFlowProps) => {
  const { address } = useAccount()
  const minimumBid = useMinimumBid()
  const [view, setView] = useState<TxFlowSteps>(TxFlowSteps.Placing)
  const claimAction = useClaimFunds(userBid.bidderId)

  useEffect(() => setView(TxFlowSteps.Placing), [address])

  const withdrawalAmount = useMemo(() => calculateWithdrawalAmount(userBid, minimumBid), [userBid, minimumBid])

  return (
    <>
      {view == TxFlowSteps.Review ? (
        <AuctionTransaction action={claimAction} amount={withdrawalAmount} view={view} setView={setView} />
      ) : (
        <WinForm userBid={userBid} withdrawalAmount={withdrawalAmount} setView={setView} />
      )}
    </>
  )
}

function calculateWithdrawalAmount(userBid: UserBid, minimumBid: bigint) {
  switch (userBid.winType) {
    case WinType.Auction:
      return BigInt(0)
    case WinType.Raffle:
      return userBid.amount - minimumBid
    default:
      return userBid.amount
  }
}
