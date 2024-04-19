import { useContractState } from '@/blockchain/hooks/useAuctionState'
import styled from 'styled-components'
import { FormHeading, FormRow, FormWrapper } from '../form'
import { ConnectWalletButton } from '../buttons'
import { getWarningText } from './getWarningText'

export const ConnectWalletWarning = () => {
  const { state } = useContractState()
  const text = getWarningText(state)

  return (
    <ConnectFormWrapper>
      <FormHeading>{text.heading}</FormHeading>
      <FormRow>
        <span>To {text.action} connect your wallet</span>
      </FormRow>
      <ConnectWalletButton />
    </ConnectFormWrapper>
  )
}

const ConnectFormWrapper = styled(FormWrapper)`
  justify-content: center;
  padding: 0 218px;
`
