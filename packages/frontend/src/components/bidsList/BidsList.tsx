import { useMemo } from 'react'
import styled from 'styled-components'
import { Bid, UserBid } from '@/types/bid'
import { useUserBid } from '@/blockchain/hooks/useUserBid'
import { Colors } from '@/styles/colors'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'
import { useBids } from '@/providers/BidsProvider'
import { useContractState } from '@/blockchain/hooks/useAuctionState'
import { Separator } from '@/components/common/Separator'
import { BidListEntry } from '@/components/bidsList/BidListEntry'
import { EmptyBidsList } from '@/components/bidsList/EmptyBidsList'
import { isAuctionSettled } from '@/utils/isAuctionSettled'
import { getFirstRaffleBidIndex } from '@/utils/getFirstRaffleBidIndex'

interface Props {
  bids: Bid[]
  view?: 'short' | 'full'
  isLoadingParams?: boolean
}

export const BidsList = ({ bids, view = 'full', isLoadingParams }: Props) => {
  const userBid = useUserBid()
  const { auctionWinnersCount, raffleWinnersCount } = useReadAuctionParams()
  const { state } = useContractState()
  const { bidList: allBids } = useBids()

  const userRaffleBid = useMemo(() => {
    return auctionWinnersCount && userBid && userBid.place > auctionWinnersCount ? userBid : undefined
  }, [userBid, auctionWinnersCount])

  const isAuctionWinner = useMemo(() => {
    return isAuctionParticipant(userBid, auctionWinnersCount, raffleWinnersCount, allBids.length)
  }, [auctionWinnersCount, allBids.length, raffleWinnersCount, userBid])

  if (isLoadingParams) {
    return <EmptyBidsList />
  }

  return (
    <>
      <BidList>
        {bids.map((bid) => (
          <BidListEntry key={bid.address} bid={bid} isUser={userBid && userBid.address === bid.address} view={view} />
        ))}
        {userRaffleBid && view === 'short' && (
          <>
            <Separator color={Colors.Grey} />
            <BidListEntry bid={userRaffleBid} isUser view={view} />
          </>
        )}
      </BidList>
      {view === 'short' && userBid && !isAuctionSettled(state) && (
        <BidListText>You’re taking part in the {isAuctionWinner ? 'auction' : 'raffle'}!</BidListText>
      )}
    </>
  )
}

function isAuctionParticipant(
  userBid: UserBid | undefined,
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
