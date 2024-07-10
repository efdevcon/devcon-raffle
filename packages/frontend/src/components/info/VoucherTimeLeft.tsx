import { Colors } from '@/styles/colors'
import styled from 'styled-components'

import { RemainingTime } from './TimeLeft'
import { formatDate } from '@/utils/formatters/formatDate'
import { useVoucherRedeemDeadline } from '@/blockchain/hooks/useVoucherRedeemDeadline'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'
import { MediaQueries } from '@/styles/mediaQueries'

export const VoucherTimeLeft = () => {
  const { claimingEndTime } = useReadAuctionParams()
  const redeemTimestamp = useVoucherRedeemDeadline()
  const isRedeemingExpired = redeemTimestamp ? redeemTimestamp * BigInt(1000) < Date.now() : false
  const isClaimingExpired = claimingEndTime ? claimingEndTime * BigInt(1000) < Date.now() : false

  return (
    <VoucherTimeBox isPeriodExpired={isRedeemingExpired}>
      <TimeRow isPeriodExpired={isClaimingExpired}>
        <span>{isClaimingExpired ? 'Refund claiming expired on ': 'Refund claiming ends: '}</span>
        <RemainingTime>{formatDate(claimingEndTime)}</RemainingTime>
      </TimeRow>
      <TimeRow isPeriodExpired={isRedeemingExpired}>
        <span>{isRedeemingExpired ? 'Voucher redemption expired on ' : 'Voucher redemption ends: '}</span>
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

  ${MediaQueries.large} {
    width: 100%;
    padding: 32px;
  }
`
const TimeRow = styled.div<TimeProps>`
  display: flex;
  align-items: center;
  column-gap: 8px;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1112px;
  font-family: 'Space Mono', 'Roboto Mono', monospace;
  color: ${Colors.White};
`
