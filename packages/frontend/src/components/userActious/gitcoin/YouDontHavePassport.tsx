import styled from 'styled-components'
import { Button } from '../../buttons'
import { Colors } from '@/styles/colors'
import { BackButton } from '@/components/buttons/BackButton'
import { Column, FormRow, FormWrapper, Row } from '@/components/form'
import { urls } from '@/constants/urls'

interface Props {
  afterCreateClick: () => void
}

export const YouDontHavePassport = ({ afterCreateClick }: Props) => {
  const onCreateClick = () => {
    window.open(urls.gitcoin, '_blank')
    afterCreateClick()
  }

  return (
    <Wrapper>
      <Row>
        <BackButton withBack={false} />
        <Column>
          <WarningHeader>You don&apos;t have a GitCoin Passport</WarningHeader>
          <FormRow>
            <span>To finish placing a bid, please create a GitCoin Passport.</span>
          </FormRow>
          <Button onClick={onCreateClick}>Create a Gitcoin Passport</Button>
        </Column>
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled(FormWrapper)`
  width: 465px;
`

const WarningHeader = styled.h2`
  color: ${Colors.RedDark};
`
