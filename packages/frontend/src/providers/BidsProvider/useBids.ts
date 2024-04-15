import { useBlockNumber, useChainId, useConfig, useWatchContractEvent } from "wagmi";
import {AUCTION_ADDRESSES} from "@/blockchain/auctionAddresses";
import {AUCTION_ABI} from "@/blockchain/abi/auction";
import {getLogs} from "viem/actions";
import {Hex, parseAbiItem} from "viem";
import {useQuery} from "@tanstack/react-query";

const newBidEvent = parseAbiItem('event NewBid(address bidder, uint256 bidderID, uint256 bidAmount)')
const deploymentBlock = BigInt(16977962)

interface Bid {
  address: Hex,
  amount: bigint,
  bidderId: bigint
}

export const useBids = () => {
  const chainId = useChainId()
  const config = useConfig()
  const clientFirst = config.getClient({chainId})
  const {data: blockNumber, isLoading: isBlockNumberLoading} = useBlockNumber()
  console.log('blockNumber: ', blockNumber)


  const {data, isLoading} = useQuery({
    queryKey: ['bids'],
    queryFn: async () => {
      const logs = await getLogs(clientFirst, {
        address: AUCTION_ADDRESSES[chainId],
        event: newBidEvent,
        fromBlock: deploymentBlock,
        toBlock:blockNumber,
      })
      console.log('first logs: ', logs)
      return convertBids()
    },
    enabled: !isBlockNumberLoading,
  })

  useWatchContractEvent({
    chainId,
    abi: AUCTION_ABI,
    address: AUCTION_ADDRESSES[chainId],
    eventName: 'NewBid',
    onLogs: (logs) => {
      console.log('logs: ', logs)
    },
    fromBlock: blockNumber,
    enabled: !isLoading && !isBlockNumberLoading
  })
}

const convertBids = (existingBids: Map<Hex, Bid>, newBids: Bid[]) => {
  newBids.forEach((bid) => {
    const existingBid = existingBids.get(bid.address)
    if (!existingBid) {
      existingBids.set(bid.address, bid)
      return
    }
    existingBid.amount += bid.amount
    existingBids.set(bid.address, existingBid)
  })
}
