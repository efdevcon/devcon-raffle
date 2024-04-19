import { useChainId, useReadContract, useWatchContractEvent } from 'wagmi'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { useEffect } from 'react'
import { ReduceBidsAction } from '@/providers/BidsProvider/reduceBids'

export const useWatchEvents = (dispatch: (eventsState: ReduceBidsAction) => void) => {
  const chainId = useChainId()

  const { data, isLoading: areInitialBidsLoading } = useReadContract({
    chainId,
    abi: AUCTION_ABI,
    address: AUCTION_ADDRESSES[chainId],
    functionName: 'getBidsWithAddresses',
    query: {
      gcTime: Infinity,
      staleTime: Infinity,
    },
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
    enabled: !areInitialBidsLoading,
  })

  return { isLoading: areInitialBidsLoading }
}
