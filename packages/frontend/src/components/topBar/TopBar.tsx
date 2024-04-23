import styled from 'styled-components'
import { Logo } from '@/components/icons'
import { Colors } from '@/styles/colors'
import { AccountButton } from '@/components/topBar/AccountButton'

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
`
const HomeLink = styled.a`
  line-height: 1;
`
