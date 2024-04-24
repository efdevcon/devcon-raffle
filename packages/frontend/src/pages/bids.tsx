import styled from 'styled-components'
import { Colors } from '@/styles/colors'
import { Header } from '@/components/bids/allBids/Header'
import { AllBids } from '@/components/bids/allBids/AllBids'

export default function Bids() {
  return (
    <Body>
      <Header />
      <AllBids />
    </Body>
  )
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  background: ${Colors.White};
`
