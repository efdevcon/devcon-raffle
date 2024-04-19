import { Hex } from 'viem'

export interface Bid {
  address: Hex
  amount: bigint
  bidderId: bigint
}

export interface BidWithPlace extends Bid {
  place: number
}

export const bidToBidWithPlace = (bid: Bid, arrayIndex: number): BidWithPlace => ({ ...bid, place: arrayIndex + 1 })
