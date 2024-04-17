import { useMemo } from 'react'
import styled from 'styled-components'

import { useAuctionState } from '@/blockchain/hooks/useAuctionState'
import { useBids } from '@/providers/BidsProvider'
import { Button } from '@/components/buttons/Button'
import { useRouter } from 'next/navigation'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'
import { Colors } from '@/styles/colors'
import { Bid, UserBid } from '@/types/bid'
import { useUserBid } from '@/blockchain/hooks/useUserBid'
import { BidsList } from '@/components/bidsList/BidsList'
import { BidsListHeaders } from '@/components/bidsList/BidsListHeaders'

const topAuctionBidsCount = 3
const bidsMaxCount = topAuctionBidsCount + 1

export const BidsListSection = () => {
  const state = useAuctionState()
  const { bidList } = useBids()
  const userBid = useUserBid()
  const { auctionWinnersCount } = useReadAuctionParams()
  const router = useRouter()

  const bidsShortlist = useMemo(
    () => selectBids(auctionWinnersCount, bidList, userBid),
    [auctionWinnersCount, bidList, userBid],
  )

  const isLoadingParams = auctionWinnersCount === undefined

  return (
    <BidsListContainer>
      {!isLoadingParams && bidList.length === 0 ? (
        <EmptyList>
          <ColoredText>
            {state === 'AwaitingBidding' ? 'Bids will show up here' : `No bidders yet. Be the first one!`}
          </ColoredText>
        </EmptyList>
      ) : (
        <>
          <ListHeader>
            <h3>Number of participants:</h3>
            <ColoredText>{isLoadingParams ? 0 : bidList.length}</ColoredText>
          </ListHeader>
          <BidsListHeaders />
          <BidsList bids={bidsShortlist} view="short" isLoadingParams={isLoadingParams} />
        </>
      )}
      {!isLoadingParams && bidList.length !== 0 && (
        <Button view="secondary" onClick={() => router.push('/bids')}>
          Show all
        </Button>
      )}
    </BidsListContainer>
  )
}

function selectBids(auctionWinnersCount: number | undefined, bidList: Bid[], userBid: UserBid | undefined) {
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

const shouldUserBidBeDisplayed = (userBid: UserBid, lastAuctionBid: Bid, auctionWinnersCount: number) => {
  return !(userBid.address === lastAuctionBid.address) && within(bidsMaxCount, auctionWinnersCount - 1, userBid.place)
}

const within = (...[lower, higher, value]: number[]) => value >= lower && value <= higher

const BidsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 32px;
  width: 100%;
  padding: 46px 0;
`

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
  width: 100%;
`

const EmptyList = styled.div`
  margin: 48px 0;
`
const ColoredText = styled.h3`
  width: max-content;
  color: ${Colors.Blue};
`
