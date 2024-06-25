import styled from 'styled-components'
import { Logo } from '@/components/icons'
import { Colors } from '@/styles/colors'
import { AccountButton } from '@/components/topBar/AccountButton'
import { MediaQueries } from '@/styles/mediaQueries'
import { VisitDevconLink } from './VisitDevconLink'
import { useResponsiveHelpers } from '@/hooks/useResponsiveHelper'

export const TopBar = () => {
  const { isMobileWidth } = useResponsiveHelpers()

  return (
    <TopBarContainer>
      <RowWrapper>
        <HomeLink href="/">
          <Logo />
        </HomeLink>
        <ButtonWrapper>
          {!isMobileWidth && <VisitDevconLink />}
          <AccountButton />
        </ButtonWrapper>
      </RowWrapper>
      {isMobileWidth && <VisitDevconLink />}
    </TopBarContainer>
  )
}

const TopBarContainer = styled.div`
  display: flex;
  padding: 8px 68px;
  background-color: ${Colors.White};
  position: sticky;
  top: 0;
  z-index: 99;

  ${MediaQueries.medium} {
    flex-direction: column;
    padding: 0;
    gap: 0;
  }
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ${MediaQueries.medium} {
    gap: 40px;
    border-bottom: 1px solid #cdcdcd;
    padding: 12px 32px;
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
