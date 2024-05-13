import { useMemo } from 'react'
import styled from 'styled-components'
import { Bid } from '@/types/bid'
import { useUserBid } from '@/blockchain/hooks/useUserBid'
import { Colors } from '@/styles/colors'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'
import { useBids } from '@/providers/BidsProvider'
import { useContractState } from '@/blockchain/hooks/useAuctionState'
import { Separator } from '@/components/common/Separator'
import { BidsListEntry } from '@/components/bids/BidsListEntry'
import { isAuctionSettled } from '@/utils/isAuctionSettled'
import { getFirstRaffleBidIndex } from '@/utils/getFirstRaffleBidIndex'
import { BidsListContainer } from '@/components/bids/BidsListContainer'

const topAuctionBidsCount = 3
const bidsMaxCount = topAuctionBidsCount + 1

export const BidsShortList = () => {
  const userBid = useUserBid()
  const { auctionWinnersCount, raffleWinnersCount } = useReadAuctionParams()
  const { state } = useContractState()
  const { bidList: allBids } = useBids()

  const bidsShortList = useMemo(
    () => selectBids(auctionWinnersCount, allBids, userBid),
    [auctionWinnersCount, allBids, userBid],
  )

  const participatesInAuction = useMemo(() => {
    return isAuctionParticipant(userBid, auctionWinnersCount, raffleWinnersCount, allBids.length)
  }, [auctionWinnersCount, allBids.length, raffleWinnersCount, userBid])

  return (
    <>
      <BidsListContainer>
        {bidsShortList.map((bid) => (
          <BidsListEntry key={bid.address} bid={bid} isUser={userBid && userBid.address === bid.address} view="short" />
        ))}
        {userBid && auctionWinnersCount && userBid.place > auctionWinnersCount && (
          <>
            <Separator color={Colors.Grey} />
            <BidsListEntry bid={userBid} isUser view="short" />
          </>
        )}
      </BidsListContainer>
      {userBid && !isAuctionSettled(state) && (
        <BidListText>You’re taking part in the {participatesInAuction ? 'auction' : 'raffle'}!</BidListText>
      )}
    </>
  )
}

function isAuctionParticipant(
  userBid: Bid | undefined,
  auctionWinnersCount: number | undefined,
  raffleWinnersCount: number | undefined,
  bidsLength: number,
) {
  if (!userBid || !raffleWinnersCount || !auctionWinnersCount) {
    return false
  }
  const firstRaffleBidIndex = getFirstRaffleBidIndex(bidsLength, auctionWinnersCount, raffleWinnersCount)
  return userBid.place <= firstRaffleBidIndex
}

function selectBids(auctionWinnersCount: number | undefined, bidList: Bid[], userBid: Bid | undefined): Bid[] {
  if (auctionWinnersCount === undefined) {
    return []
  }

  if (bidList.length <= bidsMaxCount) {
    return bidList
  }

  const topAuctionBids = bidList.slice(0, topAuctionBidsCount)

  const lastAuctionBidIndex = bidList.length > auctionWinnersCount ? auctionWinnersCount - 1 : bidList.length - 1
  const lastAuctionBid = bidList[lastAuctionBidIndex]

  return userBid && shouldUserBidBeDisplayed(userBid, lastAuctionBid, auctionWinnersCount)
    ? topAuctionBids.concat([userBid, lastAuctionBid])
    : topAuctionBids.concat([lastAuctionBid])
}

const shouldUserBidBeDisplayed = (userBid: Bid, lastAuctionBid: Bid, auctionWinnersCount: number) => {
  return !(userBid.address === lastAuctionBid.address) && within(bidsMaxCount, auctionWinnersCount - 1, userBid.place)
}

const within = (...[lower, higher, value]: number[]) => value >= lower && value <= higher

const BidListText = styled.div`
  width: 100%;
  text-align: center;
`
