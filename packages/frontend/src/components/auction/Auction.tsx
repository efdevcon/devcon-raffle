import styled from 'styled-components'
import { Colors } from '@/styles/colors'
import { BidsListSection } from '@/components/bidsList/BidsListSection'
import { UserActionSection } from '../userActious/UserActionSection'

export const Auction = () => {
  return (
    <Wrapper>
      <UserActionSection />
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
