import { useMemo } from 'react'
import { Bid } from '@/types/bid'
import { useBids } from '@/providers/BidsProvider'
import { useAuctionWinners } from '@/blockchain/hooks/useAuctionWinners'
import { GoldenTicketWinner } from '@/components/bids/allBids/GoldenTicketWinner'
import { NothingFound } from '@/components/bids/allBids/NothingFound'
import { BidsListHeaders } from '@/components/bids/BidsListHeaders'
import { BidsSubList } from '@/components/bids/allBids/BidsSubList'
import { bidMatchesSearch } from '@/components/bids/allBids/bidMatchesSearch'

interface Bids {
  auction: Bid[]
  raffle: Bid[]
  others: Bid[]
  goldenTicket?: Bid
}

interface SettledBidsListProps {
  search: string
}

export const SettledBidsList = ({ search }: SettledBidsListProps) => {
  const { bidList } = useBids()
  const matchesSearch = bidMatchesSearch(search)
  const { auctionWinners, raffleWinners } = useAuctionWinners()

  const settledBids = useMemo(
    () => divideBids(bidList, auctionWinners, raffleWinners),
    [bidList, auctionWinners, raffleWinners],
  )

  const filteredBids = useMemo(() => filterBids(settledBids, matchesSearch), [settledBids, matchesSearch])

  return (
    <>
      {search && isEmpty(filteredBids) ? (
        <NothingFound search={search} />
      ) : (
        <>
          {filteredBids.goldenTicket && <GoldenTicketWinner bidderAddress={filteredBids.goldenTicket.address} />}
          <BidsListHeaders />
          {filteredBids.auction.length !== 0 && (
            <BidsSubList bids={filteredBids.auction} placeOffset={0} title="AUCTION" />
          )}
          {filteredBids.raffle.length !== 0 && (
            <BidsSubList bids={filteredBids.raffle} placeOffset={filteredBids.auction.length} title="RAFFLE" />
          )}
          {filteredBids.others.length !== 0 && (
            <BidsSubList
              bids={filteredBids.others}
              placeOffset={filteredBids.raffle.length + filteredBids.auction.length}
              title="OTHERS"
            />
          )}
        </>
      )}
    </>
  )
}

function divideBids(
  bids: Bid[],
  auctionWinners: readonly bigint[] | undefined,
  raffleWinners: readonly bigint[] | undefined,
): Bids {
  const settledBids: Bids = {
    auction: [],
    raffle: [],
    others: [],
  }

  if (!auctionWinners || !raffleWinners) {
    return settledBids
  }

  bids.forEach((bid, index) => {
    const bidderID = bid.bidderId
    if (auctionWinners.find((winnerId) => bid.bidderId === winnerId)) {
      settledBids.auction.push(bid)
      return
    }
    if (bidderID === raffleWinners[0]) {
      settledBids.goldenTicket = bid
      return
    }
    if (raffleWinners.find((winnerId) => bid.bidderId === winnerId)) {
      settledBids.raffle.push(bid)
      return
    }
    settledBids.others.push(bid)
  })
  return settledBids
}

function filterBids(bids: Bids, matchesSearch: (bid: Bid) => boolean) {
  return {
    auction: bids.auction.filter(matchesSearch),
    raffle: bids.raffle.filter(matchesSearch),
    others: bids.others.filter(matchesSearch),
    goldenTicket: bids.goldenTicket && matchesSearch(bids.goldenTicket) ? bids.goldenTicket : undefined,
  }
}

function isEmpty(bids: Bids) {
  return bids.auction.length === 0 && bids.raffle.length === 0 && bids.others.length === 0 && !bids.goldenTicket
}
