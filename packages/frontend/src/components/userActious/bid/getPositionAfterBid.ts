import { Bid } from '@/types/bid'

export const getPositionAfterBid = (newAmount: bigint, bids: Bid[]) =>
  bids.findIndex((bid) => bid.amount < newAmount) + 1 || bids.length + 1
