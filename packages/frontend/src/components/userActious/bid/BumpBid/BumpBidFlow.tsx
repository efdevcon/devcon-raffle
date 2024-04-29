import { useMemo, useState, useEffect } from 'react'
import { useUserBid } from '@/blockchain/hooks/useUserBid'
import { useAccount } from 'wagmi'
import { TxFlowSteps } from '@/components/auction/TxFlowSteps'
import { useBumpBid } from './useBumpBid'
import { formatEther, parseEther } from 'viem'
import { AuctionTransaction } from '@/components/auction/AuctionTransaction'
import { BumpBidForm } from './BumpBidForm'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'

export const BumpBidFlow = () => {
  const { address } = useAccount()
  const userBid = useUserBid()
  const minimumIncrement = useMinimumIncrement()
  const [view, setView] = useState<TxFlowSteps>(TxFlowSteps.Placing)
  const [bumpAmount, setBumpAmount] = useState(formatEther(minimumIncrement))
  const parsedBumpAmount = useMemo(() => parseEther(bumpAmount), [bumpAmount])
  const bumpAction = useBumpBid(parsedBumpAmount)
  const newBidAmount = useMemo(() => userBid && userBid.amount + parsedBumpAmount, [parsedBumpAmount, userBid])

  useEffect(() => setView(TxFlowSteps.Placing), [address])
  useEffect(() => setBumpAmount(formatEther(minimumIncrement)), [minimumIncrement])
  useEffect(() => {
    if (bumpAction.status == 'success') {
      setBumpAmount(formatEther(minimumIncrement))
    }
  }, [bumpAction.status, minimumIncrement])

  return (
    <>
      {view === TxFlowSteps.Placing ? (
        <BumpBidForm
          userBid={userBid}
          newBidAmount={newBidAmount}
          bumpAmount={bumpAmount}
          parsedBumpAmount={parsedBumpAmount}
          setBumpAmount={setBumpAmount}
          minimumIncrement={minimumIncrement}
          setView={setView}
        />
      ) : (
        <AuctionTransaction
          action={bumpAction}
          amount={parsedBumpAmount}
          impact={newBidAmount}
          view={view}
          setView={setView}
        />
      )}
    </>
  )
}

const useMinimumIncrement = () => useReadAuctionParams().minimumBidIncrement ?? BigInt(0)
