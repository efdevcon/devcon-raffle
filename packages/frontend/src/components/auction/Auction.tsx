import styled from 'styled-components'
import { Colors } from '@/styles/colors'
import { UserActionSection } from '../userActious/UserActionSection'
import { BidsShortListSection } from '@/components/bids/bidsShortList/BidsShortListSection'
import { MediaQueries } from '@/styles/mediaQueries'

export const Auction = () => {
  return (
    <Wrapper>
      <UserActionSection />
      <BidsShortListSection />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 670px;
  padding: 0 115px;
  background: ${Colors.GreyLight};

  ${MediaQueries.medium} {
    width: 100%;
    padding: 0;
  }
`
