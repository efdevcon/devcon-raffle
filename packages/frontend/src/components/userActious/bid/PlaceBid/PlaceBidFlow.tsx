import { useAccount } from 'wagmi'
import { FlowProps } from '../BidFlow'
import { TxFlowSteps } from '@/components/auction/TxFlowSteps'
import { useEffect, useMemo, useState } from 'react'
import { useMinimumBid } from '@/blockchain/hooks/useMinimumBid'
import { PlaceBidForm } from './PlaceBidForm'
import { formatEther, parseEther } from 'viem'
import { AuctionTransaction } from '@/components/auction/AuctionTransaction'
import { usePlaceBid } from './usePlaceBid'

export const PlaceBidFlow = ({ setTransactionViewLock }: FlowProps) => {
  const { address } = useAccount()
  const [view, setView] = useState<TxFlowSteps>(TxFlowSteps.Placing)
  const minimumBid = useMinimumBid()
  const [bid, setBid] = useState('0')
  const parsedBid = useMemo(() => parseEther(bid || '0'), [bid])
  const bidAction = usePlaceBid({ value: parsedBid, score: BigInt(20), proof: '0x' })
  useEffect(() => {
    setTransactionViewLock(bidAction.status !== "idle")
  }, [bidAction.status, setTransactionViewLock]);

  useEffect(() => setView(TxFlowSteps.Placing), [address])

  useEffect(() => {
    setBid(formatEther(minimumBid))
  }, [minimumBid])

  return (
    <>
      {view === TxFlowSteps.Placing ? (
        <PlaceBidForm
          bid={bid}
          parsedBid={parsedBid}
          setBid={setBid}
          setView={setView}
          minimumBid={minimumBid}
        />
      ) : (
        <AuctionTransaction
          action={bidAction}
          amount={parsedBid}
          view={view}
          setView={setView}
        />
      )}
    </>
  )
}
