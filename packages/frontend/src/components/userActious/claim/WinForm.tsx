import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import styled from 'styled-components'
import { TxFlowSteps } from '@/components/auction/TxFlowSteps'
import { UserBid } from '@/types/bid'
import { FormWrapper } from '@/components/form'
import { WinBidForm } from '@/components/userActious/claim/WinBidForm'
import { VoucherForm } from '@/components/userActious/claim/VoucherForm'
import { WinType } from '@/types/winType'
import { MediaQueries } from '@/styles/mediaQueries'

interface WinFormProps {
  userBid: UserBid
  withdrawalAmount: bigint
  setView: (state: TxFlowSteps) => void
}

export const WinForm = ({ userBid, withdrawalAmount, setView }: WinFormProps) => {
  const { address } = useAccount()
  const [voucher, setVoucher] = useState<string>()

  const twoColumns = !!voucher && userBid.winType !== WinType.Auction

  useEffect(() => {
    setVoucher(undefined)
  }, [address])

  return (
    <WinFormWrapper>
      {((!userBid.claimed && userBid.winType !== WinType.Auction) || !voucher) && (
        <Wrapper>
          <WinBidFormWrapper $twoColumns={twoColumns}>
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
          <VoucherForm voucher={voucher} />
        </Wrapper>
      )}
    </WinFormWrapper>
  )
}

const WinFormWrapper = styled.div`
  display: flex;

  ${MediaQueries.medium} {
    flex-direction: column;
    gap: 32px;
  }
`

const WinBidFormWrapper = styled(FormWrapper)<{ $twoColumns?: boolean }>`
  justify-content: center;
  width: ${(props) => (props.$twoColumns ? '289px' : '431px')};
  padding: 0;

  ${MediaQueries.medium} {
    width: 100%;
  }
`

const Wrapper = styled.div`
  padding: 0 35px;

  ${MediaQueries.medium} {
    padding: 0;
  }
`
