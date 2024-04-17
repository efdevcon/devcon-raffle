import { useMemo } from 'react'
import styled from 'styled-components'
import { Bid, BidWithPlace } from '@/types/bid'
import { useUserBid } from '@/blockchain/hooks/useUserBid'
import { Colors } from '@/styles/colors'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'
import { useBids } from '@/providers/BidsProvider'
import { useContractState } from '@/blockchain/hooks/useAuctionState'
import { Separator } from '@/components/common/Separator'
import { BidListEntry } from '@/components/bidsList/BidListEntry'
import { isAuctionSettled } from '@/utils/isAuctionSettled'
import { getFirstRaffleBidIndex } from '@/utils/getFirstRaffleBidIndex'

const topAuctionBidsCount = 3
const bidsMaxCount = topAuctionBidsCount + 1

export const ShortBidsList = () => {
  const userBid = useUserBid()
  const { auctionWinnersCount, raffleWinnersCount } = useReadAuctionParams()
  const { state } = useContractState()
  const { bidList: allBids } = useBids()

  const bidsShortlist = useMemo(
    () => selectBids(auctionWinnersCount, allBids, userBid),
    [auctionWinnersCount, allBids, userBid],
  )

  const participatesInAuction = useMemo(() => {
    return isAuctionParticipant(userBid, auctionWinnersCount, raffleWinnersCount, allBids.length)
  }, [auctionWinnersCount, allBids.length, raffleWinnersCount, userBid])

  return (
    <>
      <BidList>
        {bidsShortlist.map((bid) => (
          <BidListEntry key={bid.address} bid={bid} isUser={userBid && userBid.address === bid.address} view="short" />
        ))}
        {!participatesInAuction && userBid && (
          <>
            <Separator color={Colors.Grey} />
            <BidListEntry bid={userBid} isUser view="short" />
          </>
        )}
      </BidList>
      {userBid && !isAuctionSettled(state) && (
        <BidListText>You’re taking part in the {participatesInAuction ? 'auction' : 'raffle'}!</BidListText>
      )}
    </>
  )
}

function isAuctionParticipant(
  userBid: BidWithPlace | undefined,
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

function selectBids(
  auctionWinnersCount: number | undefined,
  bidList: Bid[],
  userBid: BidWithPlace | undefined,
): BidWithPlace[] {
  if (auctionWinnersCount === undefined) {
    return []
  }

  if (bidList.length <= bidsMaxCount) {
    return bidList.map(toBidWithPlace)
  }

  const topAuctionBids = bidList.slice(0, topAuctionBidsCount).map(toBidWithPlace)

  const lastAuctionBidIndex = bidList.length > auctionWinnersCount ? auctionWinnersCount - 1 : bidList.length - 1
  const lastAuctionBid = toBidWithPlace(bidList[lastAuctionBidIndex], lastAuctionBidIndex)

  return userBid && shouldUserBidBeDisplayed(userBid, lastAuctionBid, auctionWinnersCount)
    ? topAuctionBids.concat([userBid, lastAuctionBid])
    : topAuctionBids.concat([lastAuctionBid])
}

const shouldUserBidBeDisplayed = (userBid: BidWithPlace, lastAuctionBid: Bid, auctionWinnersCount: number) => {
  return !(userBid.address === lastAuctionBid.address) && within(bidsMaxCount, auctionWinnersCount - 1, userBid.place)
}

const within = (...[lower, higher, value]: number[]) => value >= lower && value <= higher

const toBidWithPlace = (bid: Bid, arrayIndex: number): BidWithPlace => ({ ...bid, place: arrayIndex + 1 })

export const BidList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  width: 100%;
  margin: 0;
  padding: 0;
`
const BidListText = styled.div`
  width: 100%;
  text-align: center;
  background: linear-gradient(90deg, #7ec188 0%, #65c4e8 45.31%, #7779b5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  margin-top: -16px;
`
