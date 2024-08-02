import { useChainId, useReadContracts } from 'wagmi'
import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { useContractState } from '@/blockchain/hooks/useAuctionState'
import { ContractState } from '@/types/ContractState'
import { useBids } from '@/providers/BidsProvider'
import { WinType } from '@/types/winType'
import { useMemo } from 'react'

export const useAuctionWinners = () => {
  const chainId = useChainId()
  const { state, isLoading: isStateLoading } = useContractState()
  const { data, isLoading } = useReadContracts({
    contracts: [
      {
        chainId,
        abi: AUCTION_ABI,
        address: AUCTION_ADDRESSES[chainId],
        functionName: 'getAuctionWinners',
      },
      {
        chainId,
        abi: AUCTION_ABI,
        address: AUCTION_ADDRESSES[chainId],
        functionName: 'getRaffleWinners',
      },
    ],
    allowFailure: false,
    query: {
      enabled: !isStateLoading && state === ContractState.RAFFLE_SETTLED,
    },
  })

  const closedState = useAuctionWinnersInClosedState()
  return state === ContractState.CLAIMING_CLOSED
    ? closedState
    : {
        auctionWinners: data?.[0],
        raffleWinners: data?.[1],
        goldenWinner: data?.[1]?.[0],
        isLoading: isLoading,
      }
}

const useAuctionWinnersInClosedState = () => {
  const chainId = useChainId()
  const { bidList } = useBids()
  const { state, isLoading: isStateLoading } = useContractState()

  const bidWinTypeContracts = bidList.map(
    (bid) =>
      ({
        chainId,
        abi: AUCTION_ABI,
        address: AUCTION_ADDRESSES[chainId],
        functionName: 'getBidWinType',
        args: [bid.bidderId],
      } as const),
  )

  const { data, isLoading } = useReadContracts({
    contracts: bidWinTypeContracts,
    allowFailure: false,
    query: {
      enabled: !isStateLoading && state === ContractState.CLAIMING_CLOSED,
    },
  })

  return useMemo(() => {
    const auctionWinners: bigint[] = []
    const raffleWinners: bigint[] = []
    let goldenWinner: bigint | undefined = undefined
    data?.forEach((winType, index) => {
      switch (winType) {
        case WinType.Auction:
          auctionWinners.push(bidList[index].bidderId)
          break
        case WinType.Raffle:
          raffleWinners.push(bidList[index].bidderId)
          break
        case WinType.GoldenTicket:
          goldenWinner = bidList[index].bidderId
          break
      }
    })
    return {
      auctionWinners,
      raffleWinners,
      goldenWinner,
      isLoading: isStateLoading || isLoading,
    }
  }, [bidList, data, isLoading, isStateLoading])
}
