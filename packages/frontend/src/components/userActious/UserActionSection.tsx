import { AuctionState, useAuctionState } from '@/blockchain/hooks/useAuctionState'
import { Colors } from '@/styles/colors'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { ConnectWalletWarning } from './ConnectWalletWarning'
import { GitcoinFlow } from './gitcoin/GitcointFlow'
import { BidFlow } from './bid/BidFlow'
import { BidAwaiting } from '@/components/userActious/BidAwaiting'

const Placeholder = () => <div />

const UserActions: Record<AuctionState, () => ReactElement> = {
  AwaitingBidding: BidAwaiting,
  WalletNotConnected: ConnectWalletWarning,
  WrongNetwork: Placeholder,
  BiddingFlow: BidFlow,
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
  background-color: ${Colors.Pink};
  position: relative;
  z-index: 1;
`
