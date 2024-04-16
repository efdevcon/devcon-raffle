import { BidsState } from "@/providers/BidsProvider/types";
import { Hex } from "viem";
import { Bid } from "@/providers/BidsProvider/provider";

export interface BidEvent {
  args: {
    bidder?: Hex,
    bidderID?: bigint
    bidAmount?: bigint,
  }
}

export const reduceBids = (previousState: BidsState, events: BidEvent[]): BidsState => {
  events.forEach((event) => handleBid(previousState.bids, event.args))
  previousState.bids.values()
  const bidList = Array.from(previousState.bids.values()).sort(biggerFirst)

  return {
    bids: previousState.bids,
    bidList,
    isLoading: previousState.isLoading,
  }
}

const handleBid = (bids: Map<Hex, Bid>, eventArgs: BidEvent['args']) => {
  if (!eventArgs.bidder || !eventArgs.bidAmount || !eventArgs.bidderID) {
    return
  }
  const existingBid = bids.get(eventArgs.bidder)
  if (existingBid) {
    existingBid.amount += eventArgs.bidAmount
    bids.set(eventArgs.bidder, existingBid)
    return
  }
  bids.set(eventArgs.bidder, {
    address: eventArgs.bidder,
    bidderId: eventArgs.bidderID,
    amount: eventArgs.bidAmount,
  })
}

export function biggerFirst(a: Bid, b: Bid) {
  if (a.amount === b.amount) {
    return 0
  }
  if (a.amount > b.amount) {
    return -1
  }
  return 1
}
