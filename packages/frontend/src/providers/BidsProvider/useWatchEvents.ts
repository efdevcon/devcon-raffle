import { useChainId, useReadContract, useWatchContractEvent } from 'wagmi'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { useEffect } from 'react'
import { ReduceBidsAction } from '@/providers/BidsProvider/reduceBids'
import { useContractState } from '@/blockchain/hooks/useAuctionState'
import { ContractState } from '@/types/ContractState'

export const useWatchEvents = (dispatch: (eventsState: ReduceBidsAction) => void) => {
  const chainId = useChainId()
  const { state } = useContractState()

  const { data, isLoading: areInitialBidsLoading } = useReadContract({
    chainId,
    abi: AUCTION_ABI,
    address: AUCTION_ADDRESSES[chainId],
    functionName: 'getBidsWithAddresses',
  })

  useEffect(() => {
    if (!data) {
      return
    }
    dispatch({
      type: 'InitialBids',
      bids: data,
    })
  }, [data, dispatch])

  useWatchContractEvent({
    chainId,
    abi: AUCTION_ABI,
    address: AUCTION_ADDRESSES[chainId],
    eventName: 'NewBid',
    onLogs: (logs) => dispatch({ type: 'NewBids', events: logs }),
    enabled: !areInitialBidsLoading && state === ContractState.BIDDING_OPEN,
  })

  return { isLoading: areInitialBidsLoading }
}
