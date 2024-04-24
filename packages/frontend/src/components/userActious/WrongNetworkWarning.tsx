import { useSwitchChain } from "wagmi";
import { useContractState } from "@/blockchain/hooks/useAuctionState";
import { getWarningText } from "@/components/userActious/getWarningText";
import { FormHeading, FormRow, FormWrapper } from "@/components/form";
import { Colors } from "@/styles/colors";
import styled from "styled-components";
import { Button } from "@/components/buttons";
import { arbitrum } from "wagmi/chains";

export const WrongNetworkWarning = () => {
  const { switchChainAsync } = useSwitchChain()
  const { state } = useContractState()
  const text = getWarningText(state)

  const onSwitch = () => switchChainAsync({chainId: arbitrum.id})

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
      <FormRow>
        <span>
          <TutorialLink
            target="_blank"
            href="https://consensys.net/blog/metamask/how-to-bridge-your-assets-to-arbitrum-using-metamask/"
          >
            Click here to read the tutorial for MetaMask
          </TutorialLink>{' '}
          »
        </span>
      </FormRow>
      <Button onClick={onSwitch}>Change network</Button>
    </FormWrapper>
  )
}

const TutorialLink = styled.a`
  color: ${Colors.GreenLight};
  text-decoration: underline;
`
