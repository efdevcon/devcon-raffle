import { Hex } from 'viem'

export interface Bid {
  address: Hex
  amount: bigint
  bidderId: bigint
  place: number
}
