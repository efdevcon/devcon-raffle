import styled from 'styled-components'
import { FormWideWrapper } from '@/components/form'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'
import { formatDate } from '@/utils/formatters/formatDate'

export const BidAwaiting = () => {
  const { biddingStartTime } = useReadAuctionParams()
  return (
    <BidAwaitingWrapper>
      <h2>Bidding starts on {formatDate(biddingStartTime)}</h2>
    </BidAwaitingWrapper>
  )
}

const BidAwaitingWrapper = styled(FormWideWrapper)`
  padding: 0 54px;
`
