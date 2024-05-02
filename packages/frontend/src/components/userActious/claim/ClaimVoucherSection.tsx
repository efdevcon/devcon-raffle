import styled from 'styled-components'

import { VoucherTimeLeft } from './VoucherTimeLeft'
import { useAuctionState } from '@/blockchain/hooks/useAuctionState'
import { Button } from '@/components/buttons'
import { ErrorNotifications } from '@/components/notifications/ErrorNotifications'
import { Colors } from '@/styles/colors'
import { useClaimVoucher } from '@/backend/useClaimVoucher'

interface ClaimVoucherSectionProps {
  setVoucher: (val: string) => void
}

export const ClaimVoucherSection = ({ setVoucher }: ClaimVoucherSectionProps) => {
  const state = useAuctionState()
  const { mutate, isPending, error, reset } = useClaimVoucher(setVoucher)

  return (
    <VoucherOption>
      {error && <ErrorNotifications error={error} onClick={mutate} reset={reset} />}
      <Button view="primary" wide onClick={mutate} isLoading={isPending}>
        Get voucher code
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
