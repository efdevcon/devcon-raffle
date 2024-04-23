import { useAccount } from 'wagmi'
import { FlowProps } from '../BidFlow'
import { TxFlowSteps } from '@/components/auction/TxFlowSteps'
import { useEffect, useMemo, useState } from 'react'
import { useMinimumBid } from '@/blockchain/hooks/useMinimumBid'
import { PlaceBidForm } from './PlaceBidForm'
import { useBids } from '@/providers/BidsProvider'
import { formatEther, parseEther } from 'viem'

export const PlaceBidFlow = ({ setTransactionViewLock }: FlowProps) => {
  const { address } = useAccount()
  const [view, setView] = useState<TxFlowSteps>(TxFlowSteps.Placing)
  const minimumBid = useMinimumBid()
  const [bid, setBid] = useState('0')
  // const { placeBid, state, resetState } = usePlaceBid()
  const { bidList } = useBids()

  useEffect(() => setView(TxFlowSteps.Placing), [address])

  useEffect(() => {
    setBid(formatEther(minimumBid))
  }, [minimumBid])

  // useEffect(() => {
  //   if (state.status == 'Success') {
  //     setBid(formatEther(minimumBid))
  //   }
  // }, [state.status, minimumBid])

  const parsedBid = useMemo(() => parseEther(bid || '0'), [bid])
  // const bidAction: TransactionAction = {
  //   type: Transactions.Place,
  //   send: async () => {
  //     await placeBid(parsedBid)
  //   },
  //   state: state,
  //   resetState: resetState,
  // }

  return (
    <>
      {view === TxFlowSteps.Placing ? (
        <PlaceBidForm
          bid={bid}
          parsedBid={parsedBid}
          setBid={setBid}
          setView={setView}
          minimumBid={minimumBid}
          bids={bidList}
        />
      ) : (
        <div />
        // <AuctionTransaction
        //   action={bidAction}
        //   amount={parsedBid}
        //   view={view}
        //   setView={setView}
        //   setTransactionViewLock={setTransactionViewLock}
        // />
      )}
    </>
  )
}
