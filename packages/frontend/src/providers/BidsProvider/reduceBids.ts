import { Bid } from '@/types/bid'
import { Hex } from 'viem'

interface BidEvent {
  args: {
    bidder?: Hex
    bidderID?: bigint
    bidAmount?: bigint
  }
}

interface BidsState {
  bids: Map<Hex, Bid>
  bidList: Bid[]
}

export const defaultBidsState: BidsState = {
  bids: new Map<Hex, Bid>(),
  bidList: [],
}

interface BidWithAddressPayload {
  bidder: Hex
  bid: {
    bidderID: bigint
    amount: bigint
  }
}

interface InitialBidsAction {
  type: 'InitialBids'
  bids: readonly BidWithAddressPayload[]
}

interface NewBidsAction {
  type: 'NewBids'
  events: BidEvent[]
}

export type ReduceBidsAction = InitialBidsAction | NewBidsAction

export const reduceBids = (previousState: BidsState, action: ReduceBidsAction) => {
  switch (action.type) {
    case 'InitialBids':
      return addInitialBids(action.bids)
    case 'NewBids':
      return addNewBids(previousState, action.events)
  }
}

const addInitialBids = (bidsPayload: readonly BidWithAddressPayload[]): BidsState => {
  const bids = new Map<Hex, Bid>()
  bidsPayload.forEach((bidPayload) =>
    bids.set(bidPayload.bidder, {
      address: bidPayload.bidder,
      bidderId: bidPayload.bid.bidderID,
      amount: bidPayload.bid.amount,
    }),
  )

  return {
    bids,
    bidList: Array.from(bids.values()).sort(biggerFirst),
  }
}

const addNewBids = (previousState: BidsState, events: BidEvent[]): BidsState => {
  const bids = new Map(previousState.bids)

  events.forEach(({ args }) => {
    if (!args.bidder || !args.bidAmount || !args.bidderID) {
      return
    }
    bids.set(args.bidder, {
      address: args.bidder,
      bidderId: args.bidderID,
      amount: args.bidAmount,
    })
  })

  return {
    bids,
    bidList: Array.from(bids.values()).sort(biggerFirst),
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

const biggerFirst = (a: Bid, b: Bid) => {
  if (a.amount === b.amount) {
    return 0
  }
  return a.amount > b.amount ? -1 : 1
}
