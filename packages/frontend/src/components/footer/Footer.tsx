import { ArchblockLogoIcon, FairyLogoIcon } from '@/components/icons'
import { Colors, hexOpacity } from '@/styles/colors'
import { MediaQueries } from '@/styles/mediaQueries'
import styled from 'styled-components'

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterRow>
        <FooterText>Built with 🖤 by</FooterText>
        <LogoBlock>
          <LogoLink href="https://www.archblock.com/" target="_blank" rel="noopener noreferrer">
            <ArchblockLogoIcon />
          </LogoLink>
          <FooterText>&</FooterText>
          <LogoLink href="https://www.fairy.dev/" target="_blank" rel="noopener noreferrer">
            <FairyLogoIcon />
          </LogoLink>
        </LogoBlock>
      </FooterRow>
      <FooterText>© 2024 All rights reserved.</FooterText>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: ${Colors.White};
  border-top: 1px solid ${hexOpacity(Colors.Black, 0.1)};
  padding: 40px 0;

  ${MediaQueries.medium} {
    padding: 32px;
  }
`

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;

  ${MediaQueries.medium} {
    flex-direction: column;
    gap: 8px;
    padding: 8px 0;
  }
`

const FooterText = styled.p`
  color: ${Colors.Grey};

  ${MediaQueries.medium} {
    font-size: 14px;
  }
`

const LogoBlock = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`

const LogoLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`
