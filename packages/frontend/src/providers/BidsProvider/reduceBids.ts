import { BidsState } from "@/providers/BidsProvider/types";
import { Hex } from "viem";
import { Bid } from "@/providers/BidsProvider/provider";
import { SupportedChainId } from "@/blockchain/chain";

export interface BidEvent {
  args: {
    bidder?: Hex,
    bidderID?: bigint
    bidAmount?: bigint,
  }
}

export interface BidEventsState {
  events: BidEvent[]
  startBlock: bigint | undefined
  chainId: SupportedChainId
}

export const reduceBids = (previousState: BidsState, state: BidEventsState): BidsState => {
  const { events, startBlock, chainId } = state
  const bids = getInitialBids(previousState, state)
  events.forEach((event) => handleBid(bids, event.args))

  return {
    bids,
    bidList: Array.from(bids.values()).sort(biggerFirst),
    startBlock: startBlock,
    chainId: chainId,
    isLoading: previousState.isLoading,
  }
}

const getInitialBids = (previousState: BidsState, { startBlock, chainId }: BidEventsState) => {
  if (startBlock !== previousState.startBlock || chainId !== previousState.chainId) {
    return new Map<Hex, Bid>()
  }
  return previousState.bids
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
