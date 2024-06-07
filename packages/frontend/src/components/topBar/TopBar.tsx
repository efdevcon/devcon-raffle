import styled from 'styled-components'
import { Logo } from '@/components/icons'
import { Colors } from '@/styles/colors'
import { AccountButton } from '@/components/topBar/AccountButton'
import { MediaQueries } from '@/styles/mediaQueries'

export const TopBar = () => {
  return (
    <TopBarContainer>
      <HomeLink href="/">
        <Logo />
      </HomeLink>
      <AccountButton />
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
