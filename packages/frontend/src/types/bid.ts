import { Hex } from 'viem'

export interface Bid {
  address: Hex
  amount: bigint
  bidderId: bigint
}

export interface BidWithPlace extends Bid {
  place: number
}
