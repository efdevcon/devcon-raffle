import { useResponsiveHelpers } from '@/hooks/useResponsiveHelper'
import { Info } from '../info/Info'
import { Auction } from '../auction/Auction'
import { Header } from '@/components/info/Header'
import { InfoAccordion } from '../info/Accordion'
import { styled } from 'styled-components'
import { MediaQueries } from '@/styles/mediaQueries'

export const Layout = () => {
  const { isMobileWidth } = useResponsiveHelpers()

  return (
    <PageContainer>
      {isMobileWidth ? (
        <>
          <Header />
          <Auction />
          <InfoAccordion />
        </>
      ) : (
        <>
          <Info />
          <Auction />
        </>
      )}
    </PageContainer>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;

  ${MediaQueries.medium} {
    flex-direction: column;
  }
`
