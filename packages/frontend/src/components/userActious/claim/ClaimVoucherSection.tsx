import styled from 'styled-components'

import { VoucherTimeLeft } from './VoucherTimeLeft'
import { useAuctionState } from '@/blockchain/hooks/useAuctionState'
import { Button } from '@/components/buttons'
import { ErrorNotifications } from '@/components/notifications/ErrorNotifications'
import { Colors } from '@/styles/colors'
import { useMutation } from '@tanstack/react-query'

interface ClaimVoucherSectionProps {
  setVoucher: (val: string) => void
}

export const ClaimVoucherSection = ({ setVoucher }: ClaimVoucherSectionProps) => {
  const state = useAuctionState()

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 2000))
      return 'YOUR VOUCHER CODE'
    },
    onSuccess: (data) => setVoucher(data),
  })

  return (
    <VoucherOption>
      {error && <ErrorNotifications error={error} onClick={mutate} reset={reset} />}
      <Button view="primary" wide onClick={mutate} isLoading={isPending}>
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
