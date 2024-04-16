import { createContext, ReactNode, useContext, useReducer } from "react";
import { Hex } from "viem";
import { reduceBids } from "@/providers/BidsProvider/reduceBids";
import { BidsState } from "@/providers/BidsProvider/types";
import { useWatchEvents } from "@/providers/BidsProvider/useWatchEvents";

export interface Bid {
  address: Hex,
  amount: bigint,
  bidderId: bigint
}

const defaultBidsState: BidsState = {
  bids: new Map<Hex, Bid>(),
  bidList: [],
  isLoading: false,
}

export const BidsContext = createContext(defaultBidsState)

export const useBids = () => useContext(BidsContext)

export const BidsProvider = ({ children }: { children: ReactNode }) => {
  const [bidsState, updateBids] = useReducer(reduceBids, defaultBidsState)
  useWatchEvents(updateBids)

  return (
    <BidsContext.Provider value={{
      bids: bidsState.bids,
      bidList: bidsState.bidList,
      isLoading: bidsState.isLoading
    }}>
      {children}
    </BidsContext.Provider>
  )
}
