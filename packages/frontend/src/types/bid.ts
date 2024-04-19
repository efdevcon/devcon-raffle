import { Hex } from 'viem'

export interface Bid {
  address: Hex
  amount: bigint
  bidderId: bigint
  place: number
}

export const bidToBidWithPlace = (bid: Bid, arrayIndex: number): Bid => ({ ...bid, place: arrayIndex + 1 })
