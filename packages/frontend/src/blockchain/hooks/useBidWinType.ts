import { useChainId, useReadContract } from 'wagmi'
import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'

export const useBidWinType = (bidderId: bigint | undefined) => {
  const chainId = useChainId()

  const { data } = useReadContract({
    chainId,
    abi: AUCTION_ABI,
    address: AUCTION_ADDRESSES[chainId],
    functionName: 'getBidWinType',
    args: [bidderId as bigint],
    query: {
      enabled: !!bidderId,
    },
  })

  return data
}
