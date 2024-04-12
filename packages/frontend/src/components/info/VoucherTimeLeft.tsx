// import { useDevconParam } from 'src/hooks'
// import { useVoucherRedeemDeadline } from 'src/hooks/useVoucherRedeemDeadline'
import {Colors} from "@/styles/colors";
import styled from 'styled-components'

import { RemainingTime } from './TimeLeft'
import {BigNumber} from "@ethersproject/bignumber";
import {formatEndDate} from "@/utils/formatters/formatEndDate";

export const VoucherTimeLeft = () => {
  // const { devconValue: timestamp } = useDevconParam('biddingEndTime')
  const timestamp = BigNumber.from(1742987219)
  // const redeemTimestamp = useVoucherRedeemDeadline()
  const redeemTimestamp = BigNumber.from(1742987219)
  const isPeriodExpired = redeemTimestamp?.mul(1000).lt(Date.now()) ?? false

  return (
    <VoucherTimeBox isPeriodExpired={isPeriodExpired}>
      <TimeRow isPeriodExpired={isPeriodExpired}>
        <span>{isPeriodExpired ? 'Voucher redeem period expired on ' : 'Voucher redeem period: '}</span>
        {!isPeriodExpired && <RemainingTime>{formatEndDate(timestamp)} - </RemainingTime>}
        <RemainingTime>{formatEndDate(redeemTimestamp)}</RemainingTime>
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
  background: ${({ isPeriodExpired }) => (isPeriodExpired ? Colors.RedLight : Colors.Blue)};
`
const TimeRow = styled.div<TimeProps>`
  display: flex;
  align-items: center;
  column-gap: 8px;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1112px;
  font-family: 'Space Mono', 'Roboto Mono', monospace;
  color: ${({ isPeriodExpired }) => (isPeriodExpired ? Colors.RedDark : Colors.White)};
`
