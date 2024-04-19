import styled from 'styled-components'
import { Colors } from '@/styles/colors'
import { BidsShortListSection } from '@/components/bids/bidsShortList/BidsShortListSection'

export const Auction = () => {
  return (
    <Wrapper>
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
`
