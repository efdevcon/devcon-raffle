import { parseAbiItem, Transport } from "viem";
import { BidEvent } from "@/providers/BidsProvider/reduceBids";
import { useBlockNumber, useChainId, useConfig, useWatchContractEvent, webSocket } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { getLogs } from "viem/actions";
import { AUCTION_ADDRESSES, DEPLOYMENT_BLOCK } from "@/blockchain/auctionAddresses";
import { AUCTION_ABI } from "@/blockchain/abi/auction";
import { SupportedChainId } from "@/blockchain/chain";
import { arbitrum, arbitrumSepolia, hardhat } from "wagmi/chains";
import { wagmiConfig } from "@/config/wagmiConfig";

const newBidEvent = parseAbiItem('event NewBid(address bidder, uint256 bidderID, uint256 bidAmount)')

export const useWatchEvents = (onEvents: (events: BidEvent[]) => void) => {
  const chainId = useChainId()
  const config = useConfig()
  const client = config.getClient({ chainId })

  const { data: blockNumber, isLoading: isBlockLoading } = useBlockNumber()

  const { isLoading } = useQuery({
    queryKey: ['bids'],
    queryFn: async () => {
      const logs = await getLogs(client, {
        address: AUCTION_ADDRESSES[chainId],
        event: newBidEvent,
        fromBlock: DEPLOYMENT_BLOCK[chainId],
        toBlock: blockNumber,
      })
      console.log('logs: ', logs)
      onEvents(logs)
      return logs
    },
    enabled: !isBlockLoading,
  })

  useWatchContractEvent({
    chainId,
    abi: AUCTION_ABI,
    address: AUCTION_ADDRESSES[chainId],
    fromBlock: DEPLOYMENT_BLOCK[chainId],
    eventName: 'NewBid',
    onLogs: (logs) => {
      console.log('logs in watch: ', logs)
      onEvents(logs)
    },
    enabled: !isBlockLoading && !isLoading,
    config: wsConfig,
  })
}

const wsConfig = {
  ...wagmiConfig,
  transport: {
    [arbitrum.id]: webSocket(`wss://arbitrum-mainnet.infura.io/ws/v3/${process.env.NEXT_INFURA_KEY}`),
    [arbitrumSepolia.id]: webSocket(`wss://arbitrum-sepolia.infura.io/ws/v3/${process.env.NEXT_INFURA_KEY}`),
    [hardhat.id]: webSocket('http://127.0.0.1:8545'),
  },
}
