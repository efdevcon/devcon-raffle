import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import styled from 'styled-components'
import { TxFlowSteps } from '@/components/auction/TxFlowSteps'
import { UserBid } from '@/types/bid'
import { FormWrapper } from '@/components/form'
import { Colors } from '@/styles/colors'
import { WinBidForm } from '@/components/userActious/claim/WinBidForm'
import { VoucherForm } from '@/components/userActious/claim/VoucherForm'

interface WinFormProps {
  userBid: UserBid
  withdrawalAmount: bigint
  setView: (state: TxFlowSteps) => void
}

export const WinForm = ({ userBid, withdrawalAmount, setView }: WinFormProps) => {
  const { address } = useAccount()
  const [voucher, setVoucher] = useState<string>()

  useEffect(() => {
    setVoucher(undefined)
  }, [address])

  if (!voucher) {
    return (
      <Wrapper>
        <WinBidForm
          userBid={userBid}
          withdrawalAmount={withdrawalAmount}
          setView={setView}
          voucher={voucher}
          setVoucher={setVoucher}
        />
      </Wrapper>
    )
  }
  return  <VoucherForm voucher={voucher} withdrawnBid={userBid.claimed} />
}

const Wrapper = styled(FormWrapper)`
  justify-content: center;
`
