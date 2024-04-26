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
              <Title>Devcon 7</Title>
              <SubTitle>Ticket Sale</SubTitle>
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
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Title = styled.h1`
  background-color: ${Colors.White};
  padding: 0 10px;

  @media screen and (max-width: 1260px) {
    font-size: 40px;
  }
`

const SubTitle = styled.h3`
  background-color: ${Colors.White};
  padding: 0 10px;
`
