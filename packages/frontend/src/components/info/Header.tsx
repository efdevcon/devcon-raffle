import styled from 'styled-components'
import { TimeLeft } from './TimeLeft'
import { VoucherTimeLeft } from './VoucherTimeLeft'
import { Colors } from '@/styles/colors'
import { HeaderBar } from '@/components/common/Header'
import { useContractState } from '@/blockchain/hooks/useAuctionState'
import { MediaQueries } from '@/styles/mediaQueries'
import { ContractState } from '@/types/ContractState'

export const Header = () => {
  const { state } = useContractState()

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

function isClaimingFlow(state: ContractState | undefined) {
  return state === ContractState.RAFFLE_SETTLED || state === ContractState.CLAIMING_CLOSED
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledHeader = styled(HeaderBar)`
  height: 225px;
  padding: 16px 68px;

  ${MediaQueries.large} {
    padding: 16px 32px;
  }

  ${MediaQueries.medium} {
    height: 128px;
    padding: 12px 32px 8px;
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 1058px;
  margin: 0 auto;
  position: relative;

  ${MediaQueries.medium} {
    max-width: 440px;
  }
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

  ${MediaQueries.large} {
    font-size: 40px;
  }

  ${MediaQueries.medium} {
    font-size: 20px;
  }
`

const SubTitle = styled.h3`
  background-color: ${Colors.White};
  padding: 0 10px;

  ${MediaQueries.medium} {
    font-size: 14px;
  }
`
