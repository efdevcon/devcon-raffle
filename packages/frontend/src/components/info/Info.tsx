import { Colors } from '@/styles/colors'
import styled from 'styled-components'
import { Header } from '@/components/info/Header'
import { InfoAccordion } from '@/components/info/Accordion'

export const Info = () => {
  return (
    <Wrapper>
      <Header />
      <InfoAccordion />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${Colors.White};
`
