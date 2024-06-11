import { FormWideWrapper } from '@/components/form'
import { MediaQueries } from '@/styles/mediaQueries'
import { styled } from 'styled-components'

export const ClaimingClosed = () => (
  <FormWideWrapper>
    <ClaimingHeader>Withdraw period ended ⌛️</ClaimingHeader>
  </FormWideWrapper>
)

const ClaimingHeader = styled.h2`
  ${MediaQueries.medium} {
    font-size: 24px;
  }
`
