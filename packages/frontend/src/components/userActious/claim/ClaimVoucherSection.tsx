import { useState } from 'react'
import styled from 'styled-components'

import { VoucherTimeLeft } from './VoucherTimeLeft'
import { useAuctionState } from '@/blockchain/hooks/useAuctionState'
import { Button } from '@/components/buttons'
import { ErrorNotifications } from '@/components/notifications/ErrorNotifications'
import { Colors } from '@/styles/colors'

interface ClaimVoucherSectionProps {
  setVoucher: (val: string) => void
}

export const ClaimVoucherSection = ({ setVoucher }: ClaimVoucherSectionProps) => {
  const state = useAuctionState()
  const [error, setError] = useState<string>()
  const handleError = async () => {}

  return (
    <VoucherOption>
      {error && <ErrorNotifications error={error} onClick={handleError} setError={setError} />}
      <Button view="primary" wide>
        Claim voucher code
      </Button>
      {state !== 'ClaimingClosed' && <VoucherTimeLeft />}
    </VoucherOption>
  )
}

const VoucherOption = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${Colors.White};
  row-gap: 20px;
`
