import styled from 'styled-components'

import { VoucherTimeLeft } from './VoucherTimeLeft'
import { useAuctionState } from '@/blockchain/hooks/useAuctionState'
import { Button } from '@/components/buttons'
import { Colors } from '@/styles/colors'
import { useClaimVoucher } from '@/backend/useClaimVoucher'

interface ClaimVoucherSectionProps {
  setVoucher: (val: string) => void
}

export const ClaimVoucherSection = ({ setVoucher }: ClaimVoucherSectionProps) => {
  const state = useAuctionState()
  const { claimVoucher, isPending } = useClaimVoucher(setVoucher)

  return (
    <VoucherOption>
      <Button view="primary" wide onClick={claimVoucher} isLoading={isPending}>
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
