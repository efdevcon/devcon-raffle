import { useSwitchChain } from 'wagmi'
import { useContractState } from '@/blockchain/hooks/useAuctionState'
import { getWarningText } from '@/components/userActious/getWarningText'
import { FormHeading, FormRow, FormWrapper } from '@/components/form'
import { Button } from '@/components/buttons'
import { arbitrum } from 'wagmi/chains'

export const WrongNetworkWarning = () => {
  const { switchChainAsync } = useSwitchChain()
  const { state } = useContractState()
  const text = getWarningText(state)

  const onSwitch = () => switchChainAsync({ chainId: arbitrum.id })

  return (
    <FormWrapper>
      <FormHeading>{text.heading}</FormHeading>
      <FormRow>
        <span>You are connected to the wrong network.</span>
      </FormRow>
      <FormRow>
        <span>
          To {text.action} connect your wallet to the <b>Arbitrum network.</b>
        </span>
      </FormRow>
      <Button onClick={onSwitch}>Change network</Button>
    </FormWrapper>
  )
}
