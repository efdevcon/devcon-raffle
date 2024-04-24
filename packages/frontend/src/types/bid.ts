import { Hex } from 'viem'
import { WinType } from '@/types/winType'

export interface Bid {
  address: Hex
  amount: bigint
  bidderId: bigint
  place: number
}

export interface UserBid extends Bid {
  winType: WinType
  claimed: boolean
}
