import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useVoucherRedeemDeadline } from '@/blockchain/hooks/useVoucherRedeemDeadline'
import { formatTimeLeft } from '@/utils/formatters/formatTimeLeft'
import { setIntervalImmediately } from '@/utils/setIntervalImmediately'
import { Colors } from '@/styles/colors'

export const VoucherTimeLeft = () => {
  const redeemDeadline = useVoucherRedeemDeadline()
  const [timeLeft, setTimeLeft] = useState(formatTimeLeft(redeemDeadline))

  useEffect(() => {
    const interval = setIntervalImmediately(() => setTimeLeft(formatTimeLeft(redeemDeadline)), 1_000)
    return () => clearInterval(interval)
  }, [redeemDeadline])

  return (
    <TimeRow>
      <RemainingTime>{timeLeft}</RemainingTime>
      <span>left to redeem your voucher code</span>
    </TimeRow>
  )
}

const TimeRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 8px;
  line-height: 1;
  color: ${Colors.White};
`
const RemainingTime = styled.span`
  font-size: 24px;
  font-weight: 700;
  font-family: 'Space Mono', 'Roboto Mono', monospace;
`
