import { createContext, ReactNode, useContext, useReducer } from "react";
import { Hex } from "viem";
import { useChainId, useWatchContractEvent } from "wagmi";
import { AUCTION_ABI } from "@/blockchain/abi/auction";
import { AUCTION_ADDRESSES } from "@/blockchain/auctionAddresses";
import { reduceBids } from "@/providers/BidsProvider/reduceBids";
import { BidsState } from "@/providers/BidsProvider/types";

const deploymentBlock = BigInt(16977962)

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
  const chainId = useChainId()
  const [bidsState, updateBids] = useReducer(reduceBids, defaultBidsState)

  useWatchContractEvent({
    chainId,
    abi: AUCTION_ABI,
    address: AUCTION_ADDRESSES[chainId],
    fromBlock: deploymentBlock,
    eventName: 'NewBid',
    onLogs: (logs) => {
      console.log('logs: ', logs)
      updateBids(logs)
    },
  })

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
