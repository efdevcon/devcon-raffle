import { createContext, ReactNode, useContext, useReducer } from "react";
import { Hex } from "viem";
import { defaultBidsState, reduceBids } from "@/providers/BidsProvider/reduceBids";
import { useWatchEvents } from "@/providers/BidsProvider/useWatchEvents";
import { Bid } from "@/providers/BidsProvider/types";

const BidsContext = createContext({
  bids: new Map<Hex, Bid>(),
  bidList: new Array<Bid>(),
  isLoading: true,
})

export const useBids = () => useContext(BidsContext)

export const BidsProvider = ({ children }: { children: ReactNode }) => {
  const [bidsState, updateBids] = useReducer(reduceBids, defaultBidsState)
  const { isLoading } = useWatchEvents(updateBids)

  return (
    <BidsContext.Provider value={{ ...bidsState, isLoading }}>
      {children}
    </BidsContext.Provider>
  )
}
