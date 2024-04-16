import { parseAbiItem } from "viem";
import { BidEventsState } from "@/providers/BidsProvider/reduceBids";
import { useBlockNumber, useChainId, useConfig, useWatchContractEvent } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { getLogs } from "viem/actions";
import { AUCTION_ADDRESSES, DEPLOYMENT_BLOCK } from "@/blockchain/auctionAddresses";
import { AUCTION_ABI } from "@/blockchain/abi/auction";

const newBidEvent = parseAbiItem('event NewBid(address bidder, uint256 bidderID, uint256 bidAmount)')

export const useWatchEvents = (onEvents: (eventsState: BidEventsState) => void) => {
  const chainId = useChainId()
  const config = useConfig()
  const client = config.getClient({ chainId })

  const { data: blockNumber, isLoading: isBlockLoading } = useBlockNumber()

  const { isLoading: areInitialBidsLoading } = useQuery({
    queryKey: ['bids', chainId],
    queryFn: async () => {
      const logs = await getLogs(client, {
        address: AUCTION_ADDRESSES[chainId],
        event: newBidEvent,
        fromBlock: DEPLOYMENT_BLOCK[chainId],
        toBlock: blockNumber,
      })
      onEvents({ events: logs, chainId, startBlock: blockNumber })
      return logs
    },
    enabled: !isBlockLoading,
    staleTime: Infinity,
    gcTime: Infinity,
  })

  useWatchContractEvent({
    chainId,
    abi: AUCTION_ABI,
    address: AUCTION_ADDRESSES[chainId],
    fromBlock: blockNumber,
    eventName: 'NewBid',
    onLogs: (logs) => onEvents({ events: logs, chainId, startBlock: blockNumber }),
    enabled: !isBlockLoading && !areInitialBidsLoading,
  })

  return {isLoading: isBlockLoading || areInitialBidsLoading}
}
