import { styled } from 'styled-components'
import { LanguageIcon } from '../icons'
import { Colors } from '@/styles/colors'

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
`

const VisitLinkText = styled.p`
  text-decoration: underline;
  white-space: nowrap;
`
