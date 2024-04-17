import styled from 'styled-components'
import { Colors } from '@/styles/colors'
import { BidsListSection } from '@/components/bidsList/BidsListSection'

export const Auction = () => {
  return (
    <Wrapper>
      <BidsListSection />
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
