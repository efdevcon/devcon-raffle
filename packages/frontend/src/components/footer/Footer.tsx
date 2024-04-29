import { ArchblockLogoIcon, FairyLogoIcon } from '@/components/icons'
import { Colors, hexOpacity } from '@/styles/colors'
import styled from 'styled-components'

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterRow>
        <FooterText>Built with 🖤 by</FooterText>
        <LogoLink href="https://www.archblock.com/" target="_blank" rel="noopener noreferrer">
          <ArchblockLogoIcon />
        </LogoLink>
        <FooterText>&</FooterText>
        <LogoLink href="https://www.fairy.dev/" target="_blank" rel="noopener noreferrer">
          <FairyLogoIcon />
        </LogoLink>
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
`

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
  padding: 16px 0;
`

const FooterText = styled.p`
  color: ${Colors.Grey};
`

const LogoLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`
