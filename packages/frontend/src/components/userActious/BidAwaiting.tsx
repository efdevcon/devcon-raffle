import { FormWideWrapper } from '@/components/form'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'
import { formatDate } from '@/utils/formatters/formatDate'
import { styled } from 'styled-components'
import { MediaQueries } from '@/styles/mediaQueries'

export const BidAwaiting = () => {
  const { biddingStartTime } = useReadAuctionParams()
  return (
    <FormWideWrapper>
      <AwaitingHeader>Bidding starts on {formatDate(biddingStartTime)}</AwaitingHeader>
    </FormWideWrapper>
  )
}

const AwaitingHeader = styled.h2`
  ${MediaQueries.medium} {
    font-size: 24px;
  }
`
