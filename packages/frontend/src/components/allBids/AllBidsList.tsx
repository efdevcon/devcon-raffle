import { useMemo } from 'react'
import { getFirstRaffleBidIndex } from '@/utils/getFirstRaffleBidIndex'
import { useBids } from '@/providers/BidsProvider'
import { NothingFound } from '@/components/allBids/NothingFound'
import { BidsListHeaders } from '@/components/bidsList/BidsListHeaders'
import { useMatchBid } from '@/components/allBids/useMatchBid'
import { BidsSubList } from "@/components/allBids/BidsSubList";

interface AllBidsListProps {
  search: string
  auctionWinnersCount: number
  raffleWinnersCount: number
}

export const AllBidsList = ({ search, auctionWinnersCount, raffleWinnersCount }: AllBidsListProps) => {
  const { bidList } = useBids()
  const matchesSearch = useMatchBid(search)

  const firstRaffleBidIndex = getFirstRaffleBidIndex(bidList.length, auctionWinnersCount, raffleWinnersCount)

  const auctionBids = useMemo(() => {
    const sectionBids = bidList.slice(0, firstRaffleBidIndex)
    return sectionBids.filter(matchesSearch)
  }, [bidList, matchesSearch]) // eslint-disable-line react-hooks/exhaustive-deps
  const raffleBids = useMemo(() => {
    const sectionBids = bidList.slice(firstRaffleBidIndex)
    return sectionBids.filter(matchesSearch)
  }, [bidList, matchesSearch]) // eslint-disable-line react-hooks/exhaustive-deps

  const nothingFound = search && auctionBids.length === 0 && raffleBids.length === 0

  return (
    <>
      {nothingFound ? (
        <NothingFound search={search}/>
      ) : (
        <>
          <BidsListHeaders/>
          {auctionBids.length !== 0 && <BidsSubList bids={auctionBids} placeOffset={0} title="AUCTION"/>}
          {raffleBids.length !== 0 && <BidsSubList bids={raffleBids} placeOffset={auctionBids.length} title="RAFFLE"/>}
        </>
      )}
    </>
  )
}
