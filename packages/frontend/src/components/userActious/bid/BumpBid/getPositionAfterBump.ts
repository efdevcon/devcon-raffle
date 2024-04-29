import { Bid } from '@/types/bid'

export const getPositionAfterBump = (newAmount: bigint, bidderID: bigint, bids: Bid[]) =>
  bids.findIndex((bid) => {
    const amount = bid.amount
    if (amount === newAmount) {
      return bid.bidderId > bidderID
    }
    return amount < newAmount
  }) + 1 || bids.length + 1
