import styled from 'styled-components'
import { TimeLeft } from './TimeLeft'
import { VoucherTimeLeft } from './VoucherTimeLeft'
import { Colors } from '@/styles/colors'
import { HeaderBar } from '@/components/common/Header'
import { AuctionState, useAuctionState } from '@/blockchain/hooks/useAuctionState'

export const Header = () => {
  const state = useAuctionState()

  return (
    <Wrapper>
      <StyledHeader>
        <HeaderWrapper>
          <InfoWrapper>
            <TitleWrapper>
              <Title>Devcon 6</Title>
              <SubTitle>Auction & Raffle Ticket Sale</SubTitle>
            </TitleWrapper>
            <TimeLeft />
          </InfoWrapper>
        </HeaderWrapper>
      </StyledHeader>
      {isClaimingFlow(state) && <VoucherTimeLeft />}
    </Wrapper>
  )
}

function isClaimingFlow(state: AuctionState | undefined) {
  return state === 'ClaimingFlow' || state === 'ClaimingClosed'
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledHeader = styled(HeaderBar)`
  height: 225px;
  padding: 16px 68px;
`

const HeaderWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 1058px;
  margin: 0 auto;
  position: relative;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  @media screen and (min-width: 1800px) {
    justify-content: flex-start;
    row-gap: 40px;
  }
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1800px) {
    flex-direction: row;
    align-items: flex-end;
    column-gap: 20px;
    padding-top: 16px;
  }
`

const Title = styled.h1`
  background-color: ${Colors.White};

  @media screen and (min-width: 1800px) {
    line-height: 1;
  }

  @media screen and (max-width: 1260px) {
    font-size: 40px;
  }
`

const SubTitle = styled.h3`
  color: ${Colors.Black};
  background-color: ${Colors.White};
`
