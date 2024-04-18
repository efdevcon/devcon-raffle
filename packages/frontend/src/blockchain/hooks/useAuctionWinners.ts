import { useChainId, useReadContracts } from "wagmi";
import { AUCTION_ABI } from "@/blockchain/abi/auction";
import { AUCTION_ADDRESSES } from "@/blockchain/auctionAddresses";

export const useAuctionWinners = () => {
  const chainId = useChainId()
  const { data, isLoading } = useReadContracts({
    contracts: [{
      chainId,
      abi: AUCTION_ABI,
      address: AUCTION_ADDRESSES[chainId],
      functionName: 'getAuctionWinners',
    }, {
      chainId,
      abi: AUCTION_ABI,
      address: AUCTION_ADDRESSES[chainId],
      functionName: 'getRaffleWinners',
    }],
    allowFailure: false,
  })

  return {
    auctionWinners: data?.[0],
    raffleWinners: data?.[1],
    isLoading,
  }
}
