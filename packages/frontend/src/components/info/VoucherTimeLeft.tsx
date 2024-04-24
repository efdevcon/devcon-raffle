import { Colors } from '@/styles/colors'
import styled from 'styled-components'

import { RemainingTime } from './TimeLeft'
import { formatDate } from '@/utils/formatters/formatDate'
import { useVoucherRedeemDeadline } from '@/blockchain/hooks/useVoucherRedeemDeadline'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'

export const VoucherTimeLeft = () => {
  const { biddingEndTime } = useReadAuctionParams()
  const redeemTimestamp = useVoucherRedeemDeadline()
  const isPeriodExpired = redeemTimestamp ? redeemTimestamp * BigInt(1000) < Date.now() : false

  return (
    <VoucherTimeBox isPeriodExpired={isPeriodExpired}>
      <TimeRow isPeriodExpired={isPeriodExpired}>
        <span>{isPeriodExpired ? 'Voucher redeem period expired on ' : 'Voucher redeem period: '}</span>
        {!isPeriodExpired && <RemainingTime>{formatDate(biddingEndTime)} - </RemainingTime>}
        <RemainingTime>{formatDate(redeemTimestamp)}</RemainingTime>
      </TimeRow>
    </VoucherTimeBox>
  )
}

interface TimeProps {
  isPeriodExpired: boolean
}

const VoucherTimeBox = styled.div<TimeProps>`
  width: calc(100% - 54px);
  padding: 8px 24px 8px 68px;
  background: ${({ isPeriodExpired }) => (isPeriodExpired ? Colors.Red : Colors.Black)};
`
const TimeRow = styled.div<TimeProps>`
  display: flex;
  align-items: center;
  column-gap: 8px;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1112px;
  font-family: 'Space Mono', 'Roboto Mono', monospace;
  color: ${({ isPeriodExpired }) => (isPeriodExpired ? Colors.Red : Colors.White)};
`
