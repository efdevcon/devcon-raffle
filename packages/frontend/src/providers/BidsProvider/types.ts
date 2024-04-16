import { Hex } from "viem";
import { SupportedChainId } from "@/blockchain/chain";

export interface Bid {
  address: Hex,
  amount: bigint,
  bidderId: bigint
}

export interface BidsState {
  bids: Map<Hex, Bid>
  bidList: Bid[]
  startBlock: bigint | undefined
  chainId: SupportedChainId | undefined
  isLoading: boolean
}
