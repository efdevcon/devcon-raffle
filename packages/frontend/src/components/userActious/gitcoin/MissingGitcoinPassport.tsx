import styled from 'styled-components'
import { Button } from '../../buttons'
import { Colors } from '@/styles/colors'
import { BackButton } from '@/components/buttons/BackButton'
import { Form, FormRow, FormWrapper, Row } from '@/components/form'
import { urls } from '@/constants/urls'
import { MediaQueries } from '@/styles/mediaQueries'

interface Props {
  afterCreateClick: () => void
}

export const MissingGitcoinPassport = ({ afterCreateClick }: Props) => {
  const onCreateClick = () => {
    window.open(urls.gitcoin, '_blank')
    afterCreateClick()
  }

  return (
    <Wrapper>
      <BackButtonRow>
        <BackButton />
        <Form>
          <WarningHeader>You don&apos;t have a Gitcoin Passport</WarningHeader>
          <FormRow>
            <span>To finish placing a bid, please create a Gitcoin Passport.</span>
          </FormRow>
          <Button onClick={onCreateClick} wide>
            Create a Gitcoin Passport
          </Button>
        </Form>
      </BackButtonRow>
    </Wrapper>
  )
}

const BackButtonRow = styled(Row)`
  gap: 32px;

  ${MediaQueries.medium} {
    flex-direction: column;
    gap: 16px;
  }
`

const Wrapper = styled(FormWrapper)`
  width: 465px;
`

const WarningHeader = styled.h2`
  color: ${Colors.Red};

  ${MediaQueries.medium} {
    font-size: 24px;
  }
`
