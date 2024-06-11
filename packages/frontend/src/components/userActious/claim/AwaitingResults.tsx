import { FormHeading, FormText, FormWideWrapper } from '@/components/form'
import { MediaQueries } from '@/styles/mediaQueries'
import { styled } from 'styled-components'

export const AwaitingResults = () => (
  <BidAwaitingWrapper>
    <FormHeading>Wait for results ⏳</FormHeading>
    <FormText>The bidding window has closed. Waiting for the organizers to settle the contest.</FormText>
  </BidAwaitingWrapper>
)

const BidAwaitingWrapper = styled(FormWideWrapper)`
  width: 460px;

  ${MediaQueries.medium} {
    width: 100%;
  }
`
