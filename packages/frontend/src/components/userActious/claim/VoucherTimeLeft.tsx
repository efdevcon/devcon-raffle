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
      <h3>{timeLeft}</h3> <span>left to redeem your voucher code</span>
    </TimeRow>
  )
}

const TimeRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-wrap: wrap;
  column-gap: 16px;
  width: 100%;
  color: ${Colors.Black};
`
