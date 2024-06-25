import { styled } from 'styled-components'
import { LanguageIcon } from '../icons'
import { Colors } from '@/styles/colors'
import { MediaQueries } from '@/styles/mediaQueries'

export const VisitDevconLink = () => {
  return (
    <VisitLink href="https://devcon.org/en/tickets/" target="_blank">
      <VisitLinkText>Visit Devcon Website</VisitLinkText>
      <LanguageIcon />
    </VisitLink>
  )
}

const VisitLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${Colors.Black};

  ${MediaQueries.medium} {
    width: 100%;
    padding: 8px 32px;
  }
`

const VisitLinkText = styled.p`
  text-decoration: underline;
  white-space: nowrap;
`
