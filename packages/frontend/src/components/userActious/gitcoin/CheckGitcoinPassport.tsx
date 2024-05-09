import styled from 'styled-components'
import { FormHeading, FormRow, FormWrapper } from '../../form'
import { Button } from '../../buttons'
import { SeparatorWithText } from '@/components/common/Separator'

interface Props {
  onCheckScoreClick: () => void
}

export const CheckGitcoinPassport = ({ onCheckScoreClick }: Props) => {
  return (
    <Wrapper>
      <FormHeading>Check Gitcoin Passport</FormHeading>
      <FormRow>
        <span>To place a bid we need to check your score. By verifying your score we checking if you are a human.</span>
      </FormRow>
      <Button wide onClick={onCheckScoreClick}>
        Check Score
      </Button>
      <SeparatorWithText text="Or" />
      <FormRow>
        <span>
          If you don’t have a <b>Gitcoin Passport</b>, please create one.
        </span>
      </FormRow>
      <Button wide>Create a Gitcoin Passport</Button>
    </Wrapper>
  )
}

const Wrapper = styled(FormWrapper)`
  width: 390px;
`
