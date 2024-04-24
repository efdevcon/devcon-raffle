import styled from 'styled-components'
import { FormWideWrapper } from '@/components/form'

export const BidAwaiting = () => (
  <BidAwaitingWrapper>
    <h2>Bidding has not started yet ⏳</h2>
  </BidAwaitingWrapper>
)

const BidAwaitingWrapper = styled(FormWideWrapper)`
  padding: 0 54px;
`
