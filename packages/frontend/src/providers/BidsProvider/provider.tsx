import { createContext, ReactNode, useContext, useReducer } from 'react'
import { defaultBidsState, reduceBids } from '@/providers/BidsProvider/reduceBids'
import { useWatchEvents } from '@/providers/BidsProvider/useWatchEvents'
import { Bid } from '@/types/bid'

const BidsContext = createContext({
  bidList: new Array<Bid>(),
  isLoading: true,
})

export const useBids = () => useContext(BidsContext)

export const BidsProvider = ({ children }: { children: ReactNode }) => {
  const [bidsState, updateBids] = useReducer(reduceBids, defaultBidsState)
  const { isLoading } = useWatchEvents(updateBids)

  return <BidsContext.Provider value={{ bidList: bidsState.bidList, isLoading }}>{children}</BidsContext.Provider>
}
