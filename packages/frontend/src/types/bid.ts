import { Hex } from 'viem'

enum WinType {
  LOSS,
  GOLDEN_TICKET,
  AUCTION,
  RAFFLE,
}

export interface Bid {
  address: Hex
  amount: bigint
  bidderId: bigint
  place: number
}

export interface UserBid extends Bid {
  winType: WinType
}
