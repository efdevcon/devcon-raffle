import { useContractState } from '@/blockchain/hooks/useAuctionState'
import styled from 'styled-components'
import { FormHeading, FormRow, FormWrapper } from '../form'
import { ConnectWalletButton } from '../buttons'
import { getWarningText } from './getWarningText'

export const ConnectWalletWarning = () => {
  const { state } = useContractState()
  const text = getWarningText(state)

  return (
    <FormWrapper>
      <FormHeading>{text.heading}</FormHeading>
      <FormRow>
        <span>
          To {text.action} please connect your wallet to the <strong>Arbitrum</strong> network.
        </span>
      </FormRow>
      <ConnectWalletButton />
    </FormWrapper>
  )
}

