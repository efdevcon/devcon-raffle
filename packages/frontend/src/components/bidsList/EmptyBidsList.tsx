import { EmptyBidListEntry } from './BidListEntry'
import { BidList } from './ShortBidsList'

const emptyBids: number[] = [1, 2, 3, 20]

export const EmptyBidsList = () => {
  return (
    <BidList>
      {emptyBids.map((emptyBid) => (
        <EmptyBidListEntry key={emptyBid} place={emptyBid} />
      ))}
    </BidList>
  )
}
