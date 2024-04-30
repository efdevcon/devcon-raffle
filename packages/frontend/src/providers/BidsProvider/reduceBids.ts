import { Bid } from '@/types/bid'
import { Hex } from 'viem'

export type RawBid = Omit<Bid, 'place'>

interface BidsState {
  bids: Map<Hex, RawBid>
  bidList: Bid[]
}

export const defaultBidsState: BidsState = {
  bids: new Map<Hex, RawBid>(),
  bidList: [],
}

interface InitialBidsAction {
  type: 'InitialBids'
  bids: readonly BidWithAddressPayload[]
}

interface BidWithAddressPayload {
  bidder: Hex
  bid: {
    bidderID: bigint
    amount: bigint
  }
}

interface NewBidsAction {
  type: 'NewBids'
  events: BidEvent[]
}

interface BidEvent {
  args: {
    bidder?: Hex
    bidderID?: bigint
    bidAmount?: bigint
  }
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
  const bids = new Map<Hex, RawBid>()
  bidsPayload.forEach((bidPayload) =>
    bids.set(bidPayload.bidder, {
      address: bidPayload.bidder,
      bidderId: bidPayload.bid.bidderID,
      amount: bidPayload.bid.amount,
    }),
  )

  return {
    bids,
    bidList: bidsMapToList(bids),
  }
}

const addNewBids = (previousState: BidsState, events: BidEvent[]): BidsState => {
  const bids = new Map(previousState.bids)

  events.forEach((event) => handleBid(bids, event.args))

  return {
    bids,
    bidList: bidsMapToList(bids),
  }
}

const handleBid = (bids: Map<Hex, RawBid>, eventArgs: BidEvent['args']) => {
  if (!eventArgs.bidder || !eventArgs.bidAmount || !eventArgs.bidderID) {
    return
  }
  bids.set(eventArgs.bidder, {
    address: eventArgs.bidder,
    bidderId: eventArgs.bidderID,
    amount: eventArgs.bidAmount,
  })
}

const bidsMapToList = (bids: Map<Hex, RawBid>) =>
  Array.from(bids.values())
    .sort(biggerFirst)
    .map(
      (bid: RawBid, arrayIndex: number): Bid => ({
        ...bid,
        place: arrayIndex + 1,
      }),
    )

const biggerFirst = (a: RawBid, b: RawBid) => {
  if (a.amount === b.amount) {
    return 0
  }
  return a.amount > b.amount ? -1 : 1
}
