import styled from 'styled-components'
import { Colors } from '@/styles/colors'
import { Header } from '@/components/allBids/Header'

export default function Bids() {
  return (
    <Body>
      <Header />
    </Body>
  )
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  background: ${Colors.GreyLight};
`
