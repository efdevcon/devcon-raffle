import styled from 'styled-components'
import { Colors } from '@/styles/colors'
import { useBids } from '@/providers/BidsProvider'
import { HeaderBar } from '@/components/common/Header'
import { BackButton } from '@/components/buttons/BackButton'
import { MediaQueries } from '@/styles/mediaQueries'

export const Header = () => {
  const { bidList } = useBids()

  return (
    <StyledHeader>
      <ButtonWrapper>
        <BackButton url="/" />
      </ButtonWrapper>
      <Wrapper>
        <TitleColumn>
          <Title>Number of participants:</Title>
          <Title>{bidList.length}</Title>
        </TitleColumn>
      </Wrapper>
    </StyledHeader>
  )
}

const StyledHeader = styled(HeaderBar)`
  height: 160px;
  padding: 28px 68px;
  overflow: hidden;

  ${MediaQueries.medium} {
    flex-direction: column;
    row-gap: 8px;
    height: 128px;
    padding: 12px 32px 8px;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: ${Colors.White};

  ${MediaQueries.medium} {
    justify-content: flex-start;
  }
`

const TitleColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 8px;

  ${MediaQueries.medium} {
    align-items: flex-start;
    row-gap: 0;
  }
`

const Title = styled.h2`
  background-color: ${Colors.White};
  padding: 4px 20px;

  ${MediaQueries.medium} {
    font-size: 20px;
    padding: 0 10px;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: ${Colors.White};

  ${MediaQueries.medium} {
    padding: 0;
  }
`
