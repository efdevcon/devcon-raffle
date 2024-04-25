import { useChainId, useReadContract } from 'wagmi'
import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { Hex } from 'viem'

export const useBid = (address: Hex | undefined) => {
  const chainId = useChainId()

  const { data: bid } = useReadContract({
    chainId,
    abi: AUCTION_ABI,
    address: AUCTION_ADDRESSES[chainId],
    functionName: 'getBid',
    args: [address as Hex],
    query: {
      enabled: !!address,
    },
  })

  return {
    bid: bid &&
      address && {
        address,
        amount: bid.amount,
        bidderId: bid.bidderID,
        place: Number(bid.raffleParticipantIndex),
        claimed: bid.claimed,
      },
  }
}
