import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import styled from 'styled-components'
import { TxFlowSteps } from '@/components/auction/TxFlowSteps'
import { UserBid } from '@/types/bid'
import { FormWrapper } from '@/components/form'
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

  return (
    <>
      {!(userBid.claimed && voucher) && (
        <Wrapper>
          <WinBidFormWrapper $hasVoucher={!!voucher}>
            <WinBidForm
              userBid={userBid}
              withdrawalAmount={withdrawalAmount}
              setView={setView}
              voucher={voucher}
              setVoucher={setVoucher}
            />
          </WinBidFormWrapper>
        </Wrapper>
      )}
      {voucher && (
        <Wrapper>
          <VoucherForm voucher={voucher} withdrawnBid={userBid.claimed} />
        </Wrapper>
      )}
    </>
  )
}

const WinBidFormWrapper = styled(FormWrapper)<{ $hasVoucher?: boolean }>`
  justify-content: center;
  width: ${(props) => (props.$hasVoucher ? '289px' : '431px')};
`

const Wrapper = styled.div`
  padding: 0 35px;
`
