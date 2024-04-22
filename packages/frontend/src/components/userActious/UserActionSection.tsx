import { AuctionState, useAuctionState } from '@/blockchain/hooks/useAuctionState'
import { Colors } from '@/styles/colors'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { ConnectWalletWarning } from './ConnectWalletWarning'
import { GitcoinFlow } from './gitcoin/GitcointFlow'

const Placeholder = () => <div />

const UserActions: Record<AuctionState, () => ReactElement> = {
  AwaitingBidding: Placeholder,
  WalletNotConnected: ConnectWalletWarning,
  WrongNetwork: Placeholder,
  BiddingFlow: Placeholder,
  AwaitingResults: Placeholder,
  ClaimingFlow: Placeholder,
  ClaimingClosed: Placeholder,
  GitcoinFlow: GitcoinFlow,
}

export const UserActionSection = () => {
  const state = useAuctionState()
  if (!state) {
    return <Wrapper />
  }

  const Content = UserActions[state]
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-left: -170px;
  width: 724px;
  height: 450px;
  background-color: ${Colors.Blue};
  position: relative;
  z-index: 1;
`
