import { FormWideWrapper } from '@/components/form'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'
import { formatDate } from '@/utils/formatters/formatDate'

export const BidAwaiting = () => {
  const { biddingStartTime } = useReadAuctionParams()
  return (
    <FormWideWrapper>
      <h2>Bidding starts on {formatDate(biddingStartTime)}</h2>
    </FormWideWrapper>
  )
}
