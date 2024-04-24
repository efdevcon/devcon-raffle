import styled from 'styled-components'
import { Colors } from '@/styles/colors'
import { useExplorerAddressLink } from '@/blockchain/hooks/useExplorerAddressLink'
import { Hex } from 'viem'

interface Props {
  bidderAddress: Hex
}

export const GoldenTicketWinner = ({ bidderAddress }: Props) => {
  const explorerLink = useExplorerAddressLink(bidderAddress)

  return (
    <Container>
      <ReverseDoot>🎉</ReverseDoot>
      <Section>
        <HeaderText>THE GOLDEN TICKET WINNER IS:</HeaderText>
        <AddressLink href={explorerLink} target="_blank" rel="noopener noreferrer">
          {bidderAddress}
        </AddressLink>
      </Section>
      <Doot>🎉</Doot>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 90px;
  background-color: ${Colors.Pink};
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`

const Doot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`

const ReverseDoot = styled(Doot)`
  transform: matrix(-1, 0, 0, 1, 0, 0);
`

const HeaderText = styled.h3`
  font-size: 20px;
  line-height: 150%;
`

const AddressLink = styled.a`
  font-family: 'Space Mono', 'Roboto Mono', monospace;
  font-style: normal;
  color: ${Colors.Black};
  text-decoration: none;
`
