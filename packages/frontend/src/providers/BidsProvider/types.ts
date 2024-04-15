import { Hex } from "viem";

export interface Bid {
  address: Hex,
  amount: bigint,
  bidderId: bigint
}

export interface BidsState {
  bids: Map<Hex, Bid>
  bidList: Bid[]
  isLoading: boolean
}
