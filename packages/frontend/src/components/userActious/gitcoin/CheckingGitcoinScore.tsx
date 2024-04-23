import styled from 'styled-components'
import { FormRow, FormWrapper } from '../../form'
import { Stepper } from '@/components/stepper/Stepper'
import { Colors } from '@/styles/colors'
import { ClockIcon } from '@/components/icons'
import { Button } from '@/components/buttons'

const gitcoinScoreSteps = [
  {
    default: {
      name: `Sending request`,
    },
    failed: {
      name: 'Request failed',
    },
  },
  {
    default: {
      name: 'Signing the message',
    },
    failed: {
      name: 'Signing message failed',
    },
  },
  {
    default: {
      name: 'Obtaining the score',
    },
    failed: {
      name: 'Obtaining the score failed',
    },
  },
]

export const CheckGitcoinScore = () => {
  return (
    <Wrapper>
      <Row>
        <ClockIcon size={38} />
        <StepperHeader>Checking Your Score</StepperHeader>
      </Row>
      <FormRow>
        <span>It will take about 1 minute. Please stay on this page.</span>
      </FormRow>
      <Stepper steps={gitcoinScoreSteps} currentStep={1} isFailed={false} />
      <Button>Sign Again</Button>
    </Wrapper>
  )
}

const Wrapper = styled(FormWrapper)`
  width: 530px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`

const StepperHeader = styled.h2`
  color: ${Colors.Black};
`
