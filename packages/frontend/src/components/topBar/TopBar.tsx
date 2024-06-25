import styled from 'styled-components'
import { Logo } from '@/components/icons'
import { Colors } from '@/styles/colors'
import { AccountButton } from '@/components/topBar/AccountButton'
import { MediaQueries } from '@/styles/mediaQueries'
import { VisitDevconLink } from './VisitDevconLink'

export const TopBar = () => {
  return (
    <TopBarContainer>
      <HomeLink href="/">
        <Logo />
      </HomeLink>
      <ButtonWrapper>
        <VisitDevconLink />
        <AccountButton />
      </ButtonWrapper>
    </TopBarContainer>
  )
}

const TopBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 68px;
  background-color: ${Colors.White};
  position: sticky;
  top: 0;
  z-index: 99;

  ${MediaQueries.medium} {
    padding: 12px 32px;
    gap: 40px;
  }
`
const HomeLink = styled.a`
  line-height: 1;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`
