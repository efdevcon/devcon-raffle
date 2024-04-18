import { useMemo } from 'react'
import { getFirstRaffleBidIndex } from '@/utils/getFirstRaffleBidIndex'
import { useBids } from '@/providers/BidsProvider'
import { NothingFound } from '@/components/bids/allBids/NothingFound'
import { BidsListHeaders } from '@/components/bids/BidsListHeaders'
import { matchesBidFn } from '@/components/bids/allBids/matchesBidFn'
import { BidsSubList } from '@/components/bids/allBids/BidsSubList'

interface AllBidsListProps {
  search: string
  auctionWinnersCount: number
  raffleWinnersCount: number
}

export const AllBidsList = ({ search, auctionWinnersCount, raffleWinnersCount }: AllBidsListProps) => {
  const { bidList } = useBids()

  const matchesSearch = matchesBidFn(search)
  const firstRaffleBidIndex = getFirstRaffleBidIndex(bidList.length, auctionWinnersCount, raffleWinnersCount)

  const bids = useMemo(() => {
    const auctionBids = bidList.slice(0, firstRaffleBidIndex)
    const raffleBids = bidList.slice(firstRaffleBidIndex)
    return {
      auction: auctionBids.filter(matchesSearch),
      raffle: raffleBids.filter(matchesSearch),
    }
  }, [bidList, firstRaffleBidIndex, matchesSearch])

  const nothingFound = search && bids.auction.length === 0 && bids.raffle.length === 0

  return (
    <>
      {nothingFound ? (
        <NothingFound search={search} />
      ) : (
        <>
          <BidsListHeaders />
          {bids.auction.length !== 0 && <BidsSubList bids={bids.auction} placeOffset={0} title="AUCTION" />}
          {bids.raffle.length !== 0 && (
            <BidsSubList bids={bids.raffle} placeOffset={bids.auction.length} title="RAFFLE" />
          )}
        </>
      )}
    </>
  )
}
