import { Transactions } from '@/blockchain/transaction'
import { CheckIcon } from '@/components/icons'
import { Colors } from '@/styles/colors'
import styled from 'styled-components'

const text = {
  [Transactions.Place]: 'placed your bid',
  [Transactions.Bump]: 'bumped your bid',
  [Transactions.Withdraw]: 'withdrawn your funds',
}

interface SuccessHeaderProps {
  action: Transactions
}

export function TransactionSuccessHeader({ action }: SuccessHeaderProps) {
  return (
    <SuccessHeaderWrap>
      <HeaderRowIconContainer>
        <CheckIcon color={Colors.Black} size={32} />
      </HeaderRowIconContainer>
      <SuccessText>You&apos;ve successfully {text[action]}!</SuccessText>
    </SuccessHeaderWrap>
  )
}

const SuccessHeaderWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`

const HeaderRowIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid ${Colors.Black};
`

const SuccessText = styled.span`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
`
