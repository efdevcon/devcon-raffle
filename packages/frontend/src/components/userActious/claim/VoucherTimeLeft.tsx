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
      <b>{timeLeft}</b> <span>left to redeem your voucher code</span>
    </TimeRow>
  )
}

const TimeRow = styled.div`
  color: ${Colors.Black};
`
