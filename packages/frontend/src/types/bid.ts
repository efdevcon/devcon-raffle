import { Hex } from 'viem'

export interface Bid {
  address: Hex
  amount: bigint
  bidderId: bigint
}

export interface UserBid extends Bid {
  place: number
}
